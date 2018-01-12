export const pluralize = (str, count) => str + (count === 1 ? "" : "s");

export const makeList = strings =>
  strings.length === 0
    ? "nobody"
    : strings.length === 1
      ? strings[0]
      : strings.slice(0, strings.length - 1).join(", ") +
        " and " +
        strings[strings.length - 1];

export const addCommas = nStr => {
  nStr += "";
  const x = nStr.split(".");
  let x1 = x[0];
  const x2 = x.length > 1 ? "." + x[1] : "";
  const rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1,$2");
  }
  return x1 + x2;
};
