// ************* null *************

/**
 * null means: there is a value, and that value is nothing.
 * While some people believe that null is not an important part of the JS language,
 * I find that it’s useful to express the concept of a “nothing” result (kind of like an empty array, but not an array)
 */
const userInfo = {
  name: "Barış",
  email: "baristure@hotmail.com",
  secondaryEmail: null, // user has no secondary email
};

// ************* undefined *************

//undefined means the value isn’t available (yet?)

const formInProgress = {
  createdAt: new Date(),
  data: new FormData(),
  completedAt: undefined,
};
function submitForm() {
  formInProgress.completedAt = new Date();
}

// ************* void *************
//void should exclusively be used to describe that a function’s return value should be ignored
console.log(`console.log returns nothing.`);

// ************* Non-null assertion operator *************

/**
 * The non-null assertion operator (!.) is used to cast away the possibility that a value might  be null or undefined.
 * That the value could still be null or undefined, this operator just tells TypeScript to ignore that possibility.
 */

type GroceryCart = {
  fruits?: { name: string; qty: number }[];
  vegetables?: { name: string; qty: number }[];
};
const cart: GroceryCart = {};
cart.fruits.push({ name: "Orange", qty: 1 });
cart.fruits!.push({ name: "Orange", qty: 1 });

// ************* Definite assignment operator *************
// The definite assignment !: operator is used to suppress TypeScript’s objections about a class field being used, when it can’t be proven1 that it was initialized.

class ThingWithAsyncSetup {
  setupPromise: Promise<any>; // ignore the <any> for now
  isSetup: boolean; //! Property 'isSetup' has no initializer and is not definitely assigned in the constructor.(2564)

  constructor() {
    this.setupPromise = new Promise((resolve) => {
      this.isSetup = false;
      return this.doSetup();
    }).then(() => {
      this.isSetup = true;
    });
  }

  private async doSetup() {
    // some async stuff
  }
}
let myThing = new ThingWithAsyncSetup();
myThing.isSetup; // false
