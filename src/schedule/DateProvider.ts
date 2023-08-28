/**
 * Provides time zone adjusted date
 */
let now = new Date();

/**
 * Set the date to be used by the provider
 *
 * Visible for testing
 */
export function setNow(date: Date) {
  now = date;
}

/**
 * Get today's day of the week
 *
 * @returns {number} Day of the week
 */
export function getToday(): Date {
  const options = { timeZone: 'Asia/Jakarta' };
  const dateString = now.toLocaleDateString('en-US', options);

  const timezoneAdjustedDate = new Date(dateString);
  return timezoneAdjustedDate;
}

export function getTomorrow(): Date {
  // get tomorrow date
  const date = getToday();
  date.setDate(date.getDate() + 1);
  return date;
}
