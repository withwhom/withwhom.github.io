#!/usr/bin/env node
// Checks conjugle/data.js. Run from the repository root:
//
//   node scripts/check-conjugle.js
//   node scripts/check-conjugle.js --base <dir>
//
// With --base, <dir> holds the base branch's data.js (and daily.js, if it
// had one); every puzzle from launch through today (Asia/Seoul) must come
// out the same as before. CI passes the PR's base branch here.
"use strict";

const path = require("path");
const fs = require("fs");

const root = path.resolve(__dirname, "..");
const daily = require(path.join(root, "conjugle/daily.js"));
const data = require(path.join(root, "conjugle/data.js"));

const errors = [];
const warnings = [];
const err = (msg) => errors.push(msg);
const warn = (msg) => warnings.push(msg);

const BLANK = "___";
// Words that elide before a vowel or mute h (je → j', ne → n', …). If one of
// them sits right before the blank and the answer starts with a vowel, the
// sentence as written would be wrong.
const ELIDING = new Set(["je", "me", "te", "se", "le", "la", "ne", "de", "que", "ce", "lorsque", "puisque"]);
const VOWEL_START = /^[aeiouyhàâäéèêëîïôöùûüÿœæ]/i;

const label = (it) => `#${it && it.id !== undefined ? it.id : "?"}`;
const nonEmptyString = (x) => typeof x === "string" && x.trim() !== "";

// ---- items ----
if (!Array.isArray(data.bank)) {
  err("bank가 배열이 아닙니다.");
  data.bank = [];
}

