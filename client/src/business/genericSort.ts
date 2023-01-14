export function genericSort<T>(arr: Array<T>, key: keyof T): Array<T> {
  return [...arr].sort((object1, object2) =>
    sortByKey({ object1, object2, key })
  );
}

function sortByKey<T>({
  object1,
  object2,
  key,
  isDescending = false,
}: {
  object1: T;
  object2: T;
  key: keyof T;
  isDescending?: boolean;
}): number {
  const result = (): number => {
    if (object1[key] > object2[key]) {
      return 1;
    } else if (object1[key] < object2[key]) {
      return -1;
    }
    return 0;
  };
  return isDescending ? result() * -1 : result();
}
