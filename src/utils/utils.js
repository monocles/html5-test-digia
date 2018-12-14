export function lowerCase(str) {
  return str.toLowerCase();
}

export function upperCase(str) {
  return str.toUpperCase();
}

export function properCase(str) {
  return lowerCase(str).replace(/^\w|\s\w/g, upperCase);
}

export function id() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return (
    "_" +
    Math.random()
      .toString(36)
      .substr(2, 9)
  );
}
