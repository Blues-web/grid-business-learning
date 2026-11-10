const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const appSource = fs.readFileSync(path.join(__dirname, "../assets/app.js"), "utf8");
const roadmapSource = fs.readFileSync(path.join(__dirname, "../assets/roadmap.js"), "utf8");
const stylesSource = fs.readFileSync(path.join(__dirname, "../assets/styles.css"), "utf8");
const htmlSource = fs.readFileSync(path.join(__dirname, "../index.html"), "utf8");

test("首次进入显示学习路线引导", () => {
  assert.match(appSource, /第一次使用/);
  assert.match(appSource, /先看完整学习路线，再选择章节/);
  assert.match(appSource, /data-action="open-roadmap-guide"/);
  assert.match(appSource, /!state\.onboardingSeen/);
  assert.match(stylesSource, /\.learning-guide/);
});

test("学习路线弹窗只展示四个阶段", () => {
  assert.equal(appSource.includes("roadmap-principles"), false);
  assert.equal(appSource.includes("roadmap-lessons"), false);
  assert.equal(appSource.includes("data-roadmap-lesson"), false);
  assert.equal(roadmapSource.includes("principles:"), false);
  assert.match(appSource, /roadmap\.stages/);
  assert.match(appSource, /roadmap-stage-order/);
});

test("路线弹窗提示从课程目录选择具体章节", () => {
  assert.match(htmlSource, /具体章节从课程目录选择/);
});
