// ************* STATIC vs DYNAMIC *************
/** 
 * Sorting type systems as either static or dynamic has to do with whether type-checking is performed at compile time or runtime. 

  * !!! TypeScript’s type system is static !!!
  * ?--> Java, C#, C++ all fit into this category. Keep in mind that inferrence can still occur in static type systems — TypeScript, Scala, and Haskell all have some form of static type checking.
  * ?--> Dynamic type systems perform their “type equivalence” evaluation at runtime. JavaScript, Python, Ruby, Perl and PHP fall into this category.

 */

// ************* NOMINAL vs STRUCTURAL *************

/** Nominal type systems are all about NAMES. Let’s take a look at a simple Java example:

public class Car {
  String make;
  String model;
  int make;
}
public class CarChecker {
  // takes a `Car` argument, returns a `String`
  public static String printCar(Car car) {  }
}
Car myCar = new Car();
// TYPE CHECKING
// -------------
// Is `myCar` type-equivalent to
//     what `checkCar` wants as an argument?
CarChecker.checkCar(myCar);
In the code above, when considering the question of type equivalence on the last line, all that matters is whether myCar is an instance of the class named Car
*/

// ! TypeScript type system is structural
// Structural type systems are all about STRUCTURE or SHAPE.
class Car {
  make: string;
  model: string;
  year: number;
  isElectric: boolean;
}

class Truck {
  make: string;
  model: string;
  year: number;
  towingCapacity: number;
}

const vehicle = {
  make: "Honda",
  model: "Accord",
  year: 2017,
};

function printCar(car: { make: string; model: string; year: number }) {
  console.log(`${car.make} ${car.model} (${car.year})`);
}

printCar(new Car()); // OK
printCar(new Truck()); // OK
printCar(vehicle); // OK

/**
 // ************* DUCK TYPES *************
 * In practice, this is very similar to structural typing, but “Duck typing” is usually used to describe dynamic type systems.
 */

/**
 // ************* "STRONG" vs "WEAK" TYPES *************
 * These terms, while used frequently, have no agreed-upon technical definition. In the context of TypeScript it’s common for those who say “strong” to really mean “static”. JavaScript is "weak" because of that it's dynamic.
 */
