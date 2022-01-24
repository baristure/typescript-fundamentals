// ************* CALLABLE TYPES *************

// ? interfaces
interface TwoNumberCalculation {
  (x: number, y: number): number;
}
const add: TwoNumberCalculation = (a, b) => a + b;
// ? type aliases
type TwoNumberCalc = (x: number, y: number) => number;
const subtract: TwoNumberCalc = (x, y) => x - y;

/**
 * The return type for an interface is :number, and for the type alias it’s => number
 * Because we provide types for the functions add and subtract, we don’t need to provide type annotations for each individual function’s argument list or return type
 */

// ************* VOID *************
// Sometimes functions don’t return anything, and we know from experience with JavaScript, what actually happens in the situation below is that x will be undefined
function printFormattedJSON(obj: string[]) {
  console.log(JSON.stringify(obj, null, "  "));
}

const x = printFormattedJSON(["hello", "world"]);

//** The return value of a void function is intended to be ignored
function invokeInFourSeconds(callback: () => undefined) {
  setTimeout(callback, 4000);
}
function invokeInFiveSeconds(callback: () => void) {
  setTimeout(callback, 5000);
}

const values: number[] = [];
invokeInFourSeconds(() => values.push(4)); // --> It gives an error because push is returning a number not an undefined
invokeInFiveSeconds(() => values.push(4)); // -> It's fine

// ************* CONSTRUCT SIGNATURES *************
// Construct signatures are similar to call signatures, except they describe what should happen with the new keyword.
interface DateConstructor {
  new (value: number): Date;
}

let MyDateConstructor: DateConstructor = Date;
const d = new MyDateConstructor();

// ************* FUNCTION OVERLOADS *************
/** 
<iframe src="https://example.com" />
<form>
  <input type="text" name="name" />
  <input type="text" name="email" />
  <input type="password" name="password" />
  <input type="submit" value="Login" />
</form>

  What if we had to create a function that allowed us to register a “main event listener”?
  - If we are passed a form element, we should allow registration of a “submit callback”
  - If we are passed an iframe element, we should allow registration of a ”postMessage callback”
*/
type FormSubmitHandler_ = (data: FormData) => void;
type MessageHandler_ = (evt: MessageEvent) => void;

function handleMainEvent_(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler_ | MessageHandler_
) {
  const myFrame = document.getElementsByTagName("iframe")[0]; // myFrame : HTMLIFrameElement

  handleMainEvent_(myFrame, (val) => {}); // val : any
}
/**
 * This is not good — we are allowing too many possibilities here,
 * including things we don’t aim to support (e.g., using a HTMLIFrameElement with FormSubmitHandler, which doesn’t make much sense).
 */
// *** Solve with using function overloads ***
type FormSubmitHandler = (data: FormData) => void;
type MessageHandler = (data: MessageHandler) => void;

function handleMainEvent(elem: HTMLFormElement, handler: FormSubmitHandler);
function handleMainEvent(elem: HTMLIFrameElement, handler: MessageHandler);
function handleMainEvent(
  elem: HTMLFormElement | HTMLIFrameElement,
  handler: FormSubmitHandler | MessageHandler
) {}

const myFrame = document.getElementsByTagName("iframe")[0]; // myFrame: HTMLIFrameElement

const myForm = document.getElementsByTagName("form")[0]; // myForm: HTMLFormElement

handleMainEvent(myFrame, (val) => {}); // (elem: HTMLIFrameElement, handler: MessageHandler): any
handleMainEvent(myForm, (val) => {}); // (elem: HTMLFormElement, handler: FormSubmitHandler): any

function handleMainEvent__(elem: HTMLFormElement, handler: FormSubmitHandler);
function handleMainEvent__(elem: HTMLIFrameElement, handler: MessageHandler); //! --> It gives an error. Because function signature(last one) must be general enough to include everything that’s possible through the exposed first and second function heads.
function handleMainEvent__(
  elem: HTMLFormElement, // it is not include HTMLIFrameElement
  handler: FormSubmitHandler // it is not include MessageHandler
) {}

// ************* this *************
// this is a special keyword in JavaScript and I like it so much
/**
 * if we had a DOM event listener for a button
 * <button onClick="myClickHandler">Click Me!</button>
 * function myClickHandler(event: Event) {
 * this.disabled = true // ! --> 'this' implicitly has type 'any' because it does not have a type annotation.
 * myClickHandler(new Event("click")) // Its ok
 */

function myClickHandler___(this: HTMLButtonElement, event: Event) {
  this.disabled = true;
}
myClickHandler___(new Event("click")); // ! -->The 'this' context of type 'void' is not assignable to method's 'this' of type 'HTMLButtonElement'.

function myClickHandler(this: HTMLButtonElement, event: Event) {
  this.disabled = true;
}
const myButton = document.getElementsByTagName("button")[0];
const boundHandler = myClickHandler.bind(myButton);
boundHandler(new Event("click")); // bound version: ok
myClickHandler.call(myButton, new Event("click")); // also ok

// ************* FUNCTION TYPE BEST PRACTICES *************
//? ========/ Explicitly define return types /========
export async function getData_(url: string) {
  const response = await fetch(url);
  const data = (await response.json()) as {
    properties: string[];
  };
  return data;
}
function loadData_() {
  getData_("https://example.com").then((result) => {
    console.log(result.properties.join(", ")); //(parameter) result: { properties: string[];}
  });
}

export async function getData(url: string): Promise<{ properties: string[] }> { // Function lacks ending return statement and return type does not include 'undefined'
  const response = await fetch(url);
  if (response.ok) {
    const data = (await response.json()) as {
      properties: string[];
    };
    return data;
  }
}
function loadData() {
  getData("https://example.com").then((result) => {
    console.log(result.properties.join(", "))
  })
}