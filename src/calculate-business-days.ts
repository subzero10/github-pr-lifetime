// Expects start date to be before end date
// start and end are Date objects
export default function calculateBusinessDays(start, end) {

  // Copy date objects so don't modify originals
  const s = new Date(+start);
  const e = new Date(+end);

  // Set time to midday to avoid dalight saving and browser quirks
  s.setHours(12, 0, 0, 0);
  e.setHours(12, 0, 0, 0);

  // Get the difference in whole days
  const totalDays = Math.round((e.getTime() - s.getTime()) / 8.64e7);

  // Get the difference in whole weeks
  const wholeWeeks = totalDays / 7 | 0;

  // Estimate business days as number of whole weeks * 5
  let days = wholeWeeks * 5;

  // If not even number of weeks, calc remaining weekend days
  if (totalDays % 7) {
    s.setDate(s.getDate() + wholeWeeks * 7);

    while (s < e) {
      s.setDate(s.getDate() + 1);

      // If day isn't a Sunday or Saturday, add to business days
      if (s.getDay() != 0 && s.getDay() != 6) {
        ++days;
      }
    }
  }
  return days;
}
