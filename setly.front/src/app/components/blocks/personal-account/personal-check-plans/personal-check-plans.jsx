"use client";

import { useState, useMemo, useEffect } from "react";
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
import { PlanCardSkeleton } from "@/app/components/atomic/molecules/plan-card-skeleton/plan-card-skeleton";
import styles from "./personal-check-plans.module.css";

const API_PREFIX = "/api/user";

/** Преобразует ответ GET /api/check-plans/{id_str} в формат карточки для PersonalPlanCard */
function planResponseToCard(apiPlan) {
  if (!apiPlan) return null;
  const id = apiPlan.id_str || apiPlan.id;
  const imageSrc = resolveStorageMediaUrl(apiPlan.image_src || apiPlan.imageSrc || "");
  const creationTime = apiPlan.creation_time ?? apiPlan.creationTime ?? null;
  return {
    id: String(id),
    imageSrc: imageSrc || "/img/main/create-folio.png",
    imageAlt: normalizeMediaUrl(apiPlan.image_alt || apiPlan.imageAlt || "") || apiPlan.title || "",
    days: apiPlan.days || "",
    location: apiPlan.location || "",
    title: apiPlan.title || "",
    description: apiPlan.description || "",
    visibility: apiPlan.visibility || "private",
    creationTime,
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

function PersonalPlanCard({ plan }) {
  const { isLiked, toggle, getLikeCount } = useLikedChecklists();
  const visibility = plan.visibility ?? "private";
  const config = VISIBILITY_CONFIG[visibility];
  const isPublic = visibility === "public";
  const liked = isLiked(plan.id);
  const likes = isPublic ? getLikeCount(plan.id) : 0;

  return (
    <>
      {/* Из личного кабинета открываем чек-план в режиме предпросмотра, не редактирования */}
      <Link href={`/preview-checkplan/${encodeURIComponent(plan.id)}?from=account`} className={styles.cardLink} aria-label={`Открыть ${plan.title}`}>
    <article className={styles.card}>
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
    </>
  );
}

export default function PersonalCheckPlans({ userId, token, router }) {
  const routerInstance = useRouter();
  const nav = router ?? routerInstance;
  const [sortIndex, setSortIndex] = useState(1); // 1 = "По новизне" по умолчанию
  const [apiIdStrs, setApiIdStrs] = useState(null);
  const [apiPlans, setApiPlans] = useState([]);
  const [plansLoading, setPlansLoading] = useState(false);
  const { getLikeCount, setInitialLikeCounts } = useLikedChecklists();

  // Загрузка «моих» чек-планов с бэкенда при наличии токена
  useEffect(() => {
    if (!token) {
      const id = requestAnimationFrame(() => {
        setApiIdStrs(null);
        setApiPlans([]);
      });
      return () => cancelAnimationFrame(id);
    }
    apiFetch(`${API_PREFIX}/me/checkplans`, { method: "GET", token })
      .then((r) => {
        if (r.status === 401) {
          clearAuth();
          nav?.replace?.("/login");
          return null;
        }
        return r.ok ? r.json() : null;
      })
      .then((data) => {
        setApiIdStrs(Array.isArray(data?.id_strs) ? data.id_strs : []);
      })
      .catch((err) => {
        console.error("Error loading checkplans", err);
        setApiIdStrs([]);
      });
  }, [token, nav]);

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
        fetch(`${base ? `${base}/api/check-plans/${encodeURIComponent(idStr)}` : `/api/check-plans/${encodeURIComponent(idStr)}`}`)
          .then((r) => (r.ok ? r.json() : null))
      )
    )
      .then((results) => {
        const cards = results
          .map((p) => planResponseToCard(p))
          .filter(Boolean);
        setApiPlans(cards);
      })
      .catch(() => setApiPlans([]))
      .finally(() => setPlansLoading(false));
    return () => cancelAnimationFrame(loadingRafId);
  }, [apiIdStrs]);

  // Подгрузка счётчиков лайков для отображаемых планов (с /api/check-plans)
  useEffect(() => {
    if (!apiIdStrs?.length) return;
    const idSet = new Set(apiIdStrs.map(String));
    const base = getApiUrl() || "";
    fetch(base ? `${base}/api/check-plans` : "/api/check-plans")
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
  }, [apiIdStrs, setInitialLikeCounts]);

  const rawPlans = useMemo(() => {
    if (apiIdStrs !== null && apiIdStrs.length > 0) {
      return apiPlans;
    }
    if (apiIdStrs !== null) {
      return [];
    }
    return getPersonalCheckPlans(userId);
  }, [apiIdStrs, apiPlans, userId]);

  const plans = useMemo(
    () => sortCheckPlansByIndex(rawPlans, sortIndex, getLikeCount),
    [rawPlans, sortIndex, getLikeCount]
  );

  return (
    <section className={styles.wrapper} aria-labelledby="personal-check-plans-title">
      <div className={styles.headerRow}>
        <div className={styles.titleGroup}>
          <h2 id="personal-check-plans-title" className={`${styles.title} title_1`}>
            Мои чек-планы
          </h2>
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
            <PersonalPlanCard key={plan.id} plan={plan} />
          ))
        )}
      </div>
    </section>
  );
}
