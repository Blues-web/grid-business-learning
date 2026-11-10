(function startLearningApp() {
  "use strict";

  const course = window.GRID_COURSE;
  const roadmap = window.GRID_ROADMAP;
  const Progress = window.LearningProgress;
  const chapters = course.chapters;
  const passScore = Progress.PASS_SCORE;

  const dom = {
    chapter: document.getElementById("chapter-content"),
    courseList: document.getElementById("course-list"),
    progressCount: document.getElementById("progress-count"),
    progressValue: document.getElementById("progress-value"),
    progressOrbit: document.getElementById("progress-orbit"),
    progressNote: document.getElementById("progress-note"),
    breadcrumb: document.getElementById("breadcrumb-chapter"),
    todayLabel: document.getElementById("today-label"),
    readingPercent: document.getElementById("reading-percent"),
    readingTrack: document.getElementById("reading-track-fill"),
    mobileProgress: document.getElementById("mobile-progress"),
    menuToggle: document.getElementById("menu-toggle"),
    sidebar: document.getElementById("course-sidebar"),
    sidebarScrim: document.getElementById("sidebar-scrim"),
    sidebarClose: document.getElementById("sidebar-close"),
    stageBadge: document.getElementById("stage-badge"),
    openRoadmap: document.getElementById("open-roadmap"),
    closeRoadmap: document.getElementById("close-roadmap"),
    roadmapDialog: document.getElementById("roadmap-dialog"),
    roadmapTitle: document.getElementById("roadmap-title"),
    roadmapSummary: document.getElementById("roadmap-summary"),
    roadmapContent: document.getElementById("roadmap-content"),
    roadmapFooterClose: document.getElementById("roadmap-footer-close"),
    resetButton: document.getElementById("reset-progress"),
    resetDialog: document.getElementById("reset-dialog"),
    toast: document.getElementById("toast"),
  };

  let today = Progress.dateKey();
  let storageAvailable = true;
  let currentChapterNumber = 1;
  let quizResult = null;
  let toastTimer = null;
  let readingFrame = null;

  function loadStoredState() {
    try {
      const raw = window.localStorage.getItem(Progress.STORAGE_KEY);
      return Progress.normalizeState(raw ? JSON.parse(raw) : null, today);
    } catch (error) {
      storageAvailable = false;
      return Progress.createDefaultState(today);
    }
  }

  let state = loadStoredState();

  function saveState() {
    if (!storageAvailable) {
      return;
    }

    try {
      window.localStorage.setItem(Progress.STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      storageAvailable = false;
      showToast("浏览器存储不可用，本次进度无法长期保存。", "warning");
    }
  }

  function getChapter(number) {
    return chapters.find((chapter) => Number(chapter.id) === Number(number));
  }

  function currentChapter() {
    return getChapter(currentChapterNumber) || chapters[0];
  }

  function stageForChapter(number) {
    return roadmap.stages.find((stage) =>
      stage.lessons.some((lesson) => Number(lesson.number) === Number(number)),
    );
  }

  function statusMap() {
    return new Map(
      Progress.chapterStatuses(state, chapters, today).map((item) => [Number(item.id), item]),
    );
  }

  function isAccessible(number) {
    const status = statusMap().get(Number(number));
    return Boolean(status && status.status !== "locked");
  }

  function selectChapter(number, options = {}) {
    const target = Number(number);
    if (!isAccessible(target)) {
      showToast("请先完成前一章，再学习本章。", "warning");
      return;
    }

    state.currentChapter = target;
    state.lastActiveDate = today;
    currentChapterNumber = target;
    quizResult = null;
    saveState();
    renderAll();

    if (options.scroll !== false) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      dom.chapter.focus({ preventScroll: true });
    }

    closeSidebar();
  }

  function renderSidebar() {
    const statuses = statusMap();
    const completedCount = [...statuses.values()].filter(
      (status) => status.status === "completed",
    ).length;
    const percent = Math.round((completedCount / chapters.length) * 100);

    dom.courseList.innerHTML = "";
    chapters.forEach((chapter) => {
      const status = statuses.get(Number(chapter.id));
      const item = document.createElement("li");
      const button = document.createElement("button");
      button.type = "button";
      button.className = `course-item status-${status.status}`;
      button.dataset.chapter = chapter.id;
      button.setAttribute(
        "aria-label",
        `${chapter.number} ${chapter.title}，${statusText(status)}`,
      );
      if (Number(chapter.id) === currentChapterNumber) {
        button.setAttribute("aria-current", "page");
      }

      const statusIcon = status.status === "completed" ? "✓" : "→";
      button.innerHTML = `
        <span class="course-number">${chapter.number}</span>
        <span class="course-copy">
          <strong>${chapter.title}</strong>
          <small>${chapter.duration}</small>
        </span>
        <span class="course-status" aria-hidden="true">${statusIcon}</span>
      `;
      item.appendChild(button);
      dom.courseList.appendChild(item);
    });

    dom.courseList.querySelectorAll("button:not(:disabled)").forEach((button) => {
      button.addEventListener("click", () => selectChapter(button.dataset.chapter));
    });

    dom.progressCount.textContent = `${completedCount} / ${chapters.length} 章`;
    dom.progressValue.textContent = `${percent}%`;
    dom.mobileProgress.textContent = `${percent}%`;
    dom.progressOrbit.style.setProperty("--progress", `${percent * 3.6}deg`);
    const readyCount = roadmap.stages.reduce(
      (count, stage) => count + stage.lessons.filter((lesson) => lesson.chapterId).length,
      0,
    );
    dom.stageBadge.textContent = `已开放 ${readyCount} 讲`;

    if (completedCount === chapters.length) {
      dom.progressNote.textContent = "已开放课程已完成，可自由复习";
    } else {
      if (!storageAvailable) {
        dom.progressNote.textContent = "当前浏览器无法保存进度";
      } else {
        dom.progressNote.textContent = "32 讲均可自由查看";
      }
    }
  }

  function statusText(status) {
    if (status.status === "completed") {
      return "已完成，可复习";
    }
    if (status.status === "available") {
      return "可学习";
    }
    return "可学习";
  }

  function renderChapter() {
    const chapter = currentChapter();
    const chapterStage = stageForChapter(chapter.id);
    const status = statusMap().get(Number(chapter.id));
    const completion = status.completion;

    document.title = `${chapter.number} ${chapter.title}｜电网业务研习室`;
    dom.breadcrumb.textContent = `第${chapter.number}章`;
    dom.chapter.innerHTML = `
      <header class="chapter-hero">
        <div class="hero-copy">
          <div class="hero-meta">
            <span class="stage-pill">${chapterStage?.title || course.meta.stage}</span>
            <span>第 ${chapter.number} 讲</span>
            <span>${chapter.duration}</span>
          </div>
          <p class="hero-kicker">GRID BUSINESS FIELD NOTES</p>
          <h1>${chapter.title}</h1>
          <p class="hero-subtitle">${chapter.subtitle}</p>
          <div class="tag-list">
            ${chapter.tags.map((tag) => `<span>${tag}</span>`).join("")}
          </div>
        </div>
        <aside class="hero-objectives" aria-label="本章要点">
          <p class="eyebrow">学习完成后，你应能</p>
          ${chapter.objectives.map((objective, index) => `<p><span>${String(index + 1).padStart(2, "0")}</span>${objective}</p>`).join("")}
        </aside>
      </header>

      <div class="chapter-toolbar">
        <nav class="section-nav" aria-label="本章内容导航">
          ${chapter.sections
            .map(
              (section) =>
                `<a href="#section-${chapter.id}-${section.id}">${section.short}</a>`,
            )
            .join("")}
          <a href="#quiz-${chapter.id}">测验</a>
        </nav>
        <span class="completion-chip ${completion ? "is-done" : ""}">
          ${completion ? `已完成 · ${completion.score}/${completion.total}` : "本章进行中"}
        </span>
      </div>

      <div class="reading-column">
        ${chapter.sections
          .map(
            (section) => `
              <section class="lesson-section" id="section-${chapter.id}-${section.id}">
                <div class="section-index">${section.title.split(".")[0].padStart(2, "0")}</div>
                <div class="section-content">
                  <h2>${section.title}</h2>
                  ${section.html}
                </div>
              </section>
            `,
          )
          .join("")}

        <section class="lesson-section quiz-section" id="quiz-${chapter.id}">
          <div class="section-index">Q</div>
          <div class="section-content">
            <div class="quiz-heading">
              <div>
                <p class="eyebrow">随堂测验</p>
                <h2>用三道题确认业务理解</h2>
              </div>
              <div class="quiz-pass-rule"><strong>${passScore}/${chapter.quiz.length}</strong><span>达到即可完成本章</span></div>
            </div>
            <div id="quiz-root"></div>
          </div>
        </section>

        <section class="lesson-section" id="section-${chapter.id}-next">
          <div class="section-index">→</div>
          <div class="section-content">
            <div class="completion-status" id="completion-status"></div>
            <div class="next-card">
              <p class="eyebrow">下一节预告</p>
              <div class="next-number">${chapter.next.number}</div>
              <h2>${chapter.next.title}</h2>
              <p>${chapter.next.text}</p>
            </div>
          </div>
        </section>
      </div>
    `;

    renderQuiz();
    renderCompletionStatus();
    restoreReadingProgress();
  }

  function renderRoadmap() {
    const statuses = statusMap();
    const readyCount = roadmap.stages.reduce(
      (count, stage) => count + stage.lessons.filter((lesson) => lesson.chapterId).length,
      0,
    );
    const totalLessons = roadmap.stages.reduce(
      (count, stage) => count + stage.lessons.length,
      0,
    );

    dom.roadmapTitle.textContent = roadmap.title;
    dom.roadmapSummary.textContent = roadmap.summary;
    dom.openRoadmap.querySelector("small").textContent = `4 阶段 · ${totalLessons} 讲`;
    dom.stageBadge.textContent = `已开放 ${readyCount} 讲`;
    dom.roadmapContent.innerHTML = `
      <section class="roadmap-principles" aria-label="学习原则">
        <p class="eyebrow">学习原则</p>
        <div>${roadmap.principles.map((principle) => `<span>${principle}</span>`).join("")}</div>
      </section>
      <div class="roadmap-stages">
        ${roadmap.stages
          .map(
            (stage) => `
              <section class="roadmap-stage" id="roadmap-${stage.id}">
                <header>
                  <span class="roadmap-stage-order">${stage.order}</span>
                  <div>
                    <p class="eyebrow">阶段 ${stage.order}</p>
                    <h3>${stage.title}</h3>
                    <strong>${stage.subtitle}</strong>
                    <p>${stage.goal}</p>
                  </div>
                  <span class="roadmap-stage-count">${stage.lessons.length} 讲</span>
                </header>
                <ol class="roadmap-lessons">
                  ${stage.lessons
                    .map((lesson) => {
                      const status = lesson.chapterId
                        ? statuses.get(Number(lesson.chapterId))
                        : null;
                      const stateLabel =
                        status?.status === "completed" ? "已完成" : "可学习";
                      const content = `
                        <span class="roadmap-lesson-number">${lesson.number}</span>
                        <span class="roadmap-lesson-main">
                          <strong>${lesson.title}</strong>
                          <small>${lesson.goal}</small>
                          <em>${lesson.keyPoints.join(" · ")}</em>
                          <i>来源：${lesson.source}</i>
                        </span>
                        <span class="roadmap-lesson-status ${status?.status || "available"}">${stateLabel}</span>
                      `;
                      return `<li><button type="button" class="roadmap-lesson is-ready" data-roadmap-lesson="${lesson.number}" data-roadmap-chapter="${lesson.chapterId}">${content}</button></li>`;
                    })
                    .join("")}
                </ol>
              </section>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderQuiz() {
    const chapter = currentChapter();
    const root = document.getElementById("quiz-root");
    if (!root) {
      return;
    }

    const draft = state.quizDrafts[chapter.id] || {};
    const answers = chapter.quiz.map((_, index) => Number(draft[String(index)]));
    const result = quizResult;

    root.innerHTML = `
      <form class="quiz-form" id="quiz-form" novalidate>
        ${chapter.quiz
          .map((question, questionIndex) => {
            const selected = Number.isInteger(answers[questionIndex])
              ? answers[questionIndex]
              : null;
            return `
              <fieldset class="quiz-question" data-question="${questionIndex}">
                <legend><span>${String(questionIndex + 1).padStart(2, "0")}</span>${question.question}</legend>
                <div class="quiz-options">
                  ${question.options
                    .map((option, optionIndex) => {
                      const isCorrect = result && optionIndex === question.correct;
                      const isWrong =
                        result &&
                        selected === optionIndex &&
                        optionIndex !== question.correct;
                      const classes = [
                        "quiz-option",
                        isCorrect ? "is-correct" : "",
                        isWrong ? "is-wrong" : "",
                      ]
                        .filter(Boolean)
                        .join(" ");
                      return `
                        <label class="${classes}">
                          <input
                            type="radio"
                            name="question-${questionIndex}"
                            value="${optionIndex}"
                            data-question="${questionIndex}"
                            ${selected === optionIndex ? "checked" : ""}
                            ${result ? "disabled" : ""}
                          />
                          <span class="option-letter">${String.fromCharCode(65 + optionIndex)}</span>
                          <span>${option}</span>
                        </label>
                      `;
                    })
                    .join("")}
                </div>
                ${
                  result
                    ? `
                      <div class="quiz-feedback ${result.correctness[questionIndex] ? "pass" : "fail"}">
                        <strong>${result.correctness[questionIndex] ? "回答正确" : "需要再辨析"}</strong>
                        <p>${question.explanation}</p>
                        <ul>
                          ${question.optionNotes.map((note) => `<li>${note}</li>`).join("")}
                        </ul>
                      </div>
                    `
                    : ""
                }
              </fieldset>
            `;
          })
          .join("")}
        <div class="quiz-footer" id="quiz-footer"></div>
      </form>
    `;

    const form = document.getElementById("quiz-form");
    form.addEventListener("change", handleQuizChange);
    form.addEventListener("click", handleQuizClick);
    updateQuizFooter();

    if (result) {
      form.classList.add("quiz-submitted");
    }
  }

  function handleQuizChange(event) {
    if (!event.target.matches('input[type="radio"]')) {
      return;
    }

    const chapter = currentChapter();
    const questionIndex = event.target.dataset.question;
    state.quizDrafts[chapter.id] = {
      ...(state.quizDrafts[chapter.id] || {}),
      [questionIndex]: Number(event.target.value),
    };
    saveState();
    updateQuizFooter();
  }

  function handleQuizClick(event) {
    const submit = event.target.closest("[data-action='submit-quiz']");
    const retry = event.target.closest("[data-action='retry-quiz']");

    if (submit) {
      event.preventDefault();
      submitQuiz();
    }

    if (retry) {
      event.preventDefault();
      retryQuiz();
    }
  }

  function currentDraftAnswers() {
    const chapter = currentChapter();
    const draft = state.quizDrafts[chapter.id] || {};
    return chapter.quiz.map((question, index) => {
      const value = Number(draft[String(index)]);
      return Number.isInteger(value) && value >= 0 && value < question.options.length
        ? value
        : undefined;
    });
  }

  function updateQuizFooter() {
    const chapter = currentChapter();
    const footer = document.getElementById("quiz-footer");
    if (!footer) {
      return;
    }

    const answered = currentDraftAnswers().filter(Number.isInteger).length;
    if (quizResult) {
      const passed = quizResult.score >= passScore;
      footer.innerHTML = `
        <div class="quiz-score ${passed ? "pass" : "fail"}">
          <span>${passed ? "已达到完成标准" : "暂未达到完成标准"}</span>
          <strong>${quizResult.score} / ${chapter.quiz.length}</strong>
        </div>
        <div class="quiz-actions">
          <p>${passed ? "本章已完成，可自由查看其他课程。" : `至少答对 ${passScore} 题。建议复习对应知识后再试一次。`}</p>
          <button class="button button-secondary" type="button" data-action="retry-quiz">重新作答</button>
        </div>
      `;
      return;
    }

    footer.innerHTML = `
      <div class="quiz-progress">
        <span>已作答 <strong>${answered}</strong> / ${chapter.quiz.length}</span>
        <div class="mini-track"><span style="width:${(answered / chapter.quiz.length) * 100}%"></span></div>
      </div>
      <button class="button button-primary" type="submit" data-action="submit-quiz" ${answered < chapter.quiz.length ? "disabled" : ""}>
        提交测验
      </button>
    `;
  }

  function submitQuiz() {
    const chapter = currentChapter();
    const answers = currentDraftAnswers();
    if (answers.some((answer) => !Number.isInteger(answer))) {
      showToast("请完成全部题目后再提交。", "warning");
      return;
    }

    const score = Progress.quizScore(answers, chapter.quiz);
    quizResult = {
      score,
      answers,
      correctness: chapter.quiz.map(
        (question, index) => answers[index] === question.correct,
      ),
    };

    if (score >= passScore) {
      const firstCompletion = !state.completed[chapter.id];
      state = Progress.completeChapter(state, chapter.id, score, chapter.quiz.length, today);
      saveState();
      showToast(firstCompletion ? "本章已完成，可自由查看其他课程。" : "测验结果已保存。", "success");
    } else {
      showToast("本章尚未完成，请查看解析后重新作答。", "warning");
    }

    renderQuiz();
    renderSidebar();
    renderCompletionStatus();
  }

  function retryQuiz() {
    const chapter = currentChapter();
    delete state.quizDrafts[chapter.id];
    quizResult = null;
    saveState();
    renderQuiz();
    document.getElementById(`quiz-${chapter.id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function renderCompletionStatus() {
    const chapter = currentChapter();
    const completion = state.completed[chapter.id];
    const element = document.getElementById("completion-status");
    if (!element) {
      return;
    }

    const nextChapter = chapters.find(
      (candidate) => Number(candidate.id) === Number(chapter.id) + 1,
    );

    if (!completion) {
      element.className = "completion-status";
      element.innerHTML = `
        <div class="completion-icon">日</div>
        <div>
          <p class="eyebrow">学习进度</p>
          <h3>所有课程均可自由查看</h3>
          <p>完成测验只用于记录掌握情况，不限制课程访问顺序。</p>
        </div>
      `;
      return;
    }

    const nextText = !nextChapter
      ? "32 讲学习路线已全部完成，可以继续复习或结合实际项目回看重点章节。"
      : `你可以继续第${nextChapter.number}章，也可以自由查看其他课程。`;
    const nextAction =
      nextChapter
        ? `<button class="button button-primary completion-next" type="button" data-action="continue-next" data-chapter="${nextChapter.id}">继续学习第${nextChapter.number}章</button>`
        : "";

    element.className = "completion-status is-complete";
    element.innerHTML = `
      <div class="completion-icon">✓</div>
      <div>
        <p class="eyebrow">完成记录</p>
        <h3>本章已于 ${completion.completedAt} 完成，测验 ${completion.score}/${completion.total}</h3>
        <p>${nextText}</p>
        ${nextAction}
      </div>
    `;
  }

  function formatToday() {
    const date = new Date();
    const weekday = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"][
      date.getDay()
    ];
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${weekday}`;
  }

  function renderAll() {
    renderSidebar();
    renderChapter();
    dom.todayLabel.textContent = formatToday();
  }

  function restoreReadingProgress() {
    window.requestAnimationFrame(updateReadingProgress);
  }

  function updateReadingProgress() {
    readingFrame = null;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent =
      scrollable <= 0 ? 100 : Math.max(0, Math.min(100, (window.scrollY / scrollable) * 100));
    const rounded = Math.round(percent);

    dom.readingPercent.textContent = `${rounded}%`;
    dom.readingTrack.style.width = `${percent}%`;
    state.reading[currentChapterNumber] = rounded;

    window.clearTimeout(updateReadingProgress.saveTimer);
    updateReadingProgress.saveTimer = window.setTimeout(saveState, 450);
  }

  function requestReadingUpdate() {
    if (readingFrame) {
      return;
    }
    readingFrame = window.requestAnimationFrame(updateReadingProgress);
  }

  function showToast(message, tone = "info") {
    window.clearTimeout(toastTimer);
    dom.toast.textContent = message;
    dom.toast.className = `toast is-visible tone-${tone}`;
    toastTimer = window.setTimeout(() => {
      dom.toast.className = "toast";
    }, 3200);
  }

  function openSidebar() {
    document.body.classList.add("menu-open");
    dom.sidebarScrim.hidden = false;
    dom.menuToggle.setAttribute("aria-expanded", "true");
  }

  function closeSidebar() {
    document.body.classList.remove("menu-open");
    dom.sidebarScrim.hidden = true;
    dom.menuToggle.setAttribute("aria-expanded", "false");
  }

  function openRoadmap() {
    renderRoadmap();
    if (typeof dom.roadmapDialog.showModal === "function") {
      dom.roadmapDialog.showModal();
    }
  }

  function closeRoadmap() {
    dom.roadmapDialog.close();
  }

  function checkDateRollover() {
    const newToday = Progress.dateKey();
    if (newToday === today) {
      return;
    }

    today = newToday;
    state = Progress.normalizeState(state, today);
    state.lastActiveDate = today;
    saveState();
    renderAll();
  }

  function handleInitialChapter() {
    const isNewDay = state.lastActiveDate !== today;
    const resolved = Progress.resolveCurrentChapter(state, chapters, today, isNewDay);
    currentChapterNumber = isAccessible(resolved)
      ? resolved
      : Progress.findLatestAccessible(state, chapters, today);
    state.currentChapter = currentChapterNumber;
    state.lastActiveDate = today;
    saveState();
  }

  dom.menuToggle.addEventListener("click", openSidebar);
  dom.sidebarClose.addEventListener("click", closeSidebar);
  dom.sidebarScrim.addEventListener("click", closeSidebar);
  dom.openRoadmap.addEventListener("click", openRoadmap);
  dom.closeRoadmap.addEventListener("click", closeRoadmap);
  dom.roadmapFooterClose.addEventListener("click", closeRoadmap);
  dom.roadmapDialog.addEventListener("click", (event) => {
    if (event.target === dom.roadmapDialog) {
      closeRoadmap();
    }
  });
  dom.roadmapDialog.addEventListener("click", (event) => {
    const lesson = event.target.closest("[data-roadmap-lesson]");
    if (!lesson) {
      return;
    }
    closeRoadmap();
    const targetChapter = lesson.dataset.roadmapChapter;
    if (targetChapter) {
      selectChapter(targetChapter);
    }
  });
  dom.resetButton.addEventListener("click", () => dom.resetDialog.showModal());
  dom.resetDialog.addEventListener("close", () => {
    if (dom.resetDialog.returnValue !== "confirm") {
      return;
    }

    state = Progress.createDefaultState(today);
    currentChapterNumber = 1;
    quizResult = null;
    saveState();
    renderAll();
    window.scrollTo({ top: 0, behavior: "smooth" });
    showToast("本机学习进度已重置。", "success");
  });

  dom.chapter.addEventListener("click", (event) => {
    const continueButton = event.target.closest("[data-action='continue-next']");
    if (!continueButton) {
      return;
    }
    selectChapter(continueButton.dataset.chapter);
  });

  window.addEventListener("scroll", requestReadingUpdate, { passive: true });
  window.addEventListener("resize", requestReadingUpdate, { passive: true });
  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeSidebar();
    }
  });
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
      checkDateRollover();
      requestReadingUpdate();
    }
  });
  window.setInterval(checkDateRollover, 60_000);

  handleInitialChapter();
  renderAll();

  if (!storageAvailable) {
    showToast("当前浏览器禁止本地存储，本次学习进度无法保存。", "warning");
  }
})();
