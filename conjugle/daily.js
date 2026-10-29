// Conjugle — which five sentences belong to which day.
//
// Shared by the game page (window.ConjugleDaily) and by
// scripts/check-conjugle.js (require). Changing anything here changes past
// puzzles, so the check script compares every day up to today against the
// base branch.
//
// How a day is chosen:
//   * data.releases is an append-only list of { from: "YYYY-MM-DD", maxId }.
//     The release in force on a date is the last one whose `from` is on or
//     before it; its pool is every bank item with id <= maxId.
//   * Each release orders its pool once (seeded by the release itself):
//     items are shuffled within each tense, then dealt round-robin across
//     tenses so a day's five sentences rarely share a tense.
//   * Day k of a release takes positions 5k … 5k+4 of that order, wrapping.
// Adding sentences therefore means: give them new ids, then append a release
// whose `from` is a future date. Days before it keep their old pool and order.
(function (exports) {
  "use strict";

  var TENSES = {
    present: "présent",
    passe_compose: "passé composé",
    imparfait: "imparfait",
    plus_que_parfait: "plus-que-parfait",
    futur_simple: "futur simple",
    conditionnel_present: "conditionnel présent",
    conditionnel_passe: "conditionnel passé",
    subjonctif_present: "subjonctif présent",
    imperatif: "impératif"
  };
  var TENSE_KEYS = Object.keys(TENSES);
  var PER_DAY = 5;
  var DAY_MS = 24 * 60 * 60 * 1000;
  var SEOUL_OFFSET_MS = 9 * 60 * 60 * 1000; // Korea has no DST

  // The puzzle changes at midnight in Seoul (the site's timezone) for everyone.
  function seoulToday(now) {
    var t = (now === undefined ? Date.now() : now) + SEOUL_OFFSET_MS;
    return new Date(t).toISOString().slice(0, 10);
  }

  function isDate(s) {
    return typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) &&
      new Date(s + "T00:00:00Z").toISOString().slice(0, 10) === s;
  }

  function dayNumber(dateStr) {
    var p = dateStr.split("-");
    return Math.round(Date.UTC(+p[0], +p[1] - 1, +p[2]) / DAY_MS);
  }

  function fromDayNumber(n) {
    return new Date(n * DAY_MS).toISOString().slice(0, 10);
  }

  // FNV-1a, 32-bit.
  function hash(str) {
    var h = 0x811c9dc5;
    for (var i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h;
  }

  // mulberry32
  function rng(seed) {
    return function () {
      seed = (seed + 0x6d2b79f5) >>> 0;
      var t = seed;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function shuffle(arr, rand) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(rand() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function releaseFor(dateStr, releases) {
    var found = null;
    for (var i = 0; i < releases.length; i++) {
      if (releases[i].from <= dateStr) found = releases[i];
    }
    return found;
  }

  function releaseOrder(release, bank) {
    var rand = rng(hash("conjugle:" + release.from + ":" + release.maxId));
    var pool = bank
      .filter(function (it) { return it.id <= release.maxId; })
      .sort(function (a, b) { return a.id - b.id; });
    var groups = TENSE_KEYS.map(function (key) {
      return shuffle(pool.filter(function (it) { return it.t === key; })
        .map(function (it) { return it.id; }), rand);
    }).filter(function (g) { return g.length > 0; });
    shuffle(groups, rand);
    var rounds = Math.max.apply(null, groups.map(function (g) { return g.length; }).concat(0));
    var order = [];
    for (var round = 0; round < rounds; round++) {
      for (var g = 0; g < groups.length; g++) {
        if (round < groups[g].length) order.push(groups[g][round]);
      }
    }
    return order;
  }

  // The ids of the day's sentences, or null before the first release.
  function puzzleIds(dateStr, data) {
    var release = releaseFor(dateStr, data.releases);
    if (!release) return null;
    var order = releaseOrder(release, data.bank);
    if (order.length === 0) return null;
    var k = dayNumber(dateStr) - dayNumber(release.from);
    var ids = [];
    for (var i = 0; i < PER_DAY; i++) ids.push(order[(k * PER_DAY + i) % order.length]);
    return ids;
  }

  function launchDate(data) {
    return data.releases[0].from;
  }

  function puzzleNumber(dateStr, data) {
    return dayNumber(dateStr) - dayNumber(launchDate(data)) + 1;
  }

  exports.TENSES = TENSES;
  exports.TENSE_KEYS = TENSE_KEYS;
  exports.PER_DAY = PER_DAY;
  exports.seoulToday = seoulToday;
  exports.isDate = isDate;
  exports.dayNumber = dayNumber;
  exports.fromDayNumber = fromDayNumber;
  exports.releaseFor = releaseFor;
  exports.puzzleIds = puzzleIds;
  exports.launchDate = launchDate;
  exports.puzzleNumber = puzzleNumber;
})(typeof module !== "undefined" ? module.exports : (window.ConjugleDaily = {}));
