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

*******************************************************************************/