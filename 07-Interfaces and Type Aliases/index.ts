// ************* TYPE ALIASES *************
/**
 * Type aliases help to address this, by allowing us to:
  - define a more meaningful name for this type
  - declare the particulars of the type in a single place
  - import and export this type from modules, the same as if it were an exported value
 */
///////////////////////////////////////////////////////////
// @filename: types.ts
export type UserContactInfo = {
  name: string;
  email: string;
};
/**
 * A few things to point out here:
  - This is a rare occasion where we see type information on the right hand side of the assignment operator (=)
  - We’re using TitleCase to format the alias’ name. This is a common convention
  - As we can see below, we can only declare an alias of a given name once within a given scope. This is kind of like how a let or const variable declaration works
 */
///////////////////////////////////////////////////////////
// @filename: utilities.ts
//import { UserContactInfo } from "./types"

const painter = {
  name: "Robert Ross",
  email: "bross@pbs.org",
  favoriteColor: "Titanium White",
};

function printContactInfo(info: UserContactInfo) {
  console.log(info);
  console.log(info.email);
}

/**
 * We can see a couple of things here:
  - the tooltip on info is now a lot ***cleaner*** and more semantic (meaningful, in connection with the concept behind it)
  - import/export of this type works just as it would for a function or a class in JavaScript
 */

printContactInfo({
  name: "Robert Ross",
  email: "bross@pbs.org",
  favoriteColor: "Titanium White", //  Object literal may only specify known properties, and 'favoriteColor' does not exist in type 'UserContactInfo'
}); //
printContactInfo(painter); // totally fine

///////////////////////////////////////////////////////////
// @filename: original.ts
/**
 * ORIGINAL version
 */
export function maybeGetUserInfo():
  | ["error", Error]
  | ["success", { name: string; email: string }] {
  // implementation is the same in both examples
  if (Math.random() > 0.5) {
    return ["success", { name: "Mike North", email: "mike@example.com" }];
  } else {
    return ["error", new Error("The coin landed on TAILS :(")];
  }
}

///////////////////////////////////////////////////////////
// @filename: with-aliases.ts
type UserInfoOutcomeError = ["error", Error];
type UserInfoOutcomeSuccess = ["success", { name: string; email: string }];
type UserInfoOutcome = UserInfoOutcomeError | UserInfoOutcomeSuccess;

/**
 * CLEANED UP version
 */
export function maybeGetUserInfoClean(): UserInfoOutcome {
  // implementation is the same in both examples
  if (Math.random() > 0.5) {
    return ["success", { name: "Mike North", email: "mike@example.com" }];
  } else {
    return ["error", new Error("The coin landed on TAILS :(")];
  }
}
// ========/ Inheritance /========

type SpecialDate = Date & { getReason(): string };

const newYearsEve: SpecialDate = {
  ...new Date(),
  getReason: () => "Last day of the year",
};
newYearsEve.getReason; // String

// ************* INTERFACES *************
/** An interface is a way of defining an object type. An “object type” can be thought of as, “an instance of a class could conceivably look like this”. */
interface UserInfo {
  name: string;
  email: string;
}
function printUserInfo(info: UserInfo) {
  info.name; // string
}

// Like type aliases, interfaces can be imported/exported between modules just like values, and they serve to provide a “name” for a specific type.
// ========/ Inheritance /========
interface Animal {
  isAlive(): boolean;
}
interface Mammal extends Animal {
  getFurOrHairColor(): string;
}
interface Dog extends Mammal {
  getBreed(): string;
}
function careForDog(dog: Dog) {
  dog.getBreed;
  dog.getFurOrHairColor;
  dog.isAlive;
}

// Just as in in JavaScript, a subclass extends from a base class.
// Additionally a “sub-interface” extends from a base interface, as shown in the example below
interface AnimalLike {
  eat(food): void;
}

class Dog implements AnimalLike {
  bark() {
    return "woof";
  }
  eat(food) {
    console.log(`Eat ${food}`);
  }
}

// Multiple Inheritance
class LivingOrganism {
  isAlive() {
    return true;
  }
}
interface AnimalLike {
  eat(food): void;
}
interface CanBark {
  bark(): string;
}

class NewDog extends LivingOrganism implements AnimalLike, CanBark {
  bark() {
    return "woof";
  }
  eat(food) {
    console.log(`Eat ${food}`);
  }
}

// ========/ Open Interfaces /========
// TypeScript interfaces are “open”, meaning that unlike in type aliases, you can have multiple declarations in the same scope:
interface AnimalLike {
  isAlive(): boolean;
}
function feed(animal: AnimalLike) {
  animal.eat;
  animal.isAlive;
}

// SECOND DECLARATION OF THE SAME NAME
interface AnimalLike {
  eat(food): void;
}

window.document; // an existing property

window.exampleProperty = 42; // What we have done here is augment an existing Window interface that TypeScript has set up for us behind the scene.

// tells TS that `exampleProperty` exists
interface Window {
  exampleProperty: number;
}

// *** Choosing which to use ***
/** 
  In many situations, either a type alias or an interface would be perfectly fine, however…
  - If you need to define something other than an object type (e.g., use of the | union type operator), you must use a type alias
  - If you need to define a type to use with the implements heritage term, it’s best to use an interface
  - If you need to allow consumers of your types to augment them, you must use an interface.
*/

// ************* RECURSION *************
type NestedNumbers = number | NestedNumbers[];

const val: NestedNumbers = [3, 4, [5, 6, [7], 59], 221];

if (typeof val !== "number") {
  val.push(41);
  val.push("this will not work");
  // Argument of type 'string' is not assignable to parameter of type 'NestedNumbers'.
}
 