const test = require("node:test");
const assert = require("node:assert/strict");

require("../assets/roadmap.js");
require("../assets/business-maps.js");
require("../assets/lesson-details.js");
require("../assets/content.js");

const roadmap = globalThis.GRID_ROADMAP;
const lessons = roadmap.stages.flatMap((stage) => stage.lessons);

test("学习路线包含四阶段和三十二讲", () => {
  assert.equal(roadmap.stages.length, 4);
  assert.equal(lessons.length, 32);
  assert.deepEqual(
    roadmap.stages.map((stage) => stage.id),
    ["foundation", "platform", "applications", "integration"],
  );
});

test("课程编号连续且每讲都有目标、知识点和来源", () => {
  assert.deepEqual(
    lessons.map((lesson) => lesson.number),
    Array.from({ length: 32 }, (_, index) => String(index + 1).padStart(2, "0")),
  );
  lessons.forEach((lesson) => {
    assert.ok(lesson.title);
    assert.ok(lesson.goal);
    assert.ok(lesson.keyPoints.length >= 3);
    assert.ok(lesson.source);
  });
});

test("全部 32 讲都对应详细课程", () => {
  const readyLessons = lessons.filter((lesson) => lesson.chapterId);
  assert.deepEqual(
    readyLessons.map((lesson) => lesson.chapterId),
    Array.from({ length: 32 }, (_, index) => String(index + 1)),
  );
  assert.equal(roadmap.stages[0].lessons[0].chapterId, "1");
});

test("平台业务排在设备主人、建档、装拆、拓扑和缺陷之前", () => {
  const platformStage = roadmap.stages.find((stage) => stage.id === "platform");
  const applicationStage = roadmap.stages.find((stage) => stage.id === "applications");
  const platformEnd = Number(platformStage.lessons.at(-1).number);
  const applicationStart = Number(applicationStage.lessons[0].number);
  const applicationTitles = applicationStage.lessons.map((lesson) => lesson.title).join("|");

  assert.ok(platformEnd < applicationStart);
  assert.match(applicationTitles, /设备主人制/);
  assert.match(applicationTitles, /计量箱建档/);
  assert.match(applicationTitles, /装表、拆表与换表/);
  assert.match(applicationTitles, /空间拓扑/);
  assert.match(applicationTitles, /缺陷整改/);
});
