(function attachProgressModel(root, factory) {
  const model = factory();

  if (typeof module === "object" && module.exports) {
    module.exports = model;
  }

  root.LearningProgress = model;
})(typeof globalThis !== "undefined" ? globalThis : this, function createProgressModel() {
  "use strict";

  const STORAGE_KEY = "sgcc-grid-learning-progress-v1";
  const STATE_VERSION = 1;
  const PASS_SCORE = 2;

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function dateKey(date = new Date()) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }

  function isValidDateKey(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ""))) {
      return false;
    }

    const [year, month, day] = value.split("-").map(Number);
    const parsed = new Date(Date.UTC(year, month - 1, day));
    return (
      parsed.getUTCFullYear() === year &&
      parsed.getUTCMonth() === month - 1 &&
      parsed.getUTCDate() === day
    );
  }

  function createDefaultState(today = dateKey()) {
    return {
      version: STATE_VERSION,
      startedAt: today,
      lastActiveDate: today,
      currentChapter: 1,
      onboardingSeen: false,
      completed: {},
      quizDrafts: {},
      reading: {},
    };
  }

  function normalizeState(raw, today = dateKey()) {
    if (!raw || typeof raw !== "object" || raw.version !== STATE_VERSION) {
      return createDefaultState(today);
    }

    const completed = {};
    if (raw.completed && typeof raw.completed === "object") {
      Object.entries(raw.completed).forEach(([chapterNumber, record]) => {
        if (
          record &&
          Number.isFinite(Number(record.score)) &&
          Number.isFinite(Number(record.total)) &&
          isValidDateKey(record.completedAt)
        ) {
          completed[chapterNumber] = {
            score: Math.max(0, Number(record.score)),
            total: Math.max(1, Number(record.total)),
            completedAt: record.completedAt,
          };
        }
      });
    }

    const quizDrafts = {};
    if (raw.quizDrafts && typeof raw.quizDrafts === "object") {
      Object.entries(raw.quizDrafts).forEach(([chapterNumber, draft]) => {
        if (draft && typeof draft === "object") {
          quizDrafts[chapterNumber] = Object.fromEntries(
            Object.entries(draft)
              .filter(([, answer]) => Number.isInteger(Number(answer)) && Number(answer) >= 0)
              .map(([questionIndex, answer]) => [questionIndex, Number(answer)]),
          );
        }
      });
    }

    const reading = {};
    if (raw.reading && typeof raw.reading === "object") {
      Object.entries(raw.reading).forEach(([chapterNumber, percent]) => {
        const value = Number(percent);
        if (Number.isFinite(value) && value >= 0) {
          reading[chapterNumber] = Math.min(100, Math.round(value));
        }
      });
    }

    return {
      version: STATE_VERSION,
      startedAt: isValidDateKey(raw.startedAt) ? raw.startedAt : today,
      lastActiveDate: isValidDateKey(raw.lastActiveDate) ? raw.lastActiveDate : today,
      currentChapter:
        Number.isInteger(Number(raw.currentChapter)) && Number(raw.currentChapter) > 0
          ? Number(raw.currentChapter)
          : 1,
      onboardingSeen: raw.onboardingSeen === true,
      completed,
      quizDrafts,
      reading,
    };
  }

  function chapterStatuses(state, chapters, today = dateKey()) {
    return chapters.map((chapter) => {
      const completion = state.completed[chapter.id];
      return {
        id: chapter.id,
        status: completion ? "completed" : "available",
        completion: completion || null,
      };
    });
  }

  function findFirstAvailableIncomplete(state, chapters, today = dateKey()) {
    const status = chapterStatuses(state, chapters, today).find(
      (item) => item.status === "available",
    );
    return status ? Number(status.id) : null;
  }

  function findLatestAccessible(state, chapters, today = dateKey()) {
    const statuses = chapterStatuses(state, chapters, today);
    const preferred = statuses.find(
      (item) => Number(item.id) === Number(state.currentChapter) && item.status !== "locked",
    );
    if (preferred) {
      return Number(preferred.id);
    }

    const accessible = statuses.filter((item) => item.status !== "locked");
    return accessible.length ? Number(accessible[accessible.length - 1].id) : 1;
  }

  function resolveCurrentChapter(state, chapters, today = dateKey(), newDay = false) {
    const currentExists = chapters.some(
      (chapter) => Number(chapter.id) === Number(state.currentChapter),
    );
    return currentExists ? Number(state.currentChapter) : Number(chapters[0]?.id || 1);
  }

  function quizScore(answers, quiz) {
    return quiz.reduce(
      (score, question, index) => score + (Number(answers[index]) === question.correct ? 1 : 0),
      0,
    );
  }

  function completeChapter(state, chapterId, score, total, today = dateKey()) {
    const existing = state.completed[String(chapterId)];
    const completedAt = existing ? existing.completedAt : today;

    return {
      ...state,
      completed: {
        ...state.completed,
        [String(chapterId)]: {
          score: Math.max(Number(score), existing ? existing.score : 0),
          total: Number(total),
          completedAt,
        },
      },
    };
  }

  return {
    STORAGE_KEY,
    STATE_VERSION,
    PASS_SCORE,
    dateKey,
    isValidDateKey,
    createDefaultState,
    normalizeState,
    chapterStatuses,
    findFirstAvailableIncomplete,
    findLatestAccessible,
    resolveCurrentChapter,
    quizScore,
    completeChapter,
  };
});
