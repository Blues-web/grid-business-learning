const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

require("../assets/roadmap.js");
require("../assets/business-maps.js");
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

test("课程正文不包含模板占位式讲解", () => {
  const serialized = JSON.stringify(course);
  const placeholders = [
    "按要求完成本环节并留下必要的业务结果",
    "先从业务目的和对象关系出发",
    "理解其业务目的、关联对象和异常影响",
    "掌握“",
  ];

  placeholders.forEach((placeholder) => {
    assert.equal(serialized.includes(placeholder), false, `仍包含模板文案：${placeholder}`);
  });
});

test("第 04～32 讲具备定义、判断和闭环说明", () => {
  course.chapters
    .filter((chapter) => Number(chapter.id) >= 4)
    .forEach((chapter) => {
      const background = chapter.sections.find((section) => section.id === "background");
      const process = chapter.sections.find((section) => section.id === "process");
      const summary = chapter.sections.find((section) => section.id === "summary");

      assert.match(background.html, /一句话理解/);
      assert.doesNotMatch(process.html, /按要求完成|先从业务目的/);
      assert.match(summary.html, /判断原则|判断是否交到底|判断重点/);
      assert.match(chapter.quiz[1].question, /对象|关系|区别/);
      assert.match(chapter.quiz[2].question, /闭环|判断|处理/);
    });
});

test("第 09～29 讲均包含完整业务模块清单", () => {
  course.chapters
    .filter((chapter) => Number(chapter.id) >= 9 && Number(chapter.id) <= 29)
    .forEach((chapter) => {
      const moduleSection = chapter.sections.find((section) => section.id === "modules");
      assert.ok(moduleSection, `第 ${chapter.id} 讲缺少业务模块清单`);
      assert.match(moduleSection.html, /plain-term-grid/);
      assert.match(moduleSection.html, /process-lanes/);
      assert.match(moduleSection.html, /覆盖边界/);
    });
});

test("易混章节的关键术语均进入正文", () => {
  const expectedTerms = {
    "4": ["用电地址", "结算账户", "表位"],
    "6": ["计量方式", "采集链路", "数据质量"],
    "7": ["设备主人", "缺陷", "故障", "检修", "现场安全"],
    "8": ["客户内部故障", "欠费停电", "电压异常", "采集异常"],
    "15": ["派工", "到场履职", "现场取证", "作业结果"],
    "16": ["挂起", "退回", "延期", "超期"],
    "19": ["分级管控", "五维评价", "归档"],
    "20": ["设备主人", "客户经理", "产权人", "管理单位", "数据范围"],
    "21": ["箱组", "计量箱", "表位", "电能表", "箱表关系"],
    "28": ["离线缓存", "照片与定位", "重传", "完成状态"],
    "29": ["归属冲突", "状态冲突", "责任追溯"],
    "31": ["现场发现", "责任确认", "闭环结果"],
    "32": ["业务定位", "影响范围", "需求拆解", "上下游"],
  };

  Object.entries(expectedTerms).forEach(([chapterId, terms]) => {
    const chapter = course.chapters.find((item) => item.id === chapterId);
    const serialized = JSON.stringify(chapter);
    terms.forEach((term) => {
      assert.equal(serialized.includes(term), true, `第 ${chapterId} 讲缺少术语：${term}`);
    });
  });
});

test("平台与微应用模块映射覆盖关键业务分支", () => {
  const expectedModules = {
    "9": ["任务入口与工作台", "标准作业与安全能力", "感知、统计与支撑"],
    "10": ["工单中心", "承载力与派工策略", "归档"],
    "11": ["危险点与安全措施", "勘察结论", "第三方和外部任务"],
    "12": ["责任田地图", "人员接单管理", "派工策略"],
    "13": ["任务交底", "安全交底", "十个不"],
    "14": ["风险与安全措施", "转派与人员变更", "终结与第三方票"],
    "15": ["到场履职", "现场感知", "告知与客户沟通"],
    "16": ["异常工单申请", "工单挂起与审批", "强制终结"],
    "17": ["安全知识库", "标准作业卡", "违章申诉"],
    "18": ["工单挂接配置", "生产要素申请", "盘点录入与复核"],
    "19": ["工作量评价", "质量评价", "规范性评价", "效率评价", "风险防范评价", "积分申诉审批"],
    "20": ["设备主人制/采集 2.0", "智能巡视", "一键装拆", "现场停复电", "激光打码与标签", "数字档案/计量追溯"],
    "21": ["箱组管理", "表位", "图像识别与照片", "激光打码", "待上传与异常整改"],
    "22": ["单户作业", "批量作业", "整箱作业", "现场停复电", "红外/图像抄表", "客户确认与电子单"],
    "23": ["周期核抄", "白名单与查无此表", "整改与验收", "智能巡视"],
    "24": ["空间拓扑关系", "设备归属台区", "异常冲突"],
    "25": ["现场补抄", "现场检验", "失准更换", "终端调试"],
    "26": ["缺陷等级", "重复判断", "责任确认", "形成整改任务"],
    "27": ["配件与材料需求", "整改退回与延期", "验收不通过", "整改申诉"],
    "28": ["现场发起", "待上传管理", "幂等与重复提交", "证据绑定"],
    "29": ["追溯链路", "链路核查", "归属冲突", "状态与结果冲突", "责任追溯"],
  };

  Object.entries(expectedModules).forEach(([chapterId, terms]) => {
    const chapter = course.chapters.find((item) => item.id === chapterId);
    const moduleSection = chapter.sections.find((section) => section.id === "modules");
    const serialized =
      chapterId === "19" || chapterId === "29"
        ? JSON.stringify(chapter)
        : moduleSection.html;
    terms.forEach((term) => {
      assert.equal(
        serialized.includes(term),
        true,
        `第 ${chapterId} 讲缺少业务模块：${term}`,
      );
    });
  });
});

test("五维评价使用当前项目的五个实际评分维度", () => {
  const chapter = course.chapters.find((item) => item.id === "19");
  const serialized = JSON.stringify(chapter);

  ["工作量", "质量", "规范性", "效率", "风险防范"].forEach((term) => {
    assert.match(serialized, new RegExp(term));
  });
  assert.doesNotMatch(serialized, /例如安全、规范、质量、及时性和证据完整性/);
});

test("第 13 讲直接解释任务交底，并与安全交底区分", () => {
  const chapter = course.chapters.find((item) => item.id === "13");
  const serialized = JSON.stringify(chapter);

  assert.match(serialized, /开工前/);
  assert.match(serialized, /对象、边界、分工/);
  assert.match(serialized, /完成标准/);
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
