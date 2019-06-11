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
  1.1) Creation of the Variable Object
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

  1.2) Creation of the scope chain

    * Scope answers the question "Where can we access a certain variable?"

    * Each new function creates a scope: Space / Environment in which the
    variables it defines are accessible.
  1.3) Determine value of 'this' variable

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

