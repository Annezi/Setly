"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import PublicImage from "@/app/components/globals/public-image";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import RoundButton from "@/app/components/atomic/atoms/buttons-round/buttons-round";
import Button from "@/app/components/atomic/atoms/buttons/buttons";
import { getAuth } from "@/app/lib/auth-storage";
import { applyTypograf } from "@/app/lib/typograf";
import styles from "./test-runner.module.css";

function computeResult(test, answers) {
  const scoreByResultId = {};

  answers.forEach((optionIndex, questionIndex) => {
    if (optionIndex == null) return;
    const option = test.questions?.[questionIndex]?.options?.[optionIndex];
    if (!option?.resultId) return;
    scoreByResultId[option.resultId] =
      (scoreByResultId[option.resultId] || 0) + (option.score || 1);
  });

  const tieBreakResultId = test.resultRules?.tieBreakResultId;
  const tieBreakResult =
    test.results?.find((result) => result.id === tieBreakResultId) ||
    test.results?.[0] ||
    null;
  const minScore = Number(test.resultRules?.minScore || 0);

  let winner = tieBreakResult;
  let winnerScore = -1;
  let leadersCount = 0;

  test.results?.forEach((result) => {
    const currentScore = scoreByResultId[result.id] || 0;
    if (currentScore > winnerScore) {
      winner = result;
      winnerScore = currentScore;
      leadersCount = 1;
      return;
    }
    if (currentScore === winnerScore) {
      leadersCount += 1;
    }
  });

  if (winnerScore < minScore) return tieBreakResult;
  if (leadersCount > 1) return tieBreakResult;
  return winner;
}

function CopyLinkToast({ show, onExited }) {
  if (!show || typeof document === "undefined") return null;
  return createPortal(
    <div className={styles.copyLinkToast} role="status" aria-live="polite">
      Ссылка на тест скопирована
      <span className={styles.toastTimer} onAnimationEnd={onExited} aria-hidden />
    </div>,
    document.body
  );
}

