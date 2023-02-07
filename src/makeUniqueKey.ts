
const idCounter: Record<string, number> = {};

export const makeUniqueKey = (prefix: string = ''): string => {
  if (idCounter[prefix] === undefined) {
    idCounter[prefix] = 0;
  }
  else {
    idCounter[prefix] = idCounter[prefix] + 1;
  }

  return prefix + idCounter[prefix];
}
