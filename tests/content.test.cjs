const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

require("../assets/roadmap.js");
require("../assets/lesson-details.js");
require("../assets/content.js");

const course = globalThis.GRID_COURSE;

test("课程包含完整的 32 讲", () => {
  assert.equal(course.chapters.length, 32);
  assert.deepEqual(
    course.chapters.map((chapter) => chapter.id),
    Array.from({ length: 32 }, (_, index) => String(index + 1)),
  );
});

test("每章都有目标、正文、总结、测验和下一节预告", () => {
  course.chapters.forEach((chapter) => {
    assert.ok(chapter.objectives.length >= 3);
    assert.ok(chapter.sections.length >= 8);
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

test("课程正文不包含数据库和接口实现示例", () => {
  const serialized = JSON.stringify(course);
  assert.equal(serialized.includes("model-table"), false);
  assert.equal(serialized.includes("接口设计示意"), false);
  assert.equal(serialized.includes("<pre><code>"), false);
});

test("第 13 讲直接解释任务交底，并与安全交底区分", () => {
  const chapter = course.chapters.find((item) => item.id === "13");
  const serialized = JSON.stringify(chapter);

  assert.match(serialized, /开工前/);
  assert.match(serialized, /对象、边界、分工、标准、异常/);
  assert.match(serialized, /任务交底回答/);
  assert.match(serialized, /安全交底回答/);
  assert.match(serialized, /范围变化/);
});

test("所有教学插图均存在于本地资源目录", () => {
  const serialized = JSON.stringify(course);
  const sources = [...serialized.matchAll(/src=\\?\"([^\"\\]+)\\+?/g)].map(
    (match) => match[1],
  );

  assert.ok(sources.length >= 10);
  assert.equal(sources.some((source) => source.endsWith(".svg")), false);
  sources.forEach((source) => {
    const relative = source.replace("./", "");
    assert.equal(
      fs.existsSync(path.join(__dirname, "..", relative)),
      true,
      `缺少教学插图：${source}`,
    );
  });
});
