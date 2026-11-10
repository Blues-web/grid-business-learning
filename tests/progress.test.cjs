const test = require("node:test");
const assert = require("node:assert/strict");
const Progress = require("../assets/progress.js");

const chapters = [{ id: "1" }, { id: "2" }, { id: "3" }];

test("首次打开所有已发布章节都可学习", () => {
  const state = Progress.createDefaultState("2026-11-10");
  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-10");

  assert.equal(state.onboardingSeen, false);
  assert.deepEqual(
    statuses.map((item) => item.status),
    ["available", "available", "available"],
  );
  assert.equal(Progress.resolveCurrentChapter(state, chapters, "2026-11-10"), 1);
});

test("完成第01章不影响其他章节访问", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "1", 3, 3, "2026-11-10");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-10");
  assert.equal(statuses[0].status, "completed");
  assert.equal(statuses[1].status, "available");
  assert.equal(statuses[2].status, "available");
});

test("可以直接选择任意已发布章节", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state.currentChapter = 3;
  assert.equal(Progress.resolveCurrentChapter(state, chapters, "2026-11-10", true), 3);
});

test("完成记录可以乱序产生", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "2", 3, 3, "2026-11-10");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-12");
  assert.equal(statuses[1].status, "completed");
  assert.equal(statuses[0].status, "available");
  assert.equal(statuses[2].status, "available");
});

test("重复完成保留原完成日期并记录更高分", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "1", 2, 3, "2026-11-10");
  state = Progress.completeChapter(state, "1", 3, 3, "2026-11-15");

  assert.deepEqual(state.completed["1"], {
    score: 3,
    total: 3,
    completedAt: "2026-11-10",
  });
});

test("全部完成后仍保留当前自由选择", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "1", 3, 3, "2026-11-10");
  state = Progress.completeChapter(state, "2", 3, 3, "2026-11-10");
  state = Progress.completeChapter(state, "3", 3, 3, "2026-11-10");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-10");
  assert.deepEqual(
    statuses.map((item) => item.status),
    ["completed", "completed", "completed"],
  );
  state.currentChapter = 2;
  assert.equal(Progress.resolveCurrentChapter(state, chapters, "2026-11-10", true), 2);
});

test("测验分数按正确选项计算", () => {
  const quiz = [{ correct: 1 }, { correct: 2 }, { correct: 3 }];
  assert.equal(Progress.quizScore([1, 0, 3], quiz), 2);
  assert.equal(Progress.quizScore([1, 2, 3], quiz), 3);
});

test("损坏的本地数据会回退到安全初始状态", () => {
  const state = Progress.normalizeState(
    { version: 99, currentChapter: "bad" },
    "2026-11-10",
  );
  assert.deepEqual(state, Progress.createDefaultState("2026-11-10"));
});

test("首次引导状态兼容旧进度并保留已查看状态", () => {
  const legacyState = Progress.normalizeState(
    {
      version: Progress.STATE_VERSION,
      currentChapter: 3,
      completed: {},
      quizDrafts: {},
      reading: {},
    },
    "2026-11-10",
  );
  const viewedState = Progress.normalizeState(
    {
      ...legacyState,
      onboardingSeen: true,
    },
    "2026-11-10",
  );

  assert.equal(legacyState.onboardingSeen, false);
  assert.equal(viewedState.onboardingSeen, true);
});
