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
import { autoScrollViewportByPointer, createViewportAutoScrollController } from "@/app/lib/drag-auto-scroll";
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
  isMobile = false,
  isPinHandleArmed = false,
  isPinnedDragSource = false,
  isPinnedDragOver = false,
  onPinHandleToggle,
  onPinnedDragStart,
  onPinnedDragEnd,
  onPinnedDragOver,
  onPinnedDrop,
  onPinnedPointerStart,
  onPinnedPointerMove,
  onPinnedPointerEnd,
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
        data-plan-slot-id={String(plan.id)}
        ref={slotRef}
        onDragOver={(e) => onPinnedDragOver?.(e, plan)}
        onDrop={(e) => onPinnedDrop?.(e, plan)}
      >
      <Link href={`/preview-checkplan/${encodeURIComponent(buildCheckplanPublicSegment({ title: plan.title, planDbId: plan.planDbId, id_str: plan.id }))}?from=account`} className={styles.cardLink} aria-label={`Открыть ${plan.title}`}>
    <article className={`${styles.card} ${plan.isPinned ? styles.cardPinned : ""} ${isPinnedDragSource ? styles.cardPinnedDragging : ""}`}>
      {plan.isPinned && !isGuestView && (
        <button
          type="button"
          className={`${styles.pinMorphHandle} ${isPinHandleArmed ? styles.pinMorphHandleArmed : ""}`}
          data-pin-handle="true"
          aria-label="Переместить закреплённый чек-план"
          draggable={!isMobile}
          onDragStart={(e) => {
            onPinnedDragStart?.(e, plan);
          }}
          onDragEnd={() => onPinnedDragEnd?.()}
          onPointerDown={(e) => {
            if (isMobile && isPinHandleArmed) onPinnedPointerStart?.(e, plan);
          }}
          onPointerMove={(e) => {
            if (isMobile && isPinHandleArmed) onPinnedPointerMove?.(e, plan);
          }}
          onPointerUp={(e) => {
            if (isMobile && isPinHandleArmed) onPinnedPointerEnd?.(e, plan);
          }}
          onPointerCancel={(e) => {
            if (isMobile && isPinHandleArmed) onPinnedPointerEnd?.(e, plan);
          }}
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (isMobile) onPinHandleToggle?.(plan);
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
  const [activePinHandleId, setActivePinHandleId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isMobilePointerDragging, setIsMobilePointerDragging] = useState(false);
  const cardSlotRefs = useRef(new Map());
  const prevCardRectsRef = useRef(new Map());
  const mobilePointerDragRef = useRef({
    active: false,
    pointerId: null,
    sourceId: null,
    overId: null,
    moved: false,
  });
  const mobileDragHandleElRef = useRef(null);
  const mobileAutoScrollRef = useRef(createViewportAutoScrollController());
  const skipNextHandleToggleRef = useRef(false);
  const { getLikeCount, setInitialLikeCounts } = useLikedChecklists();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const mediaQuery = window.matchMedia("(max-width: 620px)");
    const update = () => setIsMobileView(mediaQuery.matches);
    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => () => {
    mobileAutoScrollRef.current.stop();
  }, []);

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
    setActivePinHandleId(String(plan.id));
  }, []);

  const handlePinnedDragOver = useCallback((e, plan) => {
    if (!dragPinnedId || !plan?.isPinned) return;
    e.preventDefault();
    autoScrollViewportByPointer(e.clientY);
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
    setActivePinHandleId(null);
    mobileAutoScrollRef.current.stop();
  }, []);

  const handlePinHandleToggle = useCallback((plan) => {
    if (!isMobileView || !plan?.isPinned) return;
    if (skipNextHandleToggleRef.current) {
      skipNextHandleToggleRef.current = false;
      return;
    }
    const id = String(plan.id);
    setActivePinHandleId((prev) => (prev === id ? null : id));
  }, [isMobileView]);

  const handlePinnedPointerStart = useCallback((e, plan) => {
    if (!isMobileView || !plan?.isPinned) return;
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture?.(e.pointerId);
    mobileDragHandleElRef.current = e.currentTarget;
    const sourceId = String(plan.id);
    mobilePointerDragRef.current = {
      active: true,
      pointerId: e.pointerId,
      sourceId,
      overId: sourceId,
      moved: false,
    };
    setIsMobilePointerDragging(true);
    setDragPinnedId(sourceId);
    setDragOverPinnedId(null);
  }, [isMobileView]);

  const handlePinnedPointerMoveByCoords = useCallback((clientX, clientY) => {
    const drag = mobilePointerDragRef.current;
    if (!drag.active) return;
    mobileAutoScrollRef.current.update(clientY);
    const targetEl = document.elementFromPoint(clientX, clientY);
    const targetSlot = targetEl?.closest?.("[data-plan-slot-id]");
    let targetId = targetSlot?.getAttribute?.("data-plan-slot-id");
    if (!targetId) {
      // Fallback для мобильного: если палец между карточками/над первой,
      // выбираем ближайший pinned-слот по вертикальной позиции.
      const pinnedSlots = pinnedIdStrs
        .map((id) => ({ id: String(id), el: cardSlotRefs.current.get(String(id)) }))
        .filter((item) => Boolean(item.el));
      if (pinnedSlots.length > 0) {
        const firstRect = pinnedSlots[0].el.getBoundingClientRect();
        if (clientY <= firstRect.top + firstRect.height / 2) {
          targetId = pinnedSlots[0].id;
        } else {
          for (let i = 0; i < pinnedSlots.length; i += 1) {
            const rect = pinnedSlots[i].el.getBoundingClientRect();
            const midY = rect.top + rect.height / 2;
            if (clientY <= midY) {
              targetId = pinnedSlots[i].id;
              break;
            }
          }
          if (!targetId) {
            targetId = pinnedSlots[pinnedSlots.length - 1].id;
          }
        }
      }
    }
    if (!targetId || targetId === drag.sourceId || !pinnedIdStrs.includes(String(targetId))) {
      setDragOverPinnedId(null);
      return;
    }
    drag.overId = String(targetId);
    drag.moved = true;
    setDragOverPinnedId(String(targetId));
  }, [pinnedIdStrs]);

  const finishMobilePointerDrag = useCallback(() => {
    const drag = mobilePointerDragRef.current;
    if (!drag.active) return;

    const sourceId = String(drag.sourceId);
    const targetId = drag.overId ? String(drag.overId) : null;
    if (targetId && targetId !== sourceId) {
      const prevPinnedOrder = [...pinnedIdStrs];
      const sourceIndex = prevPinnedOrder.indexOf(sourceId);
      const targetIndex = prevPinnedOrder.indexOf(targetId);
      if (sourceIndex >= 0 && targetIndex >= 0) {
        const nextPinnedOrder = [...prevPinnedOrder];
        const [moved] = nextPinnedOrder.splice(sourceIndex, 1);
        nextPinnedOrder.splice(targetIndex, 0, moved);
        setPinnedIdStrs(nextPinnedOrder);
        persistPinnedOrder(nextPinnedOrder, prevPinnedOrder);
      }
      skipNextHandleToggleRef.current = true;
    }

    if (mobileDragHandleElRef.current && drag.pointerId != null) {
      try {
        mobileDragHandleElRef.current.releasePointerCapture?.(drag.pointerId);
      } catch {
        /* ignore */
      }
    }
    mobileDragHandleElRef.current = null;
    mobilePointerDragRef.current = {
      active: false,
      pointerId: null,
      sourceId: null,
      overId: null,
      moved: false,
    };
    setIsMobilePointerDragging(false);
    setDragPinnedId(null);
    setDragOverPinnedId(null);
    setActivePinHandleId(null);
    mobileAutoScrollRef.current.stop();
  }, [persistPinnedOrder, pinnedIdStrs]);

  const handlePinnedPointerMove = useCallback((e) => {
    const drag = mobilePointerDragRef.current;
    if (!drag.active || drag.pointerId !== e.pointerId) return;
    e.preventDefault();
    handlePinnedPointerMoveByCoords(e.clientX, e.clientY);
  }, [handlePinnedPointerMoveByCoords]);

  const handlePinnedPointerEnd = useCallback((e) => {
    const drag = mobilePointerDragRef.current;
    if (!drag.active || drag.pointerId !== e.pointerId) return;
    e.preventDefault();
    e.stopPropagation();
    finishMobilePointerDrag();
  }, [finishMobilePointerDrag]);

  useEffect(() => {
    if (!isMobileView || !isMobilePointerDragging) return undefined;

    const onPointerMove = (event) => {
      const drag = mobilePointerDragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;
      event.preventDefault();
      handlePinnedPointerMoveByCoords(event.clientX, event.clientY);
    };
    const onPointerEnd = (event) => {
      const drag = mobilePointerDragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;
      event.preventDefault();
      finishMobilePointerDrag();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: false });
    window.addEventListener("pointerup", onPointerEnd, { passive: false });
    window.addEventListener("pointercancel", onPointerEnd, { passive: false });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerEnd);
      window.removeEventListener("pointercancel", onPointerEnd);
    };
  }, [finishMobilePointerDrag, handlePinnedPointerMoveByCoords, isMobilePointerDragging, isMobileView]);

  useEffect(() => {
    if (!isMobileView || !activePinHandleId) return undefined;
    const handleOutsidePointerDown = (event) => {
      const target = event.target;
      if (target?.closest?.('[data-pin-handle="true"]')) return;
      setActivePinHandleId(null);
    };
    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [isMobileView, activePinHandleId]);

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
              isMobile={isMobileView}
              isPinHandleArmed={plan.isPinned && String(plan.id) === activePinHandleId}
              isPinnedDragSource={plan.isPinned && String(plan.id) === dragPinnedId}
              isPinnedDragOver={plan.isPinned && String(plan.id) === dragOverPinnedId}
              onPinHandleToggle={handlePinHandleToggle}
              onPinnedDragStart={handlePinnedDragStart}
              onPinnedDragEnd={handlePinnedDragEnd}
              onPinnedDragOver={handlePinnedDragOver}
              onPinnedDrop={handlePinnedDrop}
              onPinnedPointerStart={handlePinnedPointerStart}
              onPinnedPointerMove={handlePinnedPointerMove}
              onPinnedPointerEnd={handlePinnedPointerEnd}
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
