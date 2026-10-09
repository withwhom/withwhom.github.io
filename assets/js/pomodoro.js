/* Pomodoro timer with a per-day focus log.
 *
 * Everything is kept in this browser's localStorage:
 *   pomo.settings.v1  user settings
 *   pomo.state.v1     the running timer, so a reload doesn't lose it
 *   pomo.log.v1       { "YYYY-MM-DD": { s: focusSeconds, n: completedSessions } }
 *
 * Focus time is credited from the moment Start is pressed until the session
 * pauses, ends, is skipped or reset. A stretch that crosses midnight is split
 * between the two days.
 */
(function () {
  "use strict";

  var KEY_SETTINGS = "pomo.settings.v1";
  var KEY_STATE = "pomo.state.v1";
  var KEY_LOG = "pomo.log.v1";

  var DEFAULTS = {
    focus: 25, short: 5, long: 15, every: 4,
    autoBreak: false, autoFocus: false, sound: true, notify: false
  };
  var LABEL = { focus: "Focus", short: "Short break", long: "Long break" };
  var MSG = { focus: "Time to focus.", short: "Time for a break.", long: "Time for a long break." };

  /* ---------- storage ---------- */
  function load(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { /* storage unavailable */ }
  }

  var settings = Object.assign({}, DEFAULTS, load(KEY_SETTINGS, {}));
  var log = load(KEY_LOG, {}) || {};

  function durationMs(mode) { return settings[mode] * 60 * 1000; }

  /* state.running: endAt is the wall-clock end; segStart is when the current
     focus stretch began (null outside focus).  state paused: remaining ms. */
  var state = load(KEY_STATE, null);
  if (!state || !LABEL[state.mode]) {
    state = { mode: "focus", running: false, remaining: durationMs("focus"), endAt: null, segStart: null, round: 1, done: 0 };
  }

  /* ---------- dates ---------- */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function dayKey(d) { return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function fromKey(k) { var p = k.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function addDays(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }

  function credit(fromMs, toMs) {
    if (!fromMs || toMs <= fromMs) return;
    log = load(KEY_LOG, log) || {}; // another tab may have written since
    var a = fromMs;
    while (a < toMs) {
      var d = new Date(a);
      var nextMidnight = addDays(startOfDay(d), 1).getTime();
      var b = Math.min(toMs, nextMidnight);
      var k = dayKey(d);
      var entry = log[k] || (log[k] = { s: 0, n: 0 });
      entry.s += (b - a) / 1000;
      a = b;
    }
    save(KEY_LOG, log);
  }
  function countSession(atMs) {
    log = load(KEY_LOG, log) || {};
    var k = dayKey(new Date(atMs));
    var entry = log[k] || (log[k] = { s: 0, n: 0 });
    entry.n += 1;
    save(KEY_LOG, log);
  }

  /* ---------- formatting ---------- */
  function clock(ms) {
    var total = Math.max(0, Math.ceil(ms / 1000));
    var m = Math.floor(total / 60), s = total % 60;
    return pad(m) + ":" + pad(s);
  }
  function hm(seconds) {
    var mins = Math.round(seconds / 60);
    if (mins < 60) return mins + "m";
    var h = Math.floor(mins / 60), m = mins % 60;
    return m ? h + "h " + m + "m" : h + "h";
  }
  function short(seconds) { // compact label for the bar chart
    var mins = Math.round(seconds / 60);
    return mins < 60 ? mins + "m" : (Math.round(mins / 6) / 10) + "h";
  }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function niceDate(d) { return WEEKDAYS[d.getDay()] + " " + d.getDate() + " " + MONTHS[d.getMonth()]; }

  /* ---------- elements ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var root = $("pomo");
  var elTime = $("pomo-time"), elStart = $("pomo-start"), elSkip = $("pomo-skip");
  var elBar = $("pomo-bar"), elRound = $("pomo-round"), elMsg = $("pomo-msg");
  var tabs = root.querySelectorAll(".pomo-modes button");
  var baseTitle = document.title;

  /* ---------- sound & notification ---------- */
  var audioCtx = null;
  function unlockAudio() {
    if (audioCtx) return;
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
  }
  function chime() {
    if (!settings.sound || !audioCtx) return;
    try {
      if (audioCtx.state === "suspended") audioCtx.resume();
      var t0 = audioCtx.currentTime;
      [659.25, 783.99, 1046.5].forEach(function (f, i) {
        var o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = "sine"; o.frequency.value = f;
        var t = t0 + i * 0.22;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.22, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t); o.stop(t + 1.5);
      });
    } catch (e) { /* no audio */ }
  }
  function notify(text) {
    if (!settings.notify || !("Notification" in window) || Notification.permission !== "granted") return;
    try { new Notification(text, { body: MSG[state.mode], silent: true }); } catch (e) { /* ignore */ }
  }

  /* ---------- timer core ---------- */
  function persist() { save(KEY_STATE, state); }

  function remainingNow() {
    return state.running ? state.endAt - Date.now() : state.remaining;
  }

  function start() {
    unlockAudio();
    var now = Date.now();
    state.running = true;
    state.endAt = now + state.remaining;
    state.segStart = state.mode === "focus" ? now : null;
    persist(); render();
  }

  function pause() {
    var now = Date.now();
    if (state.mode === "focus") credit(state.segStart, now);
    state.remaining = Math.max(0, state.endAt - now);
    state.running = false; state.endAt = null; state.segStart = null;
    persist(); render(); renderRecord();
  }

  function stopAndCredit() {
    if (state.running && state.mode === "focus") credit(state.segStart, Math.min(Date.now(), state.endAt));
    state.running = false; state.endAt = null; state.segStart = null;
  }

  function nextMode(afterCompletedFocus) {
    if (state.mode === "focus") {
      if (afterCompletedFocus) state.done += 1;
      return state.done > 0 && state.done % settings.every === 0 ? "long" : "short";
    }
    return "focus";
  }

  function setMode(mode) {
    if (state.mode !== "focus" && mode === "focus") state.round = state.done + 1;
    state.mode = mode;
    state.remaining = durationMs(mode);
  }

  function complete(atMs, quiet) {
    // with the page open in two tabs, only the first one to notice completes it
    var stored = load(KEY_STATE, null);
    if (stored && (!stored.running || stored.endAt !== state.endAt)) {
      state = stored; render(); renderRecord(); return;
    }
    var finished = state.mode;
    if (finished === "focus") { credit(state.segStart, atMs); countSession(atMs); }
    state.running = false; state.endAt = null; state.segStart = null;
    setMode(nextMode(finished === "focus"));
    if (!quiet) {
      chime();
      notify(finished === "focus" ? "Focus session done" : "Break's over");
    }
    var auto = !quiet && (state.mode === "focus" ? settings.autoFocus : settings.autoBreak);
    persist();
    if (auto) start(); else render();
    renderRecord();
  }

  function skip() {
    stopAndCredit();
    setMode(nextMode(false));
    persist(); render(); renderRecord();
  }

  /* Destructive clicks ask for a second click instead of a browser dialog. */
  var armed = null, armTimer = null;
  function confirmTwice(id, el, prompt) {
    if (armed === id) { disarm(); return true; }
    disarm();
    armed = id;
    el.dataset.label = el.textContent;
    el.textContent = prompt;
    el.classList.add("is-armed");
    armTimer = setTimeout(disarm, 3500);
    return false;
  }
  function disarm() {
    clearTimeout(armTimer);
    var el = armed && document.querySelector(".is-armed");
    if (el) { el.textContent = el.dataset.label; el.classList.remove("is-armed"); }
    armed = null;
  }

  function switchTo(mode, tab) {
    if (mode === state.mode && !state.running) return;
    if (state.running && !confirmTwice("mode-" + mode, tab, "Click again")) return;
    stopAndCredit();
    setMode(mode);
    persist(); render(); renderRecord();
  }

  function tick() {
    if (state.running && Date.now() >= state.endAt) { complete(state.endAt); return; }
    renderClock();
  }

  /* A worker keeps ticking in background tabs, where the page's own timers
     get throttled. Falls back to setInterval. */
  (function startTicker() {
    try {
      var src = "setInterval(function(){postMessage(0)},250);";
      var w = new Worker(URL.createObjectURL(new Blob([src], { type: "text/javascript" })));
      w.onmessage = tick;
    } catch (e) {
      setInterval(tick, 250);
    }
  })();

  /* ---------- rendering: timer ---------- */
  function renderClock() {
    var rem = remainingNow();
    var txt = clock(rem);
    if (elTime.textContent !== txt) elTime.textContent = txt;
    var frac = 1 - rem / durationMs(state.mode);
    elBar.style.width = (Math.min(1, Math.max(0, frac)) * 100).toFixed(2) + "%";
    document.title = state.running ? txt + " · " + LABEL[state.mode] : baseTitle;
    if (state.running && state.mode === "focus") renderToday();
  }

  function render() {
    root.setAttribute("data-mode", state.mode);
    root.classList.toggle("is-running", state.running);
    tabs.forEach(function (t) { t.setAttribute("aria-selected", String(t.dataset.mode === state.mode)); });
    elStart.textContent = state.running ? "Pause" : (state.remaining < durationMs(state.mode) ? "Resume" : "Start");
    elSkip.hidden = !state.running;
    elRound.textContent = "#" + state.round;
    elMsg.textContent = MSG[state.mode];
    renderClock();
  }

  /* ---------- rendering: record ---------- */
  function secondsOn(key) {
    var s = log[key] ? log[key].s : 0;
    if (state.running && state.mode === "focus" && key === dayKey(new Date())) {
      var now = Date.now();
      var from = Math.max(state.segStart, startOfDay(new Date()).getTime());
      s += Math.max(0, (Math.min(now, state.endAt) - from) / 1000);
    }
    return s;
  }

  function level(seconds) {
    if (seconds < 60) return 0;
    var h = seconds / 3600;
    return h < 1 ? 1 : h < 2.5 ? 2 : h < 4.5 ? 3 : 4;
  }

  function renderToday() { $("tot-today").textContent = hm(secondsOn(dayKey(new Date()))); }

  function renderTotals() {
    var today = startOfDay(new Date());
    var weekStart = addDays(today, -((today.getDay() + 6) % 7)); // Monday
    var week = 0, month = 0;
    for (var d = weekStart; d <= today; d = addDays(d, 1)) week += secondsOn(dayKey(d));
    for (var i = 0; i < 30; i++) month += secondsOn(dayKey(addDays(today, -i)));
    var streak = 0, cur = today;
    if (secondsOn(dayKey(cur)) < 60) cur = addDays(cur, -1); // today not started yet doesn't break it
    while (secondsOn(dayKey(cur)) >= 60) { streak++; cur = addDays(cur, -1); }
    renderToday();
    $("tot-week").textContent = hm(week);
    $("tot-month").textContent = hm(month);
    $("tot-streak").textContent = streak + (streak === 1 ? " day" : " days");
  }

  function renderBars() {
    var today = startOfDay(new Date());
    var days = [], max = 0;
    for (var i = 13; i >= 0; i--) {
      var d = addDays(today, -i), s = secondsOn(dayKey(d));
      days.push({ d: d, s: s }); if (s > max) max = s;
    }
    var top = Math.max(2, Math.ceil(max / 3600)); // hours at the top of the scale
    var html = '<div class="pomo-bars-scale"><span style="bottom:100%">' + top + 'h</span><span style="bottom:50%">' + (top / 2) + 'h</span><span style="bottom:0">0</span></div><div class="pomo-bars-cols">';
    days.forEach(function (x, idx) {
      var pct = Math.min(100, (x.s / (top * 3600)) * 100).toFixed(1);
      var isToday = idx === days.length - 1;
      html += '<div class="pomo-col' + (isToday ? " is-today" : "") + '" title="' + niceDate(x.d) + ": " + hm(x.s) + '">' +
        '<div class="pomo-col-track"><span class="pomo-col-bar" style="height:' + pct + '%"></span>' +
        (x.s >= 60 ? '<span class="pomo-col-val" style="bottom:calc(' + pct + '% + 0.2rem)">' + short(x.s) + '</span>' : "") + '</div>' +
        '<span class="pomo-col-day">' + (x.d.getDate() === 1 || idx === 0 ? MONTHS[x.d.getMonth()] + " " : "") + x.d.getDate() + '</span></div>';
    });
    $("pomo-bars").innerHTML = html + "</div>";
  }

  function renderHeat() {
    var today = startOfDay(new Date());
    var WEEKS = 26;
    var thisMonday = addDays(today, -((today.getDay() + 6) % 7));
    var first = addDays(thisMonday, -7 * (WEEKS - 1));
    var html = '<div class="pomo-heat-days"><span></span><span>Mon</span><span></span><span>Wed</span><span></span><span>Fri</span><span></span><span></span></div>';
    for (var w = 0; w < WEEKS; w++) {
      var monday = addDays(first, 7 * w);
      var showMonth = w === 0 || monday.getDate() <= 7;
      html += '<div class="pomo-heat-week"><span class="pomo-heat-month">' + (showMonth ? MONTHS[monday.getMonth()] : "") + "</span>";
      for (var k = 0; k < 7; k++) {
        var d = addDays(monday, k);
        if (d > today) { html += '<i class="is-future"></i>'; continue; }
        var s = secondsOn(dayKey(d));
        html += '<i data-l="' + level(s) + '" title="' + niceDate(d) + ": " + (s >= 60 ? hm(s) : "—") + '"></i>';
      }
      html += "</div>";
    }
    $("pomo-heat").innerHTML = html;
    var wrap = $("pomo-heat-wrap"); wrap.scrollLeft = wrap.scrollWidth;
  }

  var showAll = false;
  function renderLog() {
    var keys = Object.keys(log).filter(function (k) { return log[k].s >= 60 || log[k].n > 0; });
    var todayKey = dayKey(new Date());
    if (state.running && state.mode === "focus" && keys.indexOf(todayKey) < 0) keys.push(todayKey);
    keys.sort().reverse();
    var LIMIT = 14;
    var shown = showAll ? keys : keys.slice(0, LIMIT);
    if (!keys.length) {
      $("pomo-log").innerHTML = '<p class="pomo-empty">Nothing yet. The first session will show up here.</p>';
    } else {
      $("pomo-log").innerHTML = shown.map(function (k) {
        var e = log[k] || { n: 0 };
        return '<div class="entry pomo-log-row"><div class="entry-row">' +
          '<span class="entry-title">' + niceDate(fromKey(k)) + (k.slice(0, 4) !== todayKey.slice(0, 4) ? " " + k.slice(0, 4) : "") + "</span>" +
          '<span class="entry-meta">' + (e.n ? e.n + (e.n === 1 ? " session" : " sessions") : "") +
          '<span class="tag">' + hm(secondsOn(k)) + "</span></span></div></div>";
      }).join("");
    }
    var more = $("pomo-log-more");
    more.hidden = keys.length <= LIMIT;
    more.textContent = showAll ? "Show fewer" : "Show all " + keys.length + " days";
  }

  function renderRecord() { renderTotals(); renderBars(); renderHeat(); renderLog(); }

  /* ---------- settings form ---------- */
  var form = $("pomo-form");
  function fillForm() {
    Object.keys(DEFAULTS).forEach(function (k) {
      var input = form.elements[k];
      if (!input) return;
      if (input.type === "checkbox") input.checked = !!settings[k]; else input.value = settings[k];
    });
  }
  form.addEventListener("change", function (ev) {
    var input = ev.target, k = input.name;
    if (input.type === "checkbox") {
      settings[k] = input.checked;
      if (k === "notify" && input.checked && "Notification" in window && Notification.permission !== "granted") {
        Notification.requestPermission().then(function (p) {
          if (p !== "granted") { settings.notify = false; input.checked = false; save(KEY_SETTINGS, settings); }
        });
      }
    } else {
      var v = Math.round(Number(input.value));
      var min = Number(input.min), max = Number(input.max);
      if (!isFinite(v) || !input.value) v = DEFAULTS[k];
      v = Math.min(max, Math.max(min, v));
      input.value = v;
      var untouched = k === state.mode && !state.running && state.remaining === durationMs(k);
      settings[k] = v;
      // a timer that hasn't been started yet picks up the new length right away
      if (untouched) state.remaining = durationMs(k);
    }
    save(KEY_SETTINGS, settings);
    persist(); render();
  });
  form.addEventListener("submit", function (ev) { ev.preventDefault(); });

  /* ---------- data: export / import / wipe ---------- */
  function dataNote(text) { var el = $("pomo-data-note"); el.textContent = text; el.hidden = false; }
  $("pomo-export").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify({ version: 1, exported: new Date().toISOString(), log: log }, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "pomodoro-record-" + dayKey(new Date()) + ".json";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  });
  $("pomo-import").addEventListener("change", function (ev) {
    var file = ev.target.files && ev.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var incoming = data && data.log ? data.log : data;
        var added = 0;
        Object.keys(incoming).forEach(function (k) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(k)) return;
          var e = incoming[k], s = Number(e.s) || 0, n = Number(e.n) || 0;
          var cur = log[k] || { s: 0, n: 0 };
          // keep the larger value per day, so importing the same backup twice is harmless
          log[k] = { s: Math.max(cur.s, s), n: Math.max(cur.n, n) };
          added++;
        });
        save(KEY_LOG, log); renderRecord();
        dataNote("Imported " + added + (added === 1 ? " day." : " days."));
      } catch (e) {
        dataNote("That file isn't a timer export, so nothing was imported.");
      }
      ev.target.value = "";
    };
    reader.readAsText(file);
  });
  $("pomo-wipe").addEventListener("click", function () {
    if (!confirmTwice("wipe", this, "Click again to delete every day")) return;
    log = {}; save(KEY_LOG, log); renderRecord();
    dataNote("All records cleared.");
  });
  $("pomo-log-more").addEventListener("click", function () { showAll = !showAll; renderLog(); });

  /* ---------- controls ---------- */
  elStart.addEventListener("click", function () { state.running ? pause() : start(); });
  elSkip.addEventListener("click", skip);
  tabs.forEach(function (t) { t.addEventListener("click", function () { switchTo(t.dataset.mode, t); }); });
  document.addEventListener("keydown", function (ev) {
    if (ev.code !== "Space" || ev.repeat || ev.metaKey || ev.ctrlKey || ev.altKey) return;
    var tag = (ev.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea" || tag === "select" || tag === "button" || tag === "summary" || ev.target.isContentEditable) return;
    ev.preventDefault();
    state.running ? pause() : start();
  });
  // another tab changed the record or the timer: follow it
  window.addEventListener("storage", function (ev) {
    if (ev.key === KEY_LOG) { log = load(KEY_LOG, {}) || {}; renderRecord(); }
    if (ev.key === KEY_STATE) { state = load(KEY_STATE, state); render(); }
    if (ev.key === KEY_SETTINGS) { settings = Object.assign({}, DEFAULTS, load(KEY_SETTINGS, {})); fillForm(); render(); }
  });
  // the day rolled over while the page was open
  var lastDay = dayKey(new Date());
  setInterval(function () {
    var k = dayKey(new Date());
    if (k !== lastDay) { lastDay = k; renderRecord(); }
  }, 30000);

  /* ---------- boot ---------- */
  fillForm();
  if (state.running && Date.now() >= state.endAt) {
    complete(state.endAt, true); // finished while the page was closed
  } else {
    render(); renderRecord();
  }
})();
