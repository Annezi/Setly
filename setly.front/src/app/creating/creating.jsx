"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PublicImage from "@/app/components/globals/public-image";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import ButtonsMini from "@/app/components/atomic/atoms/buttons-mini/buttons-mini";
import Questions from "@/app/components/atomic/atoms/questions/questions";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import Input from "@/app/components/atomic/molecules/input/input";
import styles from "./creating.module.css";
import { getAuth } from "@/app/lib/auth-storage";
import { getApiUrl } from "@/app/lib/api";
import { buildCheckplanPublicSegment } from "@/app/lib/slug";

const STEPS = [1, 2, 3, 4];

const STEP_LABELS = {
  1: "Тип поездки",
  2: "Шаблон",
  3: "Название",
  4: "Обложка",
};

// Варианты для шага 1 «Тип поездки» (по макету)
const STEP_1_OPTIONS = [
  {
    title: "⛰️ Горы / Природа",
    description: "Для тех, кто хочет треккинга, палаток, высоты и природы",
  },
  {
    title: "🏙️ Городской отдых",
    description: "Планы для музеев, кафе, прогулок",
  },
  {
    title: "🏖️ Пляжный отдых",
    description: "Море, солнце, отели, лёгкая одежда и спокойствие",
  },
  {
    title: "👨‍👩‍👧‍👦 С семьёй или детьми",
    description: "Поездки, где важнее всего — комфорт, безопасность и привычки",
  },
  {
    title: "🧳 Долгая поездка / Кочёвка",
    description:
      "10+ дней, часто с перемещениями, разными странами/климатами",
  },
];

// Значения TravelType для API (соответствуют тегам фильтров)
const TRAVEL_TYPE_VALUES = [
  "В горы",
  "По городам",
  "На пляж",
  "С семьёй или детьми",
  "Долго / Кочёвка",
];

// Варианты для шага 2 «Шаблон»
const STEP_2_OPTIONS = [
  {
    title: "Создать чистый чек-план",
    description:
      "Начните с нуля — добавьте только то, что нужно вам",
    imageSrc: "/img/main/clear-checklist.png",
  },
  {
    title: "Использовать шаблон",
    description:
      "Возьмите заготовку — уже добавили универсальные пункты под выбранный тип поездки",
    imageSrc: "/img/main/pattern-checklist.png",
  },
];

// Заглушки для шагов 3–4 (позже заменить на реальные данные)
const STEP_PLACEHOLDER_OPTIONS = [
  { text: "Вариант 1" },
  { text: "Вариант 2" },
  { text: "Вариант 3" },
  { text: "Вариант 4" },
  { text: "Вариант 5" },
];

const STEP_QUESTIONS = {
  1: STEP_1_OPTIONS,
  2: STEP_2_OPTIONS,
  3: STEP_PLACEHOLDER_OPTIONS,
  4: STEP_PLACEHOLDER_OPTIONS,
};

const DEFAULT_COVER_IMAGE = "/img/main/create-folio.png";
/** Загрузка обложки через бэкенд POST /api/user/me/save-image/{category}/ */
const UPLOAD_COVER_API = "/api/user/me/save-image/checklist-covers/";

