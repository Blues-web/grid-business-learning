const test = require("node:test");
const assert = require("node:assert/strict");

require("../assets/content.js");

const course = globalThis.GRID_COURSE;

test("课程包含完整的前三章", () => {
  assert.equal(course.chapters.length, 3);
  assert.deepEqual(
    course.chapters.map((chapter) => chapter.id),
    ["1", "2", "3"],
  );
});

test("每章都有目标、正文、总结、测验和下一节预告", () => {
  course.chapters.forEach((chapter) => {
    assert.ok(chapter.objectives.length >= 3);
    assert.ok(chapter.sections.length >= 2);
    assert.ok(chapter.sections.some((section) => section.id === "summary"));
    assert.equal(chapter.quiz.length, 3);
    assert.ok(chapter.next.title);
  });
});

test("测验答案索引、解析和选项说明完整", () => {
  course.chapters.forEach((chapter) => {
    chapter.quiz.forEach((question) => {
      assert.equal(question.options.length, 4);
      assert.ok(Number.isInteger(question.correct));
      assert.ok(question.correct >= 0 && question.correct < question.options.length);
      assert.ok(question.explanation.length > 10);
      assert.equal(question.optionNotes.length, question.options.length);
    });
  });
});

test("课程正文没有遗留占位符", () => {
  const serialized = JSON.stringify(course);
  assert.equal(serialized.includes("TBD"), false);
  assert.equal(serialized.includes("TODO"), false);
  assert.equal(serialized.includes("待补充"), false);
});