export default function TestRunner({ test }) {
  const router = useRouter();
  const [phase, setPhase] = useState("intro");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(
    () => new Array(test.questions?.length || 0).fill(null)
  );
  const [showCopyLinkToast, setShowCopyLinkToast] = useState(false);

  const currentQuestion = test.questions?.[questionIndex];
  const selectedOption = answers[questionIndex];

  const result = useMemo(() => {
    if (phase !== "result") return null;
    return computeResult(test, answers);
  }, [answers, phase, test]);

  const handleBackRoute = useCallback(() => {
    router.push("/tests");
  }, [router]);

  const handleSelectOption = useCallback((optionIndex) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[questionIndex] = optionIndex;
      return next;
    });
  }, [questionIndex]);

  const handleStart = useCallback(() => {
    setPhase("quiz");
    setQuestionIndex(0);
  }, []);

  const handlePrevQuestion = useCallback(() => {
    setQuestionIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextQuestion = useCallback(() => {
    if (selectedOption == null) return;
    const isLastQuestion = questionIndex === (test.questions?.length || 1) - 1;
    if (isLastQuestion) {
      setPhase("result");
      return;
    }
    setQuestionIndex((prev) => prev + 1);
  }, [questionIndex, selectedOption, test.questions?.length]);

  const handleRestart = useCallback(() => {
    setAnswers(new Array(test.questions?.length || 0).fill(null));
    setQuestionIndex(0);
    setPhase("intro");
  }, [test.questions?.length]);

  const handleUseTemplate = useCallback(() => {
    const auth = getAuth();
    if (auth?.token) {
      router.push("/creating");
      return;
    }
    router.push("/login");
  }, [router]);

  const handleShareTest = useCallback(() => {
    const url =
      typeof window !== "undefined" ? `${window.location.origin}/tests/${test.id}` : "";
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(url).then(() => setShowCopyLinkToast(true));
      return;
    }
    setShowCopyLinkToast(true);
  }, [test.id]);

  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <div
          className={styles.backRow}
          role="button"
          tabIndex={0}
          onClick={handleBackRoute}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleBackRoute();
            }
          }}
          aria-label="Назад к тестам"
        >
          <RoundButton
            variant="white"
            icon={<PublicImage src="/icons/system/ArrowLeft.svg" alt="" width={12} height={12} />}
            aria-hidden
          />
          <span className="subinfo">Назад</span>
        </div>

        {phase === "intro" && (
          <section className={styles.intro} aria-label="Начало теста">
            <Image
              src={test.imageSrc}
              alt={test.imageAlt || ""}
              width={335}
              height={338}
              className={styles.introImage}
            />
            <div className={styles.tags}>
              <span className={styles.tag}>
                <Image src="/icons/images/Lightbulb.svg" alt="" width={20} height={20} />
                Тест
              </span>
              <span className={styles.tag}>
                <Image src="/icons/images/Clock.svg" alt="" width={20} height={20} />
                {test.readTime}
              </span>
            </div>
            <h1 className={`${styles.title} title_1`}>{applyTypograf(test.title)}</h1>
            <p className={`${styles.description} subinfo`}>
              {applyTypograf(test.description)}
            </p>
            <Button Text="Начать" color="blue" onClick={handleStart} />
          </section>
        )}

        {phase === "quiz" && currentQuestion && (
          <section className={styles.quiz} aria-label="Вопрос теста">
            <Image
              src={test.imageSrc}
              alt=""
              width={214}
              height={214}
              className={styles.quizImage}
            />
            <p className={`${styles.counter} subinfo`}>
              Вопрос {questionIndex + 1} из {test.questions.length}
            </p>
            <h2 className={`${styles.questionTitle} title_1`}>
              {applyTypograf(currentQuestion.title)}
            </h2>

            <div className={styles.optionsGrid}>
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedOption === index;
                return (
                  <button
                    key={index}
                    type="button"
                    className={`${styles.option} paragraph ${isSelected ? styles.optionSelected : ""}`}
                    onClick={() => handleSelectOption(index)}
                    aria-pressed={isSelected}
                  >
                    {applyTypograf(option.text)}
                  </button>
                );
              })}
            </div>

            <div className={styles.actions}>
              {questionIndex > 0 && (
                <Button Text="Назад" color="outline" onClick={handlePrevQuestion} />
              )}
              <Button
                Text="Вперед"
                color={selectedOption == null ? "inactive" : "blue"}
                onClick={handleNextQuestion}
                disabled={selectedOption == null}
              />
            </div>
          </section>
        )}

        {phase === "result" && result && (
          <section className={styles.result} aria-label="Результат теста">
            <Image
              src={test.imageSrc}
              alt=""
              width={214}
              height={214}
              className={styles.resultImage}
            />
            <span className={`${styles.resultLabel} subinfo`}>Результат</span>
            <h2 className={`${styles.resultTitleSmall} subtitle_1`}>
              {applyTypograf(test.title)}
            </h2>
            <h1 className={`${styles.resultTitle} title_1`}>
              {applyTypograf(`Вы — ${result.title}`)}
            </h1>
            <p className={`${styles.resultDescription} paragraph`}>
              {applyTypograf(result.description)}
            </p>
            <div className={styles.actions}>
              <Button Text="Пройти заново" color="outline" onClick={handleRestart} />
              <Button
                Text="Поделиться тестом"
                color="blue"
                onClick={handleShareTest}
              />
            </div>
          </section>
        )}
      </div>

      {phase === "result" && (
        <section className={styles.templatesBlock} aria-labelledby="templates-heading">
          <div className={styles.templatesLeft}>
            <Image
              src={test.cta?.imageSrc || "/img/main/article3.webp"}
              alt={test.cta?.imageAlt || "Шаблоны для поездок"}
              width={572}
              height={572}
              className={styles.templatesImage}
            />
          </div>
          <div className={styles.templatesRight}>
            <h2 id="templates-heading" className={`${styles.templatesTitle} title_1`}>
              {applyTypograf(
                test.cta?.title || "Попробуй наши шаблоны для поездок"
              )}
            </h2>
            <div className={styles.templatesDescriptionWrap}>
              <p className={`${styles.templatesDescription} paragraph`}>
                {applyTypograf(
                  test.cta?.description ||
                    "Практично, удобно, а ещё мы предусмотрели все важные пункты, тебе осталось только скопировать и настроить под себя"
                )}
              </p>
              <Button
                Text={test.cta?.buttonText || "Использовать"}
                color="white"
                onClick={handleUseTemplate}
              />
            </div>
          </div>
        </section>
      )}
      <CopyLinkToast
        show={showCopyLinkToast}
        onExited={() => setShowCopyLinkToast(false)}
      />
    </main>
  );
}