export default function Creating() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedByStep, setSelectedByStep] = useState(() => {
    const init = {};
    STEPS.forEach((s) => (init[s] = null));
    return init;
  });
  const [planName, setPlanName] = useState("");
  // Путь к обложке (дефолт или загруженная в /img/checklist-covers/) — передавать в API создания чек-листа как coverImagePath
  const [coverImage, setCoverImage] = useState(DEFAULT_COVER_IMAGE);
  const [coverLoading, setCoverLoading] = useState(false);
  const [coverError, setCoverError] = useState(null);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState(null);
  const coverInputRef = useRef(null);

  const goBack = useCallback(() => router.back(), [router]);

  // При переходе с шага 1 или 2 подтверждаем подсвеченный по умолчанию первый вариант, если пользователь не выбирал явно
  const confirmStepSelectionIfNeeded = useCallback((step) => {
    if (step !== 1 && step !== 2) return;
    setSelectedByStep((prev) => {
      if (prev[step] != null) return prev;
      return { ...prev, [step]: 0 };
    });
  }, []);

  const handleStepClick = useCallback((step) => {
    const leaving = step !== currentStep;
    if (leaving) confirmStepSelectionIfNeeded(currentStep);
    setCurrentStep(step);
  }, [currentStep, confirmStepSelectionIfNeeded]);

  const handleQuestionClick = useCallback((step, index) => {
    setSelectedByStep((prev) => ({ ...prev, [step]: index }));
  }, []);

  const handleNext = useCallback(() => {
    confirmStepSelectionIfNeeded(currentStep);
    setCurrentStep((s) => Math.min(4, s + 1));
  }, [currentStep, confirmStepSelectionIfNeeded]);

  const handleConfirm = useCallback(async () => {
    const travelTypeIndex = selectedByStep[1] ?? 0;
    const templateIndex = selectedByStep[2] ?? 0;
    const payload = {
      travel_type: (travelTypeIndex != null ? TRAVEL_TYPE_VALUES[travelTypeIndex] : TRAVEL_TYPE_VALUES[0]),
      is_pattern_needed: (templateIndex != null ? templateIndex === 1 : false), // 0 — чистый, 1 — шаблон
      checkplan_name: planName.trim() || "",
      cover_url: coverImage === DEFAULT_COVER_IMAGE ? "" : coverImage,
    };
    setCreateLoading(true);
    setCreateError(null);
    try {
      const base = getApiUrl();
      const url = base ? `${base}/api/check-plans/custom/create` : "/api/check-plans/custom/create";
      const headers = { "Content-Type": "application/json" };
      try {
        const auth = getAuth();
        if (auth?.token && typeof auth.token === "string") {
          headers.Authorization = `Bearer ${auth.token.trim()}`;
        }
      } catch (_) {}
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data?.detail;
        const message = Array.isArray(detail) ? detail[0]?.msg : (typeof detail === "string" ? detail : data?.message) || "Не удалось создать чек-план";
        throw new Error(message);
      }
      const idStr = data?.id_str;
      if (idStr) {
        const seg = buildCheckplanPublicSegment({
          id_str: idStr,
          title: data?.title,
          id: typeof data?.id === "number" ? data.id : undefined,
        });
        router.push(`/create-checkplan/${encodeURIComponent(seg)}?onboarding=1`);
      } else {
        throw new Error("Сервер не вернул id плана");
      }
    } catch (err) {
      setCreateError(err.message || "Ошибка создания плана");
    } finally {
      setCreateLoading(false);
    }
  }, [selectedByStep, planName, coverImage, router]);

  const handleBackButton = useCallback(() => {
    if (currentStep <= 1) return;
    setCurrentStep((s) => s - 1);
  }, [currentStep]);

  const handleCoverFileChange = useCallback(async (e) => {
    const file = e.target?.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setCoverError("Выберите изображение (JPG, PNG и т.д.)");
      return;
    }
    setCoverError(null);
    setCoverLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const base = getApiUrl();
      const url = base ? `${base}${UPLOAD_COVER_API}` : UPLOAD_COVER_API;
      const headers = {};
      try {
        const auth = getAuth();
        if (auth?.token && typeof auth.token === "string") {
          headers.Authorization = `Bearer ${auth.token.trim()}`;
        }
      } catch (_) {}

      const res = await fetch(url, {
        method: "POST",
        headers,
        body: formData,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const detail = data?.detail;
        let message = data?.message || "Ошибка загрузки";
        if (detail != null) {
          if (typeof detail === "string") message = detail;
          else if (Array.isArray(detail) && detail[0]?.msg) message = detail[0].msg;
        }
        throw new Error(message);
      }
      // Бэкенд возвращает url (полный) или path (относительный) — для отображения нужен полный URL
      const imageUrl = data.url || (base && data.path ? `${base.replace(/\/$/, "")}${data.path}` : null) || data.path;
      if (imageUrl) setCoverImage(imageUrl);
    } catch (err) {
      setCoverError(err.message || "Не удалось загрузить изображение");
    } finally {
      setCoverLoading(false);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  }, []);

  const handleCoverClick = useCallback(() => {
    coverInputRef.current?.click();
  }, []);

  const currentQuestions = STEP_QUESTIONS[currentStep] ?? STEP_QUESTIONS[1];
  // На шагах 1 и 2 показываем первый вариант как выбранный, если пользователь ещё не выбрал явно
  const currentSelected =
    currentStep === 1 || currentStep === 2
      ? (selectedByStep[currentStep] ?? 0)
      : (selectedByStep[currentStep] ?? null);

  // Результаты прохождения шагов (для сохранения и отправки)
  const stepResults = useMemo(
    () => ({
      1: selectedByStep[1] != null ? STEP_1_OPTIONS[selectedByStep[1]] : null,
      2: selectedByStep[2] != null ? STEP_2_OPTIONS[selectedByStep[2]] : null,
      3: planName.trim() || null,
      4: coverImage || null,
    }),
    [selectedByStep, planName, coverImage]
  );

  useEffect(() => {
    console.log("Creating: step results", stepResults);
  }, [stepResults]);

  const isStepCompleted = useCallback(
    (step) => {
      if (step === 3) return planName.trim().length > 0;
      return selectedByStep[step] != null;
    },
    [planName, selectedByStep]
  );

  // Кнопка «Создать чек-план» активна только если все четыре шага заполнены (обложка — загружена пользователем, не плейсхолдер)
  const isAllStepsFilled =
    selectedByStep[1] != null &&
    selectedByStep[2] != null &&
    planName.trim().length > 0 &&
    coverImage !== DEFAULT_COVER_IMAGE;

  const stepsSliderRef = useRef(null);
  const activeStepRef = useRef(null);

  // На мобильном: слайдер сразу в начальном положении (scrollLeft = 0), влево не досдвинуть
  useEffect(() => {
    const el = stepsSliderRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.innerWidth > 701) return;
    el.scrollLeft = 0;
  }, []);

  useEffect(() => {
    const el = stepsSliderRef.current;
    if (!el || typeof window === "undefined") return;
    if (window.innerWidth > 701) return;
    if (currentStep === 1) {
      el.scrollLeft = 0;
      return;
    }
    // Прокручиваем к активному шагу
    activeStepRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }, [currentStep]);

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.backRow}
        role="button"
        tabIndex={0}
        onClick={goBack}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            goBack();
          }
        }}
        aria-label="Назад"
      >
        <RoundButton
          variant="white"
          icon={
            <PublicImage
              src="/icons/system/ArrowLeft.svg"
              alt=""
              width={12}
              height={12}
              style={{ color: "var(--grayscale-dark-gray)" }}
            />
          }
          aria-hidden
        />
        <span className="subinfo" style={{ color: "var(--grayscale-dark-gray)" }}>
          Назад
        </span>
      </div>

      <div className={styles.titleBlock}>
        <h1 className="title_1" style={{ color: "var(--grayscale-dark-gray)" }}>
          Создание чекплана
        </h1>
      </div>

      <div className={styles.mainBlock}>
        <div
          ref={stepsSliderRef}
          className={styles.stepsRowSlider}
          role="region"
          aria-label="Шаги создания"
        >
          <div className={styles.stepsRow}>
          {STEPS.map((step, index) => (
            <div key={step} className={styles.stepsRowInner}>
              <div
                ref={step === currentStep ? activeStepRef : null}
                className={styles.stepCell}
              >
                <ButtonsMini
                  state={
                    step === currentStep
                      ? "current"
                      : isStepCompleted(step)
                        ? "completed"
                        : "notcompleted"
                  }
                  label={String(step)}
                  onClick={() => handleStepClick(step)}
                />
                <span
                  className={`subtitle_2 ${
                    step === currentStep
                      ? styles.stepCellSubtitleActive
                      : styles.stepCellSubtitle
                  }`}
                >
                  {STEP_LABELS[step]}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`${styles.connector} ${
                    isStepCompleted(step) ? styles.connectorLavander : ""
                  }`}
                  aria-hidden
                />
              )}
            </div>
          ))}
          </div>
        </div>

        <div
          key={currentStep}
          className={styles.stepContent}
        >
          {currentStep === 3 ? (
            <div className={styles.stepNameBlock}>
              <h2
                className={`title_2 ${styles.stepNameTitle}`}
                style={{ color: "var(--grayscale-dark-gray)" }}
              >
                Как назовем этот план?
              </h2>
              <p
                className={`paragraph ${styles.stepNameDescription}`}
                style={{ color: "var(--grayscale-dark-gray)" }}
              >
                Длинные названия могут обрезаться в каталоге, рекомендуем
                использовать краткое описание
              </p>
              <div className={styles.stepNameInputWrap}>
                <Input
                  typeOfInput="text"
                  placeholder='Например "Токио 2026"'
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  maxLength={26}
                />
              </div>
              <span
                className={`label ${styles.stepNameCounter}`}
                style={{ color: "var(--grayscale-gray)" }}
              >
                {planName.length}/26
              </span>
            </div>
          ) : currentStep === 4 ? (
            <div className={styles.stepCoverBlock}>
              <h2
                className={`title_2 ${styles.stepCoverTitle}`}
                style={{ color: "var(--grayscale-dark-gray)" }}
              >
                Выбери обложку для плана
              </h2>
              <div className={styles.coverWrap}>
                <div className={styles.coverImageLayer}>
                  <Image
                    src={coverImage}
                    alt=""
                    fill
                    className={styles.coverImage}
                    sizes="(max-width: 640px) 100vw, 464px"
                    unoptimized
                  />
                </div>
                {coverLoading && (
                  <div className={styles.coverLoadingOverlay} aria-live="polite">
                    Загрузка…
                  </div>
                )}
                {coverError && (
                  <span className={styles.coverErrorText}>{coverError}</span>
                )}
                {currentStep === 4 && createError && (
                  <span className={styles.coverErrorText}>{createError}</span>
                )}
                <div
                  className={styles.coverUploadTrigger}
                  onClick={handleCoverClick}
                  onKeyDown={(e) => e.key === "Enter" && handleCoverClick()}
                  role="button"
                  tabIndex={0}
                  aria-label="Загрузить обложку"
                >
                  <input
                    ref={coverInputRef}
                    type="file"
                    accept="image/*"
                    className={styles.coverHiddenInput}
                    aria-hidden
                    onChange={handleCoverFileChange}
                  />
                  {coverImage === DEFAULT_COVER_IMAGE && (
                    <span
                      className="subinfo"
                      style={{ color: "var(--grayscale-gray)" }}
                    >
                      Нажмите, чтобы выбрать изображение
                    </span>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className={styles.questionsBlock}>
              {currentQuestions.map((item, index) => (
                <div
                  key={index}
                  className={`${styles.questionsBlockItem} ${
                    currentStep === 1 && index === 4
                      ? styles.questionsBlockItemCentered
                      : ""
                  }`}
                >
                  <Questions
                    text={item.text}
                    title={item.title}
                    description={item.description}
                    imageSrc={item.imageSrc}
                    selected={currentSelected === index}
                    onClick={() => handleQuestionClick(currentStep, index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`${styles.actionsRow} ${currentStep === 4 ? styles.actionsRowStep4 : ""}`}>
          <Button
            color={currentStep === 1 ? "inactive" : "outline"}
            Text="Назад"
            type="button"
            disabled={currentStep === 1}
            onClick={currentStep === 1 ? undefined : handleBackButton}
          />
          {/* <Button
            color="blue"
            Text={currentStep === 4 ? "Создать чек-план" : "Вперед"}
            type="button"
            onClick={handleNext}
          /> */}
          { currentStep === 4 ? 
          <Button
            color={isAllStepsFilled ? "blue" : "inactive"}
            Text={createLoading ? "Создание…" : "Создать чек-план"}
            type="button"
            disabled={createLoading || !isAllStepsFilled}
            onClick={handleConfirm}
          /> 
          : 
          <Button
          color="blue"
          Text="Вперед"
          type="button"
          onClick={handleNext}
          />}
        </div>
      </div>
    </div>
  );
}
