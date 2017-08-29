/**
 * Custom widget formatter functions
 */
function financeFormatter(n) {
  if (n && !isNaN(parseFloat(n))) {
    return parseFloat(n).toFixed(2);
  }
  return n;
}

export { financeFormatter }; // eslint-disable-line import/prefer-default-export
