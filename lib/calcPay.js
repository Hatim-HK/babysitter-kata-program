/**
 * Parse a given hour string or number into integer hours.
 * Throws if the input is not a valid integer.
 */
function parseHour(hour) {
  const h = parseInt(hour, 10);
  if (isNaN(h)) throw new Error(`Invalid hour: ${hour}`);
  return h;
}

/**
 * Convert early-morning hours (0-4) to 24+ representation (24-28).
 */
function toInternal(h) {
  return h < 5 ? h + 24 : h;
}

/**
 * Validate that the time range is within [17, 28] and end > start.
 */
function validateRange(start, end) {
  if (start < 17) throw new Error('Start before 5pm');
  if (end > 28) throw new Error('End after 4am');
  if (end <= start) throw new Error('End must be after start');
}

const RATES = {
  A: [
    { until: 23, rate: 15 },
    { until: 28, rate: 20 }
  ],
  B: [
    { until: 22, rate: 12 },
    { until: 24, rate: 8 },
    { until: 28, rate: 16 }
  ],
  C: [
    { until: 21, rate: 21 },
    { until: 28, rate: 15 }
  ]
};

/**
 * Calculate total pay for babysitting based on start, end times and family.
 * @param {string|number} startHour - Hour the sitter starts (e.g. 17 or '17').
 * @param {string|number} endHour - Hour the sitter ends (0-4 or 24-28 for overnight).
 * @param {'A'|'B'|'C'} family - Family code.
 */
module.exports = function calcPay(startHour, endHour, family) {
  const startRaw = parseHour(startHour);
  const endRaw = parseHour(endHour);
  const start = toInternal(startRaw);
  const end = toInternal(endRaw);

  validateRange(start, end);

  const schedule = RATES[family];
  if (!schedule) throw new Error('Unknown family');

  let pay = 0;
  let current = start;
  for (const bracket of schedule) {
    if (current >= end) break;
    const bracketEnd = Math.min(bracket.until, end);
    if (current < bracketEnd) {
      pay += (bracketEnd - current) * bracket.rate;
      current = bracketEnd;
    }
  }
  return pay;
};
