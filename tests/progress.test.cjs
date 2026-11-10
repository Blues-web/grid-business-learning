const test = require("node:test");
const assert = require("node:assert/strict");
const Progress = require("../assets/progress.js");

const chapters = [{ id: "1" }, { id: "2" }, { id: "3" }];

test("自然日计算支持跨月、跨年和闰日", () => {
  assert.equal(Progress.addDays("2026-12-31", 1), "2027-01-01");
  assert.equal(Progress.addDays("2028-02-28", 1), "2028-02-29");
  assert.equal(Progress.addDays("2027-02-28", 1), "2027-03-01");
});

test("首次打开只有第01章可学习", () => {
  const state = Progress.createDefaultState("2026-11-10");
  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-10");

  assert.deepEqual(
    statuses.map((item) => item.status),
    ["available", "locked", "locked"],
  );
  assert.equal(Progress.resolveCurrentChapter(state, chapters, "2026-11-10"), 1);
});

test("完成第01章后当天不能提前进入第02章", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "1", 3, 3, "2026-11-10");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-10");
  assert.equal(statuses[0].status, "completed");
  assert.equal(statuses[1].status, "locked");
  assert.equal(statuses[1].unlockDate, "2026-11-11");
});

test("第二天自动选择第02章", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "1", 2, 3, "2026-11-10");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-11");
  assert.equal(statuses[1].status, "available");
  assert.equal(Progress.resolveCurrentChapter(state, chapters, "2026-11-11", true), 2);
});

test("章节必须按顺序解锁", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "2", 3, 3, "2026-11-10");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-12");
  assert.equal(statuses[1].status, "locked");
  assert.equal(statuses[2].status, "locked");
  assert.equal(statuses[2].unlockDate, null);
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

test("完成三章后进入最后一章复习", () => {
  let state = Progress.createDefaultState("2026-11-10");
  state = Progress.completeChapter(state, "1", 3, 3, "2026-11-10");
  state = Progress.completeChapter(state, "2", 3, 3, "2026-11-11");
  state = Progress.completeChapter(state, "3", 3, 3, "2026-11-12");

  const statuses = Progress.chapterStatuses(state, chapters, "2026-11-13");
  assert.deepEqual(
    statuses.map((item) => item.status),
    ["completed", "completed", "completed"],
  );
  assert.equal(Progress.resolveCurrentChapter(state, chapters, "2026-11-13", true), 3);
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
