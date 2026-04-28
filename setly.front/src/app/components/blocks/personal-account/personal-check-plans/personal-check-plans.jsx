"use client";

import { useState, useMemo, useEffect, useCallback, useRef, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { clearAuth } from "@/app/lib/auth-storage";
import { applyTypograf } from "@/app/lib/typograf";
import buttonStyles from "@/app/components/atomic/atoms/buttons-round/buttons-round.module.css";
import Dropdown from "@/app/components/atomic/atoms/dropdown/dropdown";
import { getPersonalCheckPlans } from "@/data/personal-check-plans";
import { useLikedChecklists } from "@/app/lib/liked-checklists-context";
import { apiFetch, getApiUrl } from "@/app/lib/api";
import { normalizeMediaUrl, resolveStorageMediaUrl } from "@/app/lib/checkplan-media";
import { CHECK_PLANS_SORT_ITEMS, sortCheckPlansByIndex } from "@/app/lib/checkplan-list-utils";
import { buildCheckplanPublicSegment } from "@/app/lib/slug";
import { PlanCardSkeleton } from "@/app/components/atomic/molecules/plan-card-skeleton/plan-card-skeleton";
import styles from "./personal-check-plans.module.css";

const API_PREFIX = "/api/user";

/** Преобразует ответ GET /api/check-plans/{id_str} в формат карточки для PersonalPlanCard */
function planResponseToCard(apiPlan) {
  if (!apiPlan) return null;
  const idStr =
    typeof apiPlan.id_str === "string" && apiPlan.id_str.trim() !== ""
      ? apiPlan.id_str
      : "";
  const planDbId =
    typeof apiPlan.id === "number" && Number.isInteger(apiPlan.id) && apiPlan.id > 0
      ? apiPlan.id
      : null;
  const imageSrc = resolveStorageMediaUrl(apiPlan.image_src || apiPlan.imageSrc || "");
  const creationTime = apiPlan.creation_time ?? apiPlan.creationTime ?? null;
  return {
    id: idStr || String(apiPlan.id ?? ""),
    planDbId,
    imageSrc: imageSrc || "/img/main/create-folio.png",
    imageAlt: normalizeMediaUrl(apiPlan.image_alt || apiPlan.imageAlt || "") || apiPlan.title || "",
    days: apiPlan.days || "",
    location: apiPlan.location || "",
    title: apiPlan.title || "",
    description: apiPlan.description || "",
    visibility: apiPlan.visibility || "private",
    creationTime,
    isPinned: false,
  };
}

function formatLikes(n) {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  return String(n);
}

const VISIBILITY_CONFIG = {
  public: { label: "Публичный", iconSrc: "/icons/images/UsersBig.svg" },
  link: { label: "По ссылке", iconSrc: "/icons/images/Link.svg" },
  private: { label: "Приватный", iconSrc: "/icons/images/Lock.svg" },
};

function PersonalPlanCard({
  plan,
  isGuestView = false,
  isPinnedDragSource = false,
  isPinnedDragOver = false,
  onPinnedDragStart,
  onPinnedDragEnd,
  onPinnedDragOver,
  onPinnedDrop,
  slotRef,
}) {
  const { isLiked, toggle, getLikeCount } = useLikedChecklists();
  const visibility = plan.visibility ?? "private";
  const config = VISIBILITY_CONFIG[visibility];
  const isPublic = visibility === "public";
  const liked = isLiked(plan.id);
  const likes = isPublic ? getLikeCount(plan.id) : 0;

  return (
    <>
      {/* Из личного кабинета открываем чек-план в режиме предпросмотра, не редактирования */}
      <div
        className={`${styles.cardSlot} ${isPinnedDragOver ? styles.cardSlotDragOver : ""}`}
        ref={slotRef}
        onDragOver={(e) => onPinnedDragOver?.(e, plan)}
        onDrop={(e) => onPinnedDrop?.(e, plan)}
      >
      <Link href={`/preview-checkplan/${encodeURIComponent(buildCheckplanPublicSegment({ title: plan.title, planDbId: plan.planDbId, id_str: plan.id }))}?from=account`} className={styles.cardLink} aria-label={`Открыть ${plan.title}`}>
    <article className={`${styles.card} ${plan.isPinned ? styles.cardPinned : ""} ${isPinnedDragSource ? styles.cardPinnedDragging : ""}`}>
      {plan.isPinned && !isGuestView && (
        <button
          type="button"
          className={styles.pinMorphHandle}
          aria-label="Переместить закреплённый чек-план"
          draggable
          onDragStart={(e) => onPinnedDragStart?.(e, plan)}
          onDragEnd={() => onPinnedDragEnd?.()}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Image
            src="/icons/system/pinned.svg"
            alt=""
            width={20}
            height={20}
            className={styles.pinMorphPinnedIcon}
            draggable={false}
          />
          <Image
            src="/icons/system/draggableDots.svg"
            alt=""
            width={11}
            height={18}
            className={styles.pinMorphDotsIcon}
            draggable={false}
          />
        </button>
      )}
      <div className={styles.tags}>
        <span className={styles.tag}>
          <Image src="/icons/images/Calender.svg" alt="" width={20} height={20} className={styles.tagIcon} />
          {plan.days}
        </span>
        <span className={styles.tag}>
          <Image src="/icons/images/Location.svg" alt="" width={20} height={20} className={styles.tagIcon} />
          {plan.location}
        </span>
      </div>
      <div className={styles.cardImageWrapper}>
        <Image
          src={plan.imageSrc}
          alt={plan.imageAlt || plan.title || ""}
          width={264}
          height={264}
          className={styles.cardImage}
          unoptimized={plan.imageSrc.startsWith("http")}
        />
      </div>
      <h3 className={`${styles.cardTitle} subtitle_1`}>{applyTypograf(plan.title)}</h3>
      <p className={`${styles.cardDescription} subinfo`}>{applyTypograf(plan.description)}</p>
      <div className={styles.cardFooter}>
        <div className={styles.visibilityRow}>
          <Image
            src={config.iconSrc}
            alt=""
            width={16}
            height={16}
            className={styles.visibilityIcon}
          />
          <span className={`label ${styles.visibilityLabel}`}>{config.label}</span>
        </div>
        {isPublic && (
          <button
            type="button"
            className={styles.likesRow}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(plan.id);
            }}
            aria-pressed={liked}
          >
            <Image
              src={liked ? "/icons/images/HeartFull.svg" : "/icons/images/Heart.svg"}
              alt=""
              width={20}
              height={20}
              className={styles.likesIcon}
            />
            <span className={styles.likesCount}>{formatLikes(likes)}</span>
          </button>
        )}
      </div>
    </article>
      </Link>
      </div>
    </>
  );
}

