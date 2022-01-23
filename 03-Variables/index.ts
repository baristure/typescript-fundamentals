// *************** Variable Declarations & Inference ***************
let age1 = 6;
/**  typescript declare its type as age1:number
 * If we try to give age a value that is incompatible with number, we get an error
 * age1="declare a string value"
 * Error --> Type 'string' is not assignable to type 'number'.ts(2322)
 * ===========/ In TypeScript, variables are “born” with their types. /===========
 */
// *************** Literal Types ***************
const age2 = 6;

/**   
 * Notice that the type of this variable is not number, it’s 6. TS is able to make a more specific assumption here, because:
 * - const variable declarations cannot be reassigned
 * - the initial value assigned to age is a number, which is an immutable value type
 * - Therefore, age2 will always be 6 in this program.

* The type 6 is called a *** literal type ***. If our let declaration is a variable that can hold any number, the const declaration is one that can hold only 6 — a specific number.
*/

// *************** Implicit any and type annotations ***************
// between 500 and 1000
const RANDOM_WAIT_TIME = Math.round(Math.random() * 500) + 500;

let startTime = new Date();
let endTime;
/**
 * Sometimes, we need to declare a variable before it gets initialized,like endtime
 *  endTime is “born” without a type, so it ends up being an implicit any.
 * let endTime: any
 */

setTimeout(() => {
  endTime = 0;
  endTime = new Date();
  // so endTime takes number types and after that it takes date type
}, RANDOM_WAIT_TIME);

// ========/ the most flexible type is *** any *** /========

// *************** Function arguments and return values ***************

function add(a, b) {
  return a + b // strings? numbers? a mix?
}
const result = add(3, "4") // function add(a: any, b: any): any
//const result:any
// Without type annotations, “anything goes” for the arguments passed into add.
const p = new Promise(result) // result:any

function addTs(a: number, b: number) {
  return a + b
}
// const resultTs = addTs(3, "4")
// Error ---> Argument of type 'string' is not assignable to parameter of type 'number'.
const resultTs = add(3, 4)

// If we wanted to specifically state a return type, we could do so using the :foo syntax in one more place
function addTs2(a: number, b: number): number {
  return a+b
}