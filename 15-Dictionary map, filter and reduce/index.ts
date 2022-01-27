///// SAMPLE DATA FOR YOUR EXPERIMENTATION PLEASURE (do not modify)
const fruits = {
  apple: { color: "red", mass: 100 },
  grape: { color: "red", mass: 5 },
  banana: { color: "yellow", mass: 183 },
  lemon: { color: "yellow", mass: 80 },
  pear: { color: "green", mass: 178 },
  orange: { color: "orange", mass: 262 },
  raspberry: { color: "red", mass: 4 },
  cherry: { color: "red", mass: 5 },
};

interface Dict<T> {
  [k: string]: T;
}

//! Array.prototype.map
function mapDict<T, S>(
  inputDict: Dict<T>,
  mapFunction: (original: T, key: string) => S
): Dict<S> {
  const outDict: Dict<S> = {};
  for (let k of Object.keys(inputDict)) {
    const thisVal = inputDict[k];
    outDict[k] = mapFunction(thisVal, k);
  }
  return outDict;
}

//! Array.prototype.filter
function filterDict<T>(
  inputDict: Dict<T>,
  filterFunction: (value: T, key: string) => boolean
): Dict<T> {
  const outDict: Dict<T> = {};
  for (let k of Object.keys(inputDict)) {
    const thisVal = inputDict[k];
    if (filterFunction(thisVal, k)) outDict[k] = thisVal;
  }
  return outDict;
}

//! Array.prototype.reduce
function reduceDict<T, S>(
  inputDict: Dict<T>,
  reducerFunction: (currentVal: S, dictItem: T, key: string) => S,
  initialValue: S
): S {
  let value = initialValue;
  for (let k of Object.keys(inputDict)) {
    const thisVal = inputDict[k];
    value = reducerFunction(value, thisVal, k);
  }
  return value;
}
