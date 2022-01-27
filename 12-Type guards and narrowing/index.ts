// ************* BUILT-IN TYPE GUARD *************

let value:
  | Date
  | null
  | undefined
  | "pineapple"
  | [number]
  | { dateRange: [Date, Date] };

// instanceof
if (value instanceof Date) {
  value; // Date
}
// typeof
else if (typeof value === "string") {
  value; //  "pineapple"
}
// Specific value check
else if (value === null) {
  value; // value: null
}
// Truthy/falsy check
else if (!value) {
  value; //value: undefined
}
// Some built-in functions
else if (Array.isArray(value)) {
  value; // [number]
}
// Property presence check
else if ("dateRange" in value) {
  value; // { dateRange: [Date, Date] }
} else {
  value; // never
}

// ************* USER-DEFINED TYPE GUARDS *************
interface CarLike {
  make: string;
  model: string;
  year: number;
}
let maybeCar: unknown;

// the guard
if (
  maybeCar &&
  typeof maybeCar === "object" &&
  "make" in maybeCar &&
  typeof maybeCar["make"] === "string" &&
  "model" in maybeCar &&
  typeof maybeCar["model"] === "string" &&
  "year" in maybeCar &&
  typeof maybeCar["year"] === "number"
) {
  maybeCar; // CarLike-object
}

// the guard function
function isCarLike(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  );
}
if (isCarLike(maybeCar)) {
  maybeCar; // unkown
}

//! ========/ value is Foo /========
// Pay very close attention to isCarLike’s return type
function isCarCheck(valueToTest: any): valueToTest is CarLike {
  return (
    valueToTest &&
    typeof valueToTest === "object" &&
    "make" in valueToTest &&
    typeof valueToTest["make"] === "string" &&
    "model" in valueToTest &&
    typeof valueToTest["model"] === "string" &&
    "year" in valueToTest &&
    typeof valueToTest["year"] === "number"
  );
}
// using the guard
if (isCarCheck(maybeCar)) {
  maybeCar; // CarLike-object
}
//! ========/ assert value is Foo /========
// There is another approach we could take that eliminates the need for a conditional. Pay very close attention to assertsIsCarLike’s return type:
// the guard
function assertIsCarLike(valueToTest: any): asserts valueToTest is CarLike {
  if (
    !(
      valueToTest &&
      typeof valueToTest === "object" &&
      "make" in valueToTest &&
      typeof valueToTest["make"] === "string" &&
      "model" in valueToTest &&
      typeof valueToTest["model"] === "string" &&
      "year" in valueToTest &&
      typeof valueToTest["year"] === "number"
    )
  )
    throw new Error(`Value does not apper to be a CarLike${valueToTest}`);
}

// using the guard
maybeCar; // unkown

assertIsCarLike(maybeCar);
maybeCar; // CarLike-object

/**
 * Concepptually, what's going on behind the scenes is very similar.
 *  By using this special syntax to describe the return type,
 *  we are informing TypeScript that if assertsIsCarLike throws an error,
 *  it should be taken as an indication that the valueToTest is NOT type-equivalent to CarLike
 */
// ************* WRITING HIGHT QUALITY GUARDS *************

// ! Bad example of a type guard

function isNull(val: any): val is null {
  return !val;
}
const empty = "";
const zero = 0;
if (isNull(zero)) {
  console.log(zero);
}
if(isNull(empty)){
  console.log(empty);
}
// We see both 0 and "" logged to the console.