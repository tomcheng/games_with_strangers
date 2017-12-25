export const pluralize = (str, count) => str + (count === 1 ? "" : "s");

export const makeList = strings =>
  strings.length === 1
    ? strings[0]
    : strings.slice(0, strings.length - 1).join(", ") +
      " and " +
      strings[strings.length - 1];