const seen = new Map();
data.bank.forEach((it, index) => {
  const at = `${label(it)} (bank[${index}])`;

  if (!Number.isInteger(it.id) || it.id < 1) {
    err(`${at}: id는 1 이상의 정수여야 합니다.`);
  } else if (seen.has(it.id)) {
    err(`${at}: id ${it.id}가 bank[${seen.get(it.id)}]와 중복됩니다.`);
  } else {
    seen.set(it.id, index);
  }

  const allowed = new Set(["id", "v", "s", "a", "t", "ipa", "n"]);
  Object.keys(it).forEach((k) => {
    if (!allowed.has(k)) err(`${at}: 알 수 없는 필드 "${k}"`);
  });

  if (!nonEmptyString(it.v)) err(`${at}: v(부정사)가 비어 있습니다.`);
  if (!nonEmptyString(it.n)) err(`${at}: n(해설)이 비어 있습니다.`);
  if (!nonEmptyString(it.ipa)) err(`${at}: ipa가 비어 있습니다.`);
  else if (/[\/\[\]]/.test(it.ipa)) err(`${at}: ipa에는 / 나 [ ]를 넣지 않습니다.`);

  if (!Object.prototype.hasOwnProperty.call(daily.TENSES, it.t)) {
    err(`${at}: t "${it.t}"는 유효한 시제 키가 아닙니다 (${daily.TENSE_KEYS.join(", ")}).`);
  }

  if (!Array.isArray(it.a) || it.a.length === 0) {
    err(`${at}: a(정답)가 비어 있습니다.`);
  } else {
    it.a.forEach((ans) => {
      if (!nonEmptyString(ans)) err(`${at}: a에 빈 정답이 있습니다.`);
      else if (ans !== ans.trim() || /\s{2,}/.test(ans)) err(`${at}: 정답 "${ans}"에 불필요한 공백이 있습니다.`);
      else if (ans !== ans.toLowerCase()) err(`${at}: 정답 "${ans}"는 소문자로 씁니다.`);
    });
    if (new Set(it.a).size !== it.a.length) err(`${at}: a에 같은 정답이 두 번 있습니다.`);
  }

  if (typeof it.s !== "string") {
    err(`${at}: s(문장)가 없습니다.`);
    return;
  }
  const blanks = it.s.split(BLANK).length - 1;
  if (blanks !== 1) err(`${at}: 문장의 ${BLANK}는 정확히 하나여야 합니다 (지금 ${blanks}개).`);
  if (/_{4,}/.test(it.s)) err(`${at}: 빈칸은 밑줄 세 개(${BLANK})로만 씁니다.`);

  if (blanks === 1 && Array.isArray(it.a)) {
    // The word right before the blank, e.g. "je" in "je ___". One already
    // elided ("j'___", "m'___") is fine, so only a bare word counts.
    const before = it.s.slice(0, it.s.indexOf(BLANK));
    const m = before.match(/(?:^|[^\p{L}'’])(\p{L}+)\s+$/u);
    const word = m ? m[1].toLowerCase() : "";
    if (ELIDING.has(word)) {
      it.a.forEach((ans) => {
        if (typeof ans === "string" && VOWEL_START.test(ans)) {
          err(`${at}: "${word} ${BLANK}" 뒤에 모음으로 시작하는 정답 "${ans}"이 오면 축약(${word.slice(0, -1)}')이 생깁니다.`);
        }
      });
    }
  }
});

// ---- releases ----
const ids = [...seen.keys()].sort((a, b) => a - b);
const maxId = ids.length ? ids[ids.length - 1] : 0;
const releases = Array.isArray(data.releases) ? data.releases : [];
if (releases.length === 0) err("releases가 비어 있습니다.");
releases.forEach((r, i) => {
  const at = `releases[${i}]`;
  if (!daily.isDate(r.from)) err(`${at}: from "${r.from}"은 YYYY-MM-DD 날짜가 아닙니다.`);
  if (!Number.isInteger(r.maxId)) err(`${at}: maxId는 정수여야 합니다.`);
  if (r.maxId > maxId) err(`${at}: maxId ${r.maxId}보다 큰 id가 bank에 없습니다 (최대 ${maxId}).`);
  const pool = ids.filter((id) => id <= r.maxId).length;
  if (pool < daily.PER_DAY) err(`${at}: 문제가 ${pool}개뿐이라 하루 ${daily.PER_DAY}문제를 뽑을 수 없습니다.`);
  if (i > 0) {
    const prev = releases[i - 1];
    if (!(r.from > prev.from)) err(`${at}: from은 앞 release보다 늦은 날짜여야 합니다.`);
    if (!(r.maxId > prev.maxId)) err(`${at}: maxId는 앞 release보다 커야 합니다.`);
  }
});
const last = releases[releases.length - 1];
if (last && maxId > last.maxId) {
  warn(`id ${last.maxId + 1}–${maxId}는 아직 어느 release에도 들어 있지 않아 출제되지 않습니다.`);
}

// ---- past puzzles must not change ----
const baseIndex = process.argv.indexOf("--base");
if (baseIndex !== -1) {
  const dir = path.resolve(process.argv[baseIndex + 1] || "");
  const baseDataPath = path.join(dir, "data.js");
  if (!fs.existsSync(baseDataPath)) {
    err(`--base: ${baseDataPath}가 없습니다.`);
  } else {
    const baseData = require(baseDataPath);
    const baseDailyPath = path.join(dir, "daily.js");
    const baseDaily = fs.existsSync(baseDailyPath) ? require(baseDailyPath) : daily;
    const today = daily.seoulToday();
    const baseIds = new Set(baseData.bank.map((it) => it.id));
    baseIds.forEach((id) => {
      if (!seen.has(id)) err(`id ${id}가 삭제됐습니다. 지난 문제가 바뀌므로 항목은 지우지 않고 고칩니다.`);
    });
    const start = daily.dayNumber(baseDaily.launchDate(baseData));
    const end = daily.dayNumber(today);
    let changed = 0;
    for (let d = start; d <= end; d++) {
      const date = daily.fromDayNumber(d);
      const before = JSON.stringify(baseDaily.puzzleIds(date, baseData));
      const after = JSON.stringify(daily.puzzleIds(date, data));
      if (before !== after) {
        if (changed < 5) err(`${date}의 문제가 바뀌었습니다: ${before} → ${after}`);
        changed++;
      }
    }
    if (changed > 5) err(`… 그 밖에 ${changed - 5}일의 문제가 더 바뀌었습니다.`);
    releases.forEach((r, i) => {
      const isNew = !baseData.releases.some((b) => b.from === r.from && b.maxId === r.maxId);
      if (isNew && r.from <= today) {
        err(`releases[${i}]: 새 release의 from(${r.from})은 오늘(${today}, 서울) 이후여야 합니다.`);
      }
    });
  }
}

// ---- report ----
const counts = {};
daily.TENSE_KEYS.forEach((k) => { counts[k] = 0; });
data.bank.forEach((it) => { if (counts[it.t] !== undefined) counts[it.t]++; });
console.log(`Conjugle: 문장 ${data.bank.length}개, release ${releases.length}개`);
daily.TENSE_KEYS.forEach((k) => console.log(`  ${daily.TENSES[k].padEnd(22)} ${counts[k]}`));
warnings.forEach((w) => console.log(`경고: ${w}`));
if (errors.length) {
  errors.forEach((e) => console.error(`오류: ${e}`));
  console.error(`\n오류 ${errors.length}개`);
  process.exit(1);
}
console.log("문제없음");
