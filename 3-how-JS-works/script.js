/*******************************************************************************
* How our code is executed

Javascript engine: takes our code and execute it. Is a program that executes JS
code.

1. The code is parsed. Reads our code line by line and validates that our code
is correct/valid. This produces a Abstract Syntax Tree.
2. Abstract Syntax Tree translated to a machine code and then runs.

Execution context.

All JS code needs to run in an execution context. The default execution context
is the global context.
This global execution context is all the variables and functions that are not
inside a function.

The global context is associated with a global object, in the browser is the
window object.

Everything that is declared in the global execution context is attached to the
window object.

lastName === window.lastName // true

Everytime we call a function is has its own brand new execution context.

Execution Context -> object

1. Variable Object: Contain function arguments, variable and function
declarations.
2. Scope chain: the current variable object as well the variable object of all
its parents.
3. 'this' variable.


When a function is called, a new execution context is put on top of the
execution stack, this happens in 2 phases.

1. Creation phase
  1.1) Creation of the Variable Object.

    * The argument 'object' is created, containing all the arguments that were
    passed into the function.

    * Code is scanned for function declarations, for each function, a property
    is created in the Variable Object, pointing to the function. (All functions
    will be stored in the variable object even before the code starts executing)

    * Code is scanned for variable declarations, for each variable, a property
    is created in the Variable Object, and set to 'undefined' (Hoisting)

    ============================================================================
    Hoisting: Means that variables and functions are available before the
    execution phase actually starts. But they are hoisted in a different way.

    -> Functions are already declare before execution phase starts.
    -> Variable are set up to 'undefined' and will be only defined on the
    execution phase.
    ============================================================================

  1.2) Creation of the scope chain.

    * Scope answers the question "Where can we access a certain variable or
    function?"

    * Each new function creates a scope: Space / Environment in which the
    variables it defines are accessible.

    * If, else, for, while block don't create a new scope in Javascript.

    * Lexical scoping: A function that is lexically within another function (a
    function inside another function) gets access to the scope of the outer
    (parent) function.

  1.3) Determine value of 'this' variable.

    * Is a variable that each and every execution context gets. And is stored in
    the execution context object.

    * Regular Function Call: points at the global object (window object in the
    browser)

    * Method call: points to the object that is calling the method.

    * The this keyword is not assigned a value until a function where it is
    defined is actually called.

2. Execution phase
  The code of the function that generated the current execution context is ran
  line by line

*******************************************************************************/

/*******************************************************************************
* Hoisting
*******************************************************************************/
/**
 * Functions
 *
 * Functions are already declare before execution phase starts. This only works
 * for function declarations, not for function expressions!
 */

/*
// This will Work! :D
calculateAge(1992);

function calculateAge(year) {
  console.log(2019 - year);
}


// This won't Work! :C
//retirement(1990);

var retirement = function(year) {
  console.log(65 - (2019 - year));
}
*/

/**
 * Variables
 *
 * The code is scanned for variable declarations and the variables are then set
 * to undefined.
 *
 * ^ -> Both are two completely different age variables,
 * they are in different variable object and different exection context objects.
 *
 * The first one is defined in the variable object of the global exectuion
 * context object.
 *
 * The second one is defined in the variable object of execution context object
 * of the foo function.
 */

/*
console.log(age);
var age = 23; // ^


function foo() {
  console.log(age);
  var age = 65; // ^
  console.log(age);
}

foo();
console.log(age);
*/

/*******************************************************************************
* Scoping
*******************************************************************************/

/*
// Global Scope [VO global]
var a = 'Hello';
first();

function first() {
  //first() scope [VO 1] + [VO global]
  var b = 'Hi!';
  second();

  function second() {
    //second() scope [VO 2] + [VO 1] + [VO global]
    var c = 'Hey!';

    console.log(a + b + c);
  }
}
*/

/*
// Execution Stack VS Scope Chain
var a = 'Hello!';
first();

function first() {
  // Scope: a and b. Not c nor d.
  var b = 'Hi!';
  second();

  function second() {
    // Scope a, b and c. Not d.
    var c = 'Hey!';
    third();
  }
}

function third() {
  var d = 'John';

  // This won't work, third scope only have a and d variables.
  // console.log(a+b+c+d);

  console.log(a+d);
}
*/


/*******************************************************************************
* this keyword
*******************************************************************************/
/*
// window object.
console.log(this);
*/

/*
// In a regular function call the this keyword always points to the window object
function calculateAge(year) {
  console.log(2019 - year);
  console.log(this);
}

calculateAge(1992);
*/

/*
var john = {
  name: 'John',
  yearOfBirth: 1990,
  calculateAge: function() {
    console.log(this);
    console.log(2019 - this.yearOfBirth);

    // Regular function call!
    function inner() {
      console.log(this);
    }

    inner();
  }
};

john.calculateAge();

var mike = {
  name: 'Mike',
  yearOfBirth: 1995
};

mike.calculateAge = john.calculateAge;
//The this keyword is only assigned a value when the object calls the method.
mike.calculateAge();
*/