// ************* GENERIC CONSTRAINTS *************
/**
 * Generic constraints allow us to describe the “minimum requirement” for a type param,
 * such that we can achieve a high degree of flexibility,
 * while still being able to safely assume some minimal structure and behavior.
 */

interface HasId {
  id: string;
}
interface Dict<T> {
  [k: string]: T;
}
function listToDict(list: HasId[]): Dict<HasId> {
  const dict: Dict<HasId> = {};

  list.forEach((item) => {
    dict[item.id] = item; // id -> string
  });

  return dict;
}

// IMPLEMENTATION WITH GENERICS
function listToDict<T>(list: T[]): Dict<T> {
  const dict: Dict<T> = {};

  list.forEach((item) => {
    dict[item.id] = item; // Property 'id' does not exist on type 'T'.ts(2339)
  });

  return dict;
}
/**
 * The problem here is that T can be anything, potentially including things that don’t have this id: string property.
 *  We were able to get away with this in our initial solution (with the idGen function)
 * because listToDict didn’t really do anything with T other than store a reference to it in a dictionary.
 */

// ************* DESCRIBING THE CONSTRAINT *************
/**
 * The way we define constraints on generics is by using the extends keyword.ƒ
 *! function listToDict(list: HasId[]): Dict<HasId> {
 ** function listToDict<T extends HasId>(list: T[]): Dict<T> {
 * extends HasId as the constraint on T
 * list: T[] to ensure that we still receive an array
 * T EXTENDS VS CLASS EXTENDS
 * The extends keyword is used in object-oriented inheritance,
 * and while not strictly equivalent to how it is used with type params, there is a conceptual connection:
 *
 * When a class extends from a base class, it’s guaranteed to at least align with the base class structure.
 *  In the same way, T extends HasId guarantees that “T is at least a HasId”.
 */

// ************* SCOPE and TYPEPARAMS *************
function receiveFruitBasket(bowl) {
  console.log("Thanks for the fruit basket!");
  // only `bowl` can be accessed here
  eatApple(bowl, (apple) => {
    // both `bowl` and `apple` can be accessed here
  });
}

// outer function
function tupleCreator<T>(first: T) {
  // inner function
  return function finish<S>(last: S): [T, S] {
    return [first, last];
  };
}
const finishTuple = tupleCreator(3); // const finishTuple: <S>(last: S) => [number, S]
const t1 = finishTuple(null); // const t1: [number, any]
const t2 = finishTuple([4, 8, 15, 16, 23, 42]); // const t2: [number, number[]]

/**
 * The same design principles that you use for deciding whether values belong as class fields vs. arguments passed to members should serve you well here.
 * This is not exactly an independent decision to make, as types belong to the same scope as values they describe.
 */

// ************* BEST PRACTICES *************
//? Use each type parameter at least twice. Any less and you might be casting with the *** as *** keyword. Let’s take a look at this example:

function returnAs<T>(arg: any): T {
  return arg; // an `any` that will seem like a `T`
}

const first = returnAs<number>(window); // first -> number
const sameAs = window as any as number; // sameAs -> number
//In this example, we have told TypeScript a lie by saying window is a number (but it is not…). 
//Now, TypeScript will fail to catch errors that it is suppose to be catching!

// Define type parameters as simply as possible. Consider the two options for listToDict
interface HasId{
  id:string
}
interface Dict<T>{
  [k:string]:T
}

function ex1<T extends HasId[]>(list:T){
  return list.pop() // (parameter) list: T extends HasId[]
}
function ex2<T extends HasId>(list :T[]){
  return list.pop() // (parameter) list: T[]
}