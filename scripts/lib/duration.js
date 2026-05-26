// Best-effort parse of a free-form time budget like "10-15 hours (deep)" into
// an ISO 8601 duration suitable for schema.org Course.hasCourseInstance.
// courseWorkload (which Google requires for the Course Info rich result).
// For ranges, takes the upper bound - learners care more about the max time
// commitment than the optimistic floor. Returns null if no recognised unit
// is found, in which case the caller should omit the field.

function timeBudgetToIso(s) {
  if (!s) return null;
  const str = String(s).toLowerCase();
  const m = str.match(
    /(?:(\d+(?:\.\d+)?)\s*(?:-|–|to)\s*)?(\d+(?:\.\d+)?)\s*(hours?|hrs?|h|days?|d|weeks?|w|minutes?|mins?)/
  );
  if (!m) return null;
  const value = Math.round(parseFloat(m[2]));
  const unit = m[3];
  if (/^h/.test(unit)) return "PT" + value + "H";
  if (/^d/.test(unit)) return "P" + value + "D";
  if (/^w/.test(unit)) return "P" + value + "W";
  if (/^min/.test(unit)) return "PT" + value + "M";
  return null;
}

module.exports = { timeBudgetToIso };
