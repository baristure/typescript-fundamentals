// ************* UNION TYPES in TYPESCRIPT *************
/**
 * A union type has a very specific technical definition that comes from set theory, but it’s completely fine to think of it as OR, for types.
 * ! Union types in TypeScript can be described using the | (pipe) operator.
 * *** OR ***
 */
function flipCoin(): "heads" | "tails" {
  if (Math.random() > 0.5) return "heads";
  return "tails";
}

const outcome = flipCoin(); // It's just return heads or tails

// Let's get dive more complicated
function maybeGetUserInfo():
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  if (flipCoin() === "heads") {
    return ["success", { name: "Mike North", email: "mike@example.com" }];
  } else {
    return ["error", new Error("The coin landed on TAILS :(")];
  }
}

const outcome2 = maybeGetUserInfo();
const [first, second] = outcome2;

// first will be : "error" | "success";
// second:
// | Error
// | {
//      name: string;
//      email: string;
//    };

// ? we can use all of the string methods for first.~~~ because it has to be a string. And typescript is autocompleting it's with string methods.
// ? but we can't use all of the string methods for second.~~~. Typescript autocomplete it as a second.name. Because success and error objects have name property as a string.

// ========/ Narrowing with type guards /========

if (second instanceof Error) {
  // In this branch of your code, second is an Error
  second.message;
  second.stack;
  second.name;
} else {
  // In this branch of your code, second is the user info
  second.email;
  second.name;
}

// * It gets even better…

// ========/ Discriminated Unions /========
if (outcome2[0] === "error") {
  // In this branch of your code, second is an Error
  outcome2[1].message;
  outcome2[1].stack;
  outcome2[1].name;
} else {
  // In this branch of your code, second is the user info
  outcome2[1].email;
  outcome2[1].name;
}

// ************* INTERSECTION TYPES in TYPESCRIPT *************
// ! Intersection types in TypeScript can be described using the & (ampersand) operator.
function makeWeek(): Date & { end: Date } {
  //⬅ return type

  const start = new Date();
  const end = new Date(start.valueOf() + 123123);

  return { ...start, end }; // kind of Object.assign
}

const thisWeek = makeWeek(); //  Date & { end: Date; }
thisWeek.toISOString();

thisWeek.end.toISOString();