export default function PersonalCheckPlans({ userId, token, router, isGuestView = false }) {
  const routerInstance = useRouter();
  const nav = router ?? routerInstance;
  const [sortIndex, setSortIndex] = useState(1); // 1 = "По новизне" по умолчанию
  const [apiIdStrs, setApiIdStrs] = useState(null);
  const [pinnedIdStrs, setPinnedIdStrs] = useState([]);
  const [apiPlans, setApiPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const [dragPinnedId, setDragPinnedId] = useState(null);
  const [dragOverPinnedId, setDragOverPinnedId] = useState(null);
  const cardSlotRefs = useRef(new Map());
  const prevCardRectsRef = useRef(new Map());
  const { getLikeCount, setInitialLikeCounts } = useLikedChecklists();

  // Загрузка чек-планов профиля: все свои / только публичные у другого пользователя
  useEffect(() => {
    if (isGuestView && !userId) {
      const id = requestAnimationFrame(() => {
        setApiIdStrs([]);
        setPinnedIdStrs([]);
        setApiPlans([]);
      });
      return () => cancelAnimationFrame(id);
    }
    if (!isGuestView && !token) {
      const id = requestAnimationFrame(() => {
        setApiIdStrs(null);
        setPinnedIdStrs([]);
        setApiPlans([]);
      });
      return () => cancelAnimationFrame(id);
    }

    const endpoint = isGuestView
      ? `${API_PREFIX}/public-profile/${encodeURIComponent(userId)}/checkplans`
      : `${API_PREFIX}/me/checkplans`;
    apiFetch(endpoint, { method: "GET", token })
      .then((r) => {
        if (!isGuestView && r.status === 401) {
          clearAuth();
          nav?.replace?.("/login");
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((data) => {
        setApiIdStrs(Array.isArray(data?.id_strs) ? data.id_strs : []);
        setPinnedIdStrs(Array.isArray(data?.pinned_id_strs) ? data.pinned_id_strs : []);
      })
      .catch((err) => {
        console.error("Error loading checkplans", err);
        setApiIdStrs([]);
        setPinnedIdStrs([]);
      });
  }, [token, nav, isGuestView, userId]);

  // Загрузка полных данных планов по каждому id_str (GET /api/check-plans/{id_str})
  useEffect(() => {
    if (!apiIdStrs?.length) {
      const id = requestAnimationFrame(() => {
        setApiPlans([]);
      });
      return () => cancelAnimationFrame(id);
    }
    const base = getApiUrl() || "";
    const loadingRafId = requestAnimationFrame(() => {
      setPlansLoading(true);
    });
    Promise.all(
      apiIdStrs.map((idStr) =>
        apiFetch(`${base ? `${base}/api/check-plans/${encodeURIComponent(idStr)}` : `/api/check-plans/${encodeURIComponent(idStr)}`}`, {
          method: "GET",
          token,
        })
          .then((r) => (r.ok ? r.json() : null))
      )
    )
      .then((results) => {
        const pinnedSet = new Set((pinnedIdStrs || []).map(String));
        const cards = results
          .map((p) => {
            const card = planResponseToCard(p);
            if (!card) return null;
            return { ...card, isPinned: pinnedSet.has(String(card.id)) };
          })
          .filter(Boolean);
        setApiPlans(cards);
      })
      .catch(() => setApiPlans([]))
      .finally(() => setPlansLoading(false));
    return () => cancelAnimationFrame(loadingRafId);
  }, [apiIdStrs, pinnedIdStrs, token]);

  // Подгрузка счётчиков лайков для отображаемых планов (с /api/check-plans)
  useEffect(() => {
    if (!apiIdStrs?.length) return;
    const idSet = new Set(apiIdStrs.map(String));
    const base = getApiUrl() || "";
    apiFetch(base ? `${base}/api/check-plans` : "/api/check-plans", {
      method: "GET",
      token,
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!data?.flatCards) return;
        const counts = {};
        for (const c of data.flatCards) {
          if (c?.id && idSet.has(String(c.id))) counts[String(c.id)] = c.initialLikes ?? 0;
        }
        if (Object.keys(counts).length) setInitialLikeCounts(counts);
      })
      .catch(() => {
        console.error("Error loading like counts");
      });
  }, [apiIdStrs, setInitialLikeCounts, token]);

  const rawPlans = useMemo(() => {
    if (apiIdStrs !== null && apiIdStrs.length > 0) {
      return apiPlans;
    }
    if (apiIdStrs !== null) {
      return [];
    }
      return isGuestView ? [] : getPersonalCheckPlans(userId);
  }, [apiIdStrs, apiPlans, userId]);

  const persistPinnedOrder = useCallback(async (nextPinnedOrder, prevPinnedOrder) => {
    if (!token) return;
    try {
      const res = await apiFetch(`${API_PREFIX}/me/checkplans/pinned/order`, {
        method: "PATCH",
        token,
        body: { id_strs: nextPinnedOrder },
      });
      if (!res.ok) {
        setPinnedIdStrs(prevPinnedOrder);
      }
    } catch (_) {
      setPinnedIdStrs(prevPinnedOrder);
    }
  }, [token]);

  const handlePinnedDragStart = useCallback((e, plan) => {
    if (!plan?.isPinned) return;
    e.stopPropagation();
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(plan.id));
    const cardEl = e.currentTarget?.closest?.(`.${styles.card}`);
    if (cardEl) {
      const rect = cardEl.getBoundingClientRect();
      e.dataTransfer.setDragImage(cardEl, Math.max(0, e.clientX - rect.left), Math.max(0, e.clientY - rect.top));
    }
    setDragPinnedId(String(plan.id));
    setDragOverPinnedId(null);
  }, []);

  const handlePinnedDragOver = useCallback((e, plan) => {
    if (!dragPinnedId || !plan?.isPinned) return;
    e.preventDefault();
    if (String(plan.id) !== dragPinnedId) {
      setDragOverPinnedId(String(plan.id));
    }
  }, [dragPinnedId]);

  const handlePinnedDrop = useCallback((e, plan) => {
    if (!dragPinnedId || !plan?.isPinned) return;
    e.preventDefault();
    const targetId = String(plan.id);
    const sourceId = String(dragPinnedId);
    if (sourceId === targetId) {
      setDragOverPinnedId(null);
      return;
    }
    const prevPinnedOrder = [...pinnedIdStrs];
    const sourceIndex = prevPinnedOrder.indexOf(sourceId);
    const targetIndex = prevPinnedOrder.indexOf(targetId);
    if (sourceIndex < 0 || targetIndex < 0) {
      setDragOverPinnedId(null);
      return;
    }
    const nextPinnedOrder = [...prevPinnedOrder];
    const [moved] = nextPinnedOrder.splice(sourceIndex, 1);
    nextPinnedOrder.splice(targetIndex, 0, moved);
    setPinnedIdStrs(nextPinnedOrder);
    setDragOverPinnedId(null);
    persistPinnedOrder(nextPinnedOrder, prevPinnedOrder);
  }, [dragPinnedId, pinnedIdStrs, persistPinnedOrder]);

  const handlePinnedDragEnd = useCallback(() => {
    setDragPinnedId(null);
    setDragOverPinnedId(null);
  }, []);

  const plans = useMemo(
    () => {
      const byId = new Map(rawPlans.map((plan) => [String(plan.id), plan]));
      const pinned = (pinnedIdStrs || [])
        .map((id) => byId.get(String(id)))
        .filter(Boolean);
      const regular = sortCheckPlansByIndex(
        rawPlans.filter((plan) => !plan?.isPinned && (!isGuestView || plan?.visibility === "public")),
        sortIndex,
        getLikeCount
      );
      return [...pinned.filter((plan) => !isGuestView || plan?.visibility === "public"), ...regular];
    },
    [rawPlans, pinnedIdStrs, sortIndex, getLikeCount, isGuestView]
  );

  useLayoutEffect(() => {
    const nextRects = new Map();
    for (const plan of plans) {
      const id = String(plan.id);
      const el = cardSlotRefs.current.get(id);
      if (!el) continue;
      const next = el.getBoundingClientRect();
      nextRects.set(id, next);
      const prev = prevCardRectsRef.current.get(id);
      if (!prev) continue;
      const dx = prev.left - next.left;
      const dy = prev.top - next.top;
      if (Math.abs(dx) < 1 && Math.abs(dy) < 1) continue;
      el.style.transition = "none";
      el.style.transform = `translate(${dx}px, ${dy}px)`;
      requestAnimationFrame(() => {
        el.style.transition = "transform 260ms cubic-bezier(0.22, 1, 0.36, 1)";
        el.style.transform = "";
      });
    }
    prevCardRectsRef.current = nextRects;
  }, [plans]);

  return (
    <section className={styles.wrapper} aria-labelledby="personal-check-plans-title">
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h2 id="personal-check-plans-title" className={`${styles.title} title_1`}>
            {isGuestView ? "Чек-планы пользователя" : "Мои чек-планы"}
          </h2>
          {!isGuestView && (
            <div className={styles.addButtonWrap}>
              <Link
                href="/creating"
                className={`${buttonStyles.roundButton} ${buttonStyles['roundButton--white']}`}
                aria-label="Добавить чеклист"
              >
                <span className={buttonStyles.roundButton__icon}>
                  <Image
                    src="/icons/system/CrossMiniDark.svg"
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden
                  />
                </span>
              </Link>
            </div>
          )}
        </div>
        <div className={styles.dropdownWrap}>
            <Dropdown
              text="Сортировать по"
              items={CHECK_PLANS_SORT_ITEMS}
              selectedIndex={sortIndex}
              defaultSelectedIndex={1}
              onSelect={(index) => setSortIndex(index)}
              menuCentered
              icon={
                <Image
                  src="/icons/system/ArrowDown.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              }
            />
          </div>
      </div>
      <div className={styles.cardsGrid} aria-busy={plansLoading && plans.length === 0} aria-label={plansLoading && plans.length === 0 ? "Загрузка чек-планов" : undefined}>
        {plansLoading && plans.length === 0 ? (
          Array.from({ length: 6 }, (_, i) => <PlanCardSkeleton key={i} />)
        ) : (
          plans.map((plan) => (
            <PersonalPlanCard
              key={plan.id}
              plan={plan}
              isPinnedDragSource={plan.isPinned && String(plan.id) === dragPinnedId}
              isPinnedDragOver={plan.isPinned && String(plan.id) === dragOverPinnedId}
              onPinnedDragStart={handlePinnedDragStart}
              onPinnedDragEnd={handlePinnedDragEnd}
              onPinnedDragOver={handlePinnedDragOver}
              onPinnedDrop={handlePinnedDrop}
              isGuestView={isGuestView}
              slotRef={(el) => {
                const id = String(plan.id);
                if (el) cardSlotRefs.current.set(id, el);
                else cardSlotRefs.current.delete(id);
              }}
            />
          ))
        )}
      </div>
    </section>
  );
}
