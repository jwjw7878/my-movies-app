export const ratingGraph = (rated) => {
  if (rated >= 8) {
    return "green";
  } else if (rated >= 7) {
    return "light-green";
  } else if (rated >= 5) {
    return "yellow";
  } else {
    return "red";
  }
};
