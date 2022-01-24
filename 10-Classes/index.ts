// ************* CLASS FIELDS *************

class Car1 {
  make: string;
  model: string;
  year: number;
  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
}

let sedan = new Car1("Honda", "Accord", 2017);
sedan.activateTurnSignal("left"); // not safe!
new Car1(2017, "Honda", "Accord"); // not safe!

/**
  Two things to notice in the code snippet above:
  - We are stating the types of each class field
  - We are stating the types of each constructor argument
 */
// ************* ACCESS MODIFIER KEYWORDS *************
//! public, private and protected
/**
 *! *** keyword  ***  *** who can access
 ***  public	  ***   *** everyone (this is the default)
 ***  protected ***	  *** the instance itself, and subclasses
 ***  private   ***	  *** only the instance itself
 */

class Car {
  public make: string;
  public model: string;
  public year: number;
  protected vinNumber = generateVinNumber();
  private doorLockCode = generateDoorLockCode();

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  protected unlockAllDoors() {
    unlockCar(this, this.doorLockCode);
  }
}
class Sedan extends Car {
  constructor(make: string, model: string, year: number) {
    super(make, model, year);
    this.vinNumber;
    this.doorLockCode; // Property 'doorLockCode' is private and only accessible within class 'Car'.
  }
  public unlock() {
    console.log("Unlocking at " + new Date().toISOString());
    this.unlockAllDoors();
  }
}

let s = new Sedan("Honda", "Accord", 2017);
s.make;
s.vinNumber; // Property 'vinNumber' is protected and only accessible within class 'Car' and its subclasses.
s.doorLockCode; // Property 'doorLockCode' is private and only accessible within class 'Car'.
s.unlock();

// ************* JS private #fields *************
class CarWithPrivate {
  public make: string;
  public model: string;
  #year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.#year = year;
  }
}
const c2 = new CarWithPrivate("Honda", "Accord", 2017);
c2.#year; // Property '#year' is not accessible outside class 'Car' because it has a private identifier.

// ========/ readonly /========
class Car4 {
  public make: string;
  public model: string;
  public readonly year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  updateYear() {
    this.year++; // Cannot assign to 'year' because it is a read-only property
  }
}

// ************* PARAM PROPERTY *************
class Car5 {
  constructor(public make: string, public model: string, public year: number) {}
}

const myCar = new Car5("Honda", "Accord", 2017);
myCar.make;
myCar.model;
myCar.year;

// the first argument passed to the constructor should be a string, and should be available within the scope of the constructor as make.
// This also creates a public class field on Car called make and pass it the value that was given to the constructor
// It is important to understand the order in which “constructor-stuff” runs.

class Base {}

class Car6 extends Base {
  foo = console.log("class field initializer");
  constructor(public make: string) {
    super();
    console.log("custom constructor stuff");
  }
}

const car = new Car6("honda");

class Base2 {}

class Car7 extends Base {
  foo = console.log("class field initializer");
  constructor(public make: string) {
    console.log("before super");
    super(); // ! A 'super' call must be the first statement in the constructor when a class contains initialized properties, parameter properties, or private identifiers.
    console.log("custom constructor stuff");
  }
}

const car7 = new Car7("honda");
