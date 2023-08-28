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
export function getToday(): number {
  const options = { timeZone: 'Asia/Jakarta' };
  const dateString = now.toLocaleDateString('en-US', options);

  const timezoneAdjustedDate = new Date(dateString);
  const day = timezoneAdjustedDate.getDay();

  return day;
}

export function getTomorrow(): number {
  const today = getToday();
  return (today + 1) % 7;
}
