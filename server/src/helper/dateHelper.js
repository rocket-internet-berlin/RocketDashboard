/**
 * Date helper functions
 */
function createDateRange(startDate, endDate, step) {
  const dateRange = [];
  let currentDate = startDate.clone();

  while (currentDate.isBefore(endDate)) {
    currentDate = currentDate.add(step);
    dateRange.push(currentDate.clone());
  }

  return dateRange;
}

export default createDateRange;
