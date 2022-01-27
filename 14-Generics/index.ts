interface PhoneInfo {
  customerId: string;
  areaCode: string;
  num: string;
}

const phoneList = [
  { customerId: "0001", areaCode: "321", num: "123-4566" },
  { customerId: "0002", areaCode: "174", num: "142-3626" },
  { customerId: "0003", areaCode: "192", num: "012-7190" },
  { customerId: "0005", areaCode: "402", num: "652-5782" },
  { customerId: "0004", areaCode: "301", num: "184-8501" },
];

function listToDictAny(
  list: any[],
  idGen: (arg: any) => string
): { [k: string]: any } {
  ///   ⬆️ focus here  ⬆️

  const dict: { [k: string]: any } = {};
  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element;
  });
  return dict;
}

const dict = listToDict(
  [{ name: "Baris" }, { name: "John" }],
  (item) => item.name
);
console.log(dict);
dict.Baris.I.should.not.be.able.to.do.this.NOOOOOOO;

//! What we need here is some mechanism of defining a relationship between the type of the thing we’re passed, and the type of the thing we’ll return.
//! This is what Generics are all about

// ************* Define a type parameter *************
//? Generics may change their type, depending on the type parameters you use with them.
function wrapInArray<T>(arg: T): [T] {
  return [arg];
}
/**
 * TypeScript will infer what T is, on a per-usage basis, depending on what kind of array we pass in.
 * If we use a string[], T will be string, if we use a number[], T will be number
 */
wrapInArray(3); // function wrapInArray<number>(arg: number): [number]
wrapInArray(new Date()); // function wrapInArray<Date>(arg: Date): [Date]
wrapInArray(new RegExp("/s/")); // function wrapInArray<RegExp>(arg: RegExp): [RegExp]

function listToDict<T>(
  list: T[],
  idGen: (arg: T) => string
): { [k: string]: T } {
  const dict: { [k: string]: T } = {};

  list.forEach((element) => {
    const dictKey = idGen(element);
    dict[dictKey] = element;
  });

  return dict;
}

const dict1 = listToDict(
  [{ name: "Baris" }, { name: "John" }],
  (item) => item.name
);
/**
  function listToDict<{
    name: string;
  }>(list: {
    name: string;
  }[], idGen: (arg: {
    name: string;
  }) => string): {
    [k: string]: {
        name: string;
    };
  }
 */
console.log(dict1);
dict1.Baris;
const dict2 = listToDict(phoneList, (p) => p.customerId);
dict2.fax;
console.log(dict2);
