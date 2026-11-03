// Same Apps Script web app the quiz posts to; GET ?group=NAME returns aggregate stats.
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbykKouEY3W5JJwrjUVv7p-PHNJw_YGb6PUGw8qYLS_U7fcCVyegFI8eXaG2JIUW2uiFcg/exec";

const GROUP = document.body.dataset.group;
const GROUP_NAME = document.body.dataset.name;
const MAX_SCORE = 4;
const EARLY_RESULTS_BELOW = 10;
const SELF_RATINGS = ["Strong", "Fairly strong", "Average", "Fairly weak", "Weak"];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function plural(n, one, many) {
  return n === 1 ? one : many;
}

function stripPrefix(text) {
  return text.replace(/^\([^)]*\)\s*/, "");
}

function answerText(q) {
  if (q.type === "checkbox") return q.correctAnswers.join(", ");
  if (q.type === "short-text") return q.acceptedAnswers[0];
  return q.correctAnswer;
}

function mostCommonWrongAnswer(q, answers) {
  const correct = String(answerText(q)).toLowerCase();
  let best = null;
  Object.keys(answers || {}).forEach((a) => {
    if (a.toLowerCase() === correct) return;
    if (!best || answers[a] > best.count) best = { answer: a, count: answers[a] };
  });
  return best;
}

function showStatus(node) {
  const status = document.getElementById("sc-status");
  status.hidden = false;
  status.replaceChildren(...(Array.isArray(node) ? node : [node]));
  document.getElementById("sc-content").hidden = true;
}

function showLoading() {
  const status = document.getElementById("sc-status");
  status.hidden = false;
  status.textContent = "Loading results…";
  document.getElementById("sc-content").hidden = true;
}

function quizHref() {
  return "index.html?" + document.body.dataset.quizQuery;
}

function renderEmpty() {
  const link = el("a", "sc-link-btn", "Take the quiz");
  link.href = quizHref();
  showStatus([
    el("h2", null, "No responses yet"),
    el("p", null, `Results will appear here as people from ${GROUP_NAME} take the quiz.`),
    link
  ]);
}

function renderError() {
  const retry = el("button", "sc-retry", "Try again");
  retry.type = "button";
  retry.addEventListener("click", load);
  showStatus([
    el("h2", null, "We couldn't load the latest results"),
    el("p", null, "Check your connection and try again."),
    retry
  ]);
}

function kpi(label, value, sub) {
  const card = el("div", "sc-kpi");
  card.append(el("div", "sc-kpi-label", label), el("div", "sc-kpi-value", value));
  if (sub) card.append(el("div", "sc-kpi-sub", sub));
  return card;
}

function barRow(label, fraction, valueText, gold) {
  const row = el("div", "sc-row");
  const track = el("div", "sc-track");
  const fill = el("div", gold ? "sc-fill gold" : "sc-fill");
  fill.style.width = Math.round(Math.max(0, Math.min(1, fraction)) * 100) + "%";
  track.append(fill);
  row.append(el("span", null, label), track, el("span", "sc-row-value", valueText));
  return row;
}

function renderKpis(data) {
  const n = data.responses;
  let totalScore = 0;
  Object.keys(data.scoreCounts).forEach((s) => {
    totalScore += Number(s) * data.scoreCounts[s];
  });
  const perfect = data.scoreCounts[MAX_SCORE] || 0;
  const last = data.lastResponse ? new Date(data.lastResponse) : null;

  const kpis = document.getElementById("sc-kpis");
  kpis.replaceChildren(
    kpi("Responses", String(n), `from ${GROUP_NAME}`),
    kpi("Average score", `${(totalScore / n).toFixed(1)} / ${MAX_SCORE}`, `${Math.round((totalScore / (n * MAX_SCORE)) * 100)}% correct`),
    kpi("Perfect scores", String(perfect), `${Math.round((perfect / n) * 100)}% of responses`),
    kpi("Latest response", last ? last.toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "—", last ? String(last.getFullYear()) : "")
  );
}

function renderScores(data) {
  const counts = [];
  for (let s = 0; s <= MAX_SCORE; s++) counts.push(data.scoreCounts[s] || 0);
  const max = Math.max(...counts, 1);
  const wrap = document.getElementById("sc-scores");
  wrap.replaceChildren(
    ...counts.map((c, s) => barRow(`${s} of ${MAX_SCORE}`, c / max, `${c} ${plural(c, "person", "people")}`, false))
  );
}

function renderSelfRatings(data) {
  const wrap = document.getElementById("sc-selfratings");
  wrap.replaceChildren(
    ...SELF_RATINGS.map((rating) => {
      const r = data.selfRatings[rating];
      if (!r || !r.n) return barRow(rating, 0, "—", true);
      const avg = r.scoreSum / r.n;
      return barRow(rating, avg / MAX_SCORE, `${avg.toFixed(1)} avg · ${r.n}`, true);
    })
  );
}

function renderQuestions(data) {
  const rows = [];
  Object.keys(data.questions).forEach((id) => {
    const q = QUESTION_BANK.find((item) => item.id === id);
    if (!q) return;
    const s = data.questions[id];
    rows.push({ q, s, pct: s.correct / s.attempts });
  });
  rows.sort((a, b) => a.pct - b.pct || b.s.attempts - a.s.attempts);

  const wrap = document.getElementById("sc-questions");
  wrap.replaceChildren(
    ...rows.map(({ q, s, pct }) => {
      const card = el("div", "sc-q");

      const head = el("div", "sc-q-head");
      head.append(
        el("p", "sc-q-text", stripPrefix(q.question)),
        el("span", "sc-q-score", `${s.correct} of ${s.attempts} correct`)
      );
      card.append(head);

      const track = el("div", "sc-track");
      const fill = el("div", "sc-fill");
      fill.style.width = Math.round(pct * 100) + "%";
      track.append(fill);
      card.append(track);

      const detail = el("p", "sc-q-detail");
      const answer = el("b", null, answerText(q));
      detail.append("Answer: ", answer);
      if (q.reference) detail.append(` · ${q.reference}`);
      const wrong = mostCommonWrongAnswer(q, s.answers);
      if (wrong) {
        detail.append(document.createElement("br"));
        const w = el("span", "wrong", wrong.answer);
        detail.append("Most common miss: ", w, ` (${wrong.count})`);
      }
      card.append(detail);
      return card;
    })
  );
}

function render(data) {
  const updated = new Date(data && data.generatedAt ? data.generatedAt : Date.now());
  document.getElementById("sc-updated").textContent =
    "Updated " + updated.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  if (!data || !data.responses) {
    renderEmpty();
    return;
  }

  document.getElementById("sc-status").hidden = true;
  document.getElementById("sc-content").hidden = false;

  const note = document.getElementById("sc-early-note");
  if (data.responses < EARLY_RESULTS_BELOW) {
    note.textContent = `Early results — based on ${data.responses} ${plural(data.responses, "response", "responses")}, so treat these numbers as a rough picture. They'll firm up as more people take the quiz.`;
    note.hidden = false;
  } else {
    note.hidden = true;
  }

  renderKpis(data);
  renderScores(data);
  renderSelfRatings(data);
  renderQuestions(data);
}

async function load() {
  showLoading();
  try {
    const response = await fetch(`${APPS_SCRIPT_URL}?group=${encodeURIComponent(GROUP)}`);
    if (!response.ok) throw new Error(`Request failed: ${response.status}`);
    render(await response.json());
  } catch (err) {
    renderError();
  }
}

document.getElementById("sc-quiz-link").href = quizHref();
load();
