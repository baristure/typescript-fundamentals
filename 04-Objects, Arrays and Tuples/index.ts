// ************* OBJECTS *************
/** 
  In general, object types are defined by:
  - The names of the properties that are (or may be) present
  - The types of those properties
*/
let car: {
  make: string;
  model: string;
  year: number;
};
/**
 * Print information about a car to the console
 * @param car - the car to print
 */
function printCar(car: { make: string; model: string; year: number }) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

// ========/ Optional Properties /========
let car2: {
  make: string; // Always
  model: string; // Always
  year: number; // Always
  chargeVoltage?: number; // Sometimes
};

function printCar2(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}) {
  let str = `${car.make} ${car.model} (${car.year})`;
  car.chargeVoltage; // (property) chargeVoltage?: number | undefined

  if (typeof car.chargeVoltage !== "undefined")
    str += `// ${car.chargeVoltage}v`; // (property) chargeVoltage?: number
  console.log(str);
}

// Works
printCar2({
  make: "Honda",
  model: "Accord",
  year: 2017,
});
// Also works
printCar2({
  make: "Tesla",
  model: "Model 3",
  year: 2020,
  chargeVoltage: 220,
});

// ========/ Excess property checking /========

function printCar3(car: {
  make: string;
  model: string;
  year: number;
  chargeVoltage?: number;
}) {
  // implementation removed for simplicity
}

printCar3({
  make: "Tesla",
  model: "Model 3",
  year: 2020,
  chargeVoltage: 220,
  color: "RED", // <0------ EXTRA PROPERTY
});
/** 
  Try fixing this three ways in the TypeScript
  - Remove the color property from the object
  - Add a color: string to the function argument type
  - Create a variable to hold this value, and then pass the variable into the printCar3 function
 */

// ========/ Index signatures /========
//Sometimes we need to represent a type for dictionaries, where values of a consistent type are retrievable by keys.
const phones = {
  home: { country: "+1", area: "211", number: "652-4515" },
  work: { country: "+1", area: "670", number: "752-5856" },
  fax: { country: "+1", area: "322", number: "525-4357" },
};

// We can declare it in the Typescript like the below
const phones2: {
  [k: string]: {
    country: string;
    area: string;
    number: string;
  };
} = {};

phones.fax;
/** 
  (property) fax: {
  country: string;
  area: string;
  number: string;
} 
*/
phones2.fax;
/** 
  (property) fax: {
  country: string;
  area: string;
  number: string;
} 
*/

// ************* ARRAY TYPES *************
// Describing types for arrays is often as easy as adding [] to the end of the array member’s type. For example the type for an array of strings would look like string[]
const fileExtensions: string[] = ["js", "ts"];
const numbers: number[] = [1, 2, 3, 4, 5];
const booleans: boolean[] = [true, false];
// If we want to describe more complex arrays like as a car we can describe like the below

const carsArr: {
  make: string;
  model: string;
  year: number;
}[] = [
  {
    make: "Honda",
    model: "Accord",
    year: 2017,
  },
  {
    make: "Tesla",
    model: "Model 3",
    year: 2020,
  },
];

// ************* TUPLES *************

// Sometimes we may want to work with a multi-element, ordered data structure, where position of each item has some special meaning or convention. This kind of structure is often called a *** tuple ***.
let myCar: [number, string, string] = [2012, "Volkwagen", "Golf"];
// ERROR --> not the right convention
myCar = ["Honda", 2017, "Accord"];
// ERROR --> too many items
myCar = [2017, "Honda", "Accord", "Sedan"];
const [year, make, model] = myCar;
// year:number
// make:string
// model:string

// ************* LIMITATIONS *************
// As of TypeScript 4.3, there’s limited support for enforcing tuple length constraints.
const numPairFirst: [number, number] = [4, 5, 6];

// But we can use *** pop *** and *** push ***
const numPair: [number, number] = [4, 5];
numPair.push(6); // [4, 5, 6]
numPair.pop(); // [4, 5]
numPair.pop(); // [4]
numPair.pop(); // []
