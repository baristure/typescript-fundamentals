// ************* TYPES DESCRIBE SETS OF ALLOWED VALUES *************
const x: boolean = true || false; // x could be true or false
const y: number = 1 || 2 || 3; // y could be any number
let a: 5 | 6 | 7; // anything in { 5, 6, 7 }
let b: null; // anything in { null }
let c: {
  favoriteFruit?: "pineapple"; // { "pineapple", undefined }
};

// ************* TOP TYPES *************
//A top type (symbol: ⊤) is a type that describes any possible value allowed by the system.
// TypeScript provides two of these types: *** any *** and *** unknown ***.

//! ========/ any /========
// We can think of values with an any type as “playing by the usual JavaScript rules”. Here’s an illustrative example:

let flexible: any = 4;
flexible = "Download some more ram";
flexible = window.document;
flexible = setTimeout;
//any typed values provide none of the safety we typically expect from TypeScript.
let flexible2: any = 14;
flexible2.it.is.possible.to.access.any.deep.property;
console.log(window, Promise, setTimeout, "foo"); //  console.log : any
// We can see here that any is not always a “bug” or a “problem” — it just indicates maximal flexibility and the absence of type checking validation.

//! ========/ unknown /========

let flexible3: unknown = 4;
flexible3 = "Download some more ram";
flexible3 = window.document;
flexible3 = setTimeout;
// However, unknown is different from any in a very important way:
//? Values with an unknown type cannot be used without first applying a type guard

let myUnknown: unknown = 14;
myUnknown.it.is.possible.to.access.any.deep.property; // unknown can not narrow it, can not access the deeper values

// This code runs for { myUnknown| anything }
if (typeof myUnknown === "string") {
  // This code runs for { myUnknown| all strings }
  console.log(myUnknown, "is a string"); // let myUnknown: string
} else if (typeof myUnknown === "number") {
  // This code runs for { myUnknown| all numbers }
  console.log(myUnknown, "is a number"); // let myUnknown: number
} else {
  // this would run for "the leftovers"
  //       { myUnknown| anything except string or numbers }
}

//! ========/ Practical use of top types /========
/**
 *
 * You will run into places where top types come in handy very often.
 * In particular, if you ever convert a project from JavaScript to TypeScript, it’s very convenient to be able to incrementally add increasingly strong types.
 *  A lot of things will be any until you get a chance to give them some attention.
 *
 * unknown is great for values received at runtime (e.g., your data layer).
 * By obligating consumers of these values to perform some light validation before using them, errors are caught earlier, and can often be surfaced with more context.
 *
 */

// ************* BOTTOM TYPE: never *************
// A bottom type (symbol: ⊥) is a type that describes no possible value allowed by the system|

class Car2 {
  drive() {
    console.log("vrommm");
  }
}
class Truck {
  tow() {
    console.log("dragging items");
  }
}
class Boat {
  isFloating() {
    return true;
  }
}
type Vehicle = Truck | Car2 | Boat;
let myVehicle: Vehicle = obtainRandomVehicle();
if (myVehicle instanceof Truck) {
  myVehicle.tow(); // Truck
} else if (myVehicle instanceof Car2) {
  myVehicle.drive; // Car
} else {
  // NEITHER !
  const neverValue: never = myVehicle; //! Type 'Boat' is not assignable to type 'never'.
  throw new UnreachableError(
    myVehicle,
    //! Argument of type 'Boat' is not assignable to parameter of type 'never'.
    `Unexpected vehicle type: ${myVehicle}`
  );
}
/**
 * Now, one of three things will happen in that final else block
 * We will have handled every case before reaching it, and thus we will never enter the final else block
 * We will catch upstream code changes that need to be handled in this conditional at compile time (e.g., adding the Boat case)
 * If somehow an unexpected value “slip through” and is not caught until we actually run the code, we will get a meaningful error message
 * Note that this approach works nicely with a switch statement, when the UnreachableError is thrown from the default case clause
 */
