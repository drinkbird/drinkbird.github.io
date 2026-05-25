// Course UI: quiz rendering, scoring, completion, and sidebar hydration.
// Progress is stored locally in localStorage - never sent anywhere.
(function () {
  "use strict";

  var STORAGE_KEY = "drinkbird:course-progress:v1";

  // ---------- localStorage helpers ----------

  function readProgress() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return {};
      var parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  }

  function writeProgress(progress) {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      // Quota exceeded or storage disabled - fail silently; UI keeps working in-memory.
    }
  }

  function getEntry(progress, key) {
    return progress[key] || {};
  }

  function setEntry(progress, key, patch) {
    var current = progress[key] || {};
    Object.keys(patch).forEach(function (k) { current[k] = patch[k]; });
    progress[key] = current;
    return current;
  }

  // ---------- quiz ----------

  // Render text with single-backtick inline code into `el`, replacing its
  // contents. Quiz JSON authors use Markdown-style `foo` to mark code spans
  // (file paths, commands, identifiers); render them as <code>. Unmatched
  // backticks degrade to plain text segments - good enough for hand-written
  // quiz content.
  function setInlineCode(el, text) {
    while (el.firstChild) el.removeChild(el.firstChild);
    var parts = String(text == null ? "" : text).split("`");
    for (var i = 0; i < parts.length; i++) {
      if (parts[i] === "") continue;
      if (i % 2 === 1) {
        var code = document.createElement("code");
        code.textContent = parts[i];
        el.appendChild(code);
      } else {
        el.appendChild(document.createTextNode(parts[i]));
      }
    }
  }

  function initQuiz(article) {
    var quizRoot = article.querySelector("[data-course-quiz]");
    if (!quizRoot) return null;

    var dataEl = quizRoot.querySelector("[data-course-quiz-data]");
    if (!dataEl) return null;
    var quiz;
    try {
      quiz = JSON.parse(dataEl.textContent);
    } catch (e) {
      return null;
    }
    if (!quiz || !Array.isArray(quiz.questions) || quiz.questions.length === 0) return null;

    var form         = quizRoot.querySelector("[data-course-quiz-form]");
    var questionsEl  = quizRoot.querySelector("[data-course-quiz-questions]");
    var summaryEl    = quizRoot.querySelector("[data-course-quiz-summary]");
    var bestEl       = quizRoot.querySelector("[data-course-quiz-best]");
    var bestScoreEl  = quizRoot.querySelector("[data-course-quiz-best-score]");
    var bestTotalEl  = quizRoot.querySelector("[data-course-quiz-best-total]");
    var resetButton  = quizRoot.querySelector("[data-course-quiz-reset]");
    if (!form || !questionsEl || !summaryEl) return null;

    quiz.questions.forEach(function (q, qIdx) {
      var fieldset = document.createElement("fieldset");
      fieldset.className = "course-quiz-question";
      fieldset.dataset.questionIdx = String(qIdx);

      var legend = document.createElement("legend");
      legend.className = "course-quiz-question-prompt";
      setInlineCode(legend, (qIdx + 1) + ". " + q.question);
      fieldset.appendChild(legend);

      var choicesList = document.createElement("ol");
      choicesList.className = "course-quiz-choices";
      (q.choices || []).forEach(function (choiceText, cIdx) {
        var item = document.createElement("li");
        item.className = "course-quiz-choice";

        var label = document.createElement("label");
        var input = document.createElement("input");
        input.type  = "radio";
        input.name  = "q" + qIdx;
        input.value = String(cIdx);

        var icon = document.createElement("span");
        icon.className = "course-quiz-choice-icon";
        icon.setAttribute("aria-hidden", "true");

        var text = document.createElement("span");
        text.className = "course-quiz-choice-text";
        setInlineCode(text, choiceText);

        label.appendChild(input);
        label.appendChild(icon);
        label.appendChild(text);
        item.appendChild(label);
        choicesList.appendChild(item);
      });
      fieldset.appendChild(choicesList);

      var feedback = document.createElement("div");
      feedback.className = "course-quiz-feedback";
      feedback.hidden = true;
      fieldset.appendChild(feedback);

      questionsEl.appendChild(fieldset);
    });

    var chapterKey = article.dataset.chapterKey;

    function renderBest() {
      var entry = getEntry(readProgress(), chapterKey);
      if (typeof entry.bestQuizScore === "number" && typeof entry.bestQuizTotal === "number") {
        bestScoreEl.textContent = String(entry.bestQuizScore);
        bestTotalEl.textContent = String(entry.bestQuizTotal);
        bestEl.hidden = false;
      } else {
        bestEl.hidden = true;
      }
    }

    function clearFeedback() {
      Array.prototype.forEach.call(questionsEl.querySelectorAll(".course-quiz-question"), function (fs) {
        fs.classList.remove("is-correct", "is-incorrect");
        var fb = fs.querySelector(".course-quiz-feedback");
        if (fb) { fb.hidden = true; fb.textContent = ""; }
        Array.prototype.forEach.call(fs.querySelectorAll(".course-quiz-choice"), function (li) {
          li.classList.remove("is-correct", "is-selected-wrong");
        });
      });
      summaryEl.hidden = true;
      summaryEl.textContent = "";
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var score = 0;
      var total = quiz.questions.length;
      var unanswered = 0;

      quiz.questions.forEach(function (q, qIdx) {
        var fs       = questionsEl.querySelector('fieldset[data-question-idx="' + qIdx + '"]');
        var selected = form.querySelector('input[name="q' + qIdx + '"]:checked');
        var fb       = fs.querySelector(".course-quiz-feedback");
        var correctIdx = q.correct;

        // Mark all choices' correctness, and the user's wrong pick (if any).
        Array.prototype.forEach.call(fs.querySelectorAll(".course-quiz-choice"), function (li, cIdx) {
          li.classList.remove("is-correct", "is-selected-wrong");
          if (cIdx === correctIdx) li.classList.add("is-correct");
        });

        if (!selected) {
          unanswered++;
          fs.classList.remove("is-correct");
          fs.classList.add("is-incorrect");
          setInlineCode(fb, "No answer selected. Correct answer: " +
            (q.choices[correctIdx] || "") +
            (q.explanation ? " - " + q.explanation : ""));
          fb.hidden = false;
          return;
        }

        var pickedIdx = parseInt(selected.value, 10);
        var isCorrect = pickedIdx === correctIdx;
        if (isCorrect) {
          score++;
          fs.classList.add("is-correct");
          fs.classList.remove("is-incorrect");
          setInlineCode(fb, q.explanation ? "Correct. " + q.explanation : "Correct.");
        } else {
          fs.classList.add("is-incorrect");
          fs.classList.remove("is-correct");
          var pickedLi = fs.querySelectorAll(".course-quiz-choice")[pickedIdx];
          if (pickedLi) pickedLi.classList.add("is-selected-wrong");
          setInlineCode(fb, "Not quite. Correct answer: " +
            (q.choices[correctIdx] || "") +
            (q.explanation ? " - " + q.explanation : ""));
        }
        fb.hidden = false;
      });

      // Summary line
      var summary;
      if (score === total) {
        summary = "Perfect - " + score + " / " + total + ". Move on whenever you're ready.";
      } else {
        summary = "You scored " + score + " / " + total + ".";
        if (unanswered > 0) summary += " " + unanswered + " unanswered.";
        summary += " Review the explanations above and try again.";
      }
      summaryEl.textContent = summary;
      summaryEl.hidden = false;

      // Persist best score.
      var progress = readProgress();
      var entry    = getEntry(progress, chapterKey);
      var isNewBest = typeof entry.bestQuizScore !== "number" || score > entry.bestQuizScore;
      setEntry(progress, chapterKey, {
        lastQuizScore: score,
        lastQuizTotal: total,
        lastQuizAt:    new Date().toISOString()
      });
      if (isNewBest) {
        setEntry(progress, chapterKey, {
          bestQuizScore: score,
          bestQuizTotal: total,
          bestQuizAt:    new Date().toISOString()
        });
      }
      writeProgress(progress);
      renderBest();
    });

    form.addEventListener("reset", function () {
      // Defer until after browser resets radios.
      setTimeout(clearFeedback, 0);
    });

    if (resetButton) {
      resetButton.addEventListener("click", function () {
        // The form's reset event handler above will clear feedback.
      });
    }

    renderBest();
    return { renderBest: renderBest };
  }

  // ---------- mark-as-complete ----------

  function initCompleteToggle(article) {
    var btn = article.querySelector("[data-course-complete-toggle]");
    if (!btn) return;

    var chapterKey = article.dataset.chapterKey;
    var labelEl    = btn.querySelector(".course-complete-label");

    function render() {
      var entry = getEntry(readProgress(), chapterKey);
      var done  = !!entry.completed;
      btn.classList.toggle("is-complete", done);
      btn.setAttribute("aria-pressed", done ? "true" : "false");
      if (labelEl) labelEl.textContent = done ? "Completed - click to undo" : "Mark chapter as complete";
    }

    btn.addEventListener("click", function () {
      var progress = readProgress();
      var entry    = getEntry(progress, chapterKey);
      if (entry.completed) {
        setEntry(progress, chapterKey, { completed: false, completedAt: null });
      } else {
        setEntry(progress, chapterKey, { completed: true,  completedAt: new Date().toISOString() });
      }
      writeProgress(progress);
      render();
      hydrateSidebar();
    });

    render();
  }

  // ---------- sidebar hydration ----------

  function hydrateSidebar() {
    var sidebar = document.querySelector(".course-sidebar");
    if (!sidebar) return;
    var courseSlug = sidebar.dataset.courseSlug;
    if (!courseSlug) return;

    var progress = readProgress();
    var items    = sidebar.querySelectorAll("[data-course-progress-key]");
    var total    = items.length;
    var complete = 0;

    Array.prototype.forEach.call(items, function (item) {
      var key   = item.dataset.courseProgressKey;
      var entry = getEntry(progress, key);
      var done  = !!entry.completed;
      item.classList.toggle("is-complete", done);
      if (done) complete++;
    });

    var pct = total === 0 ? 0 : Math.round((complete / total) * 100);
    var countEl = sidebar.querySelector("[data-course-progress-count]");
    var totalEl = sidebar.querySelector("[data-course-progress-total]");
    var fillEl  = sidebar.querySelector(".course-progress-bar-fill");
    if (countEl) countEl.textContent = String(complete);
    if (totalEl) totalEl.textContent = String(total);
    if (fillEl)  fillEl.style.width  = pct + "%";
  }

  // ---------- /courses/ index cards ----------

  function readCardData(card) {
    var scriptEl = card.querySelector("[data-course-card-data]");
    if (!scriptEl) return null;
    try {
      var data = JSON.parse(scriptEl.textContent);
      if (!data || !Array.isArray(data.chapters) || data.chapters.length === 0) return null;
      return data;
    } catch (e) {
      return null;
    }
  }

  function renderCourseCard(card, data) {
    var progress = readProgress();

    var chaptersTotal    = data.chapters.length;
    var chaptersComplete = 0;
    var lastCompletedIdx = -1;
    data.chapters.forEach(function (ch, idx) {
      var key = data.courseSlug + "/" + ch.moduleSlug + "/" + ch.chapterSlug;
      if ((progress[key] || {}).completed) {
        chaptersComplete++;
        lastCompletedIdx = idx;
      }
    });

    var progressEl = card.querySelector("[data-course-card-progress]");
    var titleLink  = card.querySelector("[data-course-card-title-link]");
    var resumeBtn  = card.querySelector("[data-course-card-resume]");
    var labelEl    = resumeBtn && resumeBtn.querySelector("[data-course-card-resume-label]");

    if (lastCompletedIdx < 0) {
      // No progress: hide the bar, reset CTAs to their initial state.
      if (progressEl) progressEl.hidden = true;
      if (titleLink) titleLink.setAttribute("href", data.courseUrl);
      if (resumeBtn) {
        resumeBtn.setAttribute("href", data.chapters[0].url);
        if (labelEl) labelEl.textContent = labelEl.dataset.defaultLabel || "Start →";
      }
      return;
    }

    if (progressEl) {
      progressEl.hidden = false;
      var pct = chaptersTotal === 0 ? 0 : Math.round((chaptersComplete / chaptersTotal) * 100);
      var fillEl  = progressEl.querySelector(".course-progress-bar-fill");
      var countEl = progressEl.querySelector("[data-course-card-progress-count]");
      var totalEl = progressEl.querySelector("[data-course-card-progress-total]");
      if (fillEl)  fillEl.style.width = pct + "%";
      if (countEl) countEl.textContent = String(chaptersComplete);
      if (totalEl) totalEl.textContent = String(chaptersTotal);
    }

    var resumeUrl;
    if (lastCompletedIdx >= data.chapters.length - 1) {
      resumeUrl = data.courseUrl;
    } else {
      resumeUrl = data.chapters[lastCompletedIdx + 1].url;
    }
    if (titleLink) titleLink.setAttribute("href", resumeUrl);
    if (resumeBtn) {
      resumeBtn.setAttribute("href", resumeUrl);
      if (labelEl) labelEl.textContent = "Resume →";
    }
  }

  function initCardReset(card, data) {
    var btn = card.querySelector("[data-course-card-reset]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      if (!window.confirm("Reset your progress for this course? This clears completed chapters and quiz scores on this device.")) return;
      var progress = readProgress();
      var prefix = data.courseSlug + "/";
      Object.keys(progress).forEach(function (key) {
        if (key.indexOf(prefix) === 0) delete progress[key];
      });
      writeProgress(progress);
      renderCourseCard(card, data);
    });
  }

  function hydrateCourseCards() {
    var cards = document.querySelectorAll("[data-course-card]");
    Array.prototype.forEach.call(cards, function (card) {
      var data = readCardData(card);
      if (!data) return;
      renderCourseCard(card, data);
      initCardReset(card, data);
    });
  }

  // ---------- sidebar mobile toggle ----------

  function initSidebarToggle() {
    var sidebar = document.querySelector(".course-sidebar");
    if (!sidebar) return;
    var toggle = sidebar.querySelector(".course-sidebar-toggle");
    var inner  = sidebar.querySelector(".course-sidebar-inner");
    if (!toggle || !inner) return;

    toggle.addEventListener("click", function () {
      var expanded = sidebar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    // Close after navigating on mobile (sidebar links are inside `inner`).
    inner.addEventListener("click", function (e) {
      var link = e.target.closest && e.target.closest("a");
      if (link) {
        sidebar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // ---------- boot ----------

  function boot() {
    initSidebarToggle();
    hydrateSidebar();
    hydrateCourseCards();

    var article = document.querySelector(".course-content[data-chapter-key]");
    if (article) {
      initQuiz(article);
      initCompleteToggle(article);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
