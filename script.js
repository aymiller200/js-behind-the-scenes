'use strict'

/* 
!JS Overview: 
  * JS is a high-level, prototype-based object oriented, multi-paradigm, interpreted or just-in-time compiled, dynamic, single-threaded, garbage-collected programming language with first-class function and a non-blocking event loop concurrency model. 

      *High-level: 

          *Any computer program needs resources. Low level programming such a C requires you to ask the computer for memory to create a variable. You have to manually manage your resources. 

          *With high level programming(JavaScript, python), these resources are manged automatically. These language have so-called abstractions that handle these resources, making the language easier to learn, and use.

      *Garbage-Collection: 
          *One of the powerful tools that take memory management away from developers is garbage collection. 
          *It is an algorithm inside of the javascript engine that automatically removes old un-used objects from the computer memory, in order not to clog it up with unecessary stuff. 
        
     *Interpreted or just-in-time compiled:
          * The computer's processor only understands zeros and ones(machine code).
          * The compiling from javascript code to machine code happens inside the JavaScript engine
          
     *Multi-paradigm: 
          * Paradigm: An approach and mindset of structuring code, which will direct your coding style and technique.
          * Can be imperative OR declarative
                * Three popular paradigms in programming: 
                    * 1) Procedural programming. 
                          *Organizing the code in a linear way.
                    * 2) Object-oriented programming (OOP)
                    * 3) Functional programming (FP)
          * Many languages are only Procedural, or Object-oriented, or Functional, but javascript does all of it.
    
    * Prototype-based object-oriented:
          * Almost everything in JS is an object, except for primitive values. 
          * Prototypal inheretance: When we create an array, we create them from an Array blue print called a prototype which contains all of the array methods. So the arrays we create have access to all of the methods on this blueprint. 
    
    * First-class functions: 
          * In a language with first-class functions, function are simply treated as variables. We can pass them into other functions, and return them from functions. 
 
    * Dynamic: Dynamically-typed language
          * No data type definitions. Types become known at runtime. 
          * Data type of variable is automatically changed. 
    
    *Singled-threaded & Non-blocking event loop concurrency model:
          * Concurreny model: how the Javascript engine handles multiple tasks happening at the same time. 
          * Javascript runs in one single thread (a thread is where our code is actually executed in our CPU, the machine's processor), so it can only do one thing at a time, which is why it needs the concurreny model
          * How do we achieve a long-running task? By using an event loop: takes long running tasks, executes them in the 'background', and puts them back in the main thread once they are finished. 

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////

/* 
!What is the javascript engine: 
    *JS Engine is a program that executes JS code
        *Ex: The V8 engine powers Google Chrome, but also node.js(JS runtime used to build servers)
    *Any Javascript engine contains two components: 
        *Call Stack: Where our code is executed, using something called execution context
        *Heap: Memory pool that stores all of the objects that our application needs. 

!Compilation vs. Interpretation when it comes to converting js code to machine code; 
    *Compilation: Entire code is converted into machine code at once, and written to a binary file that can be executed by a computer.

      *  Source Code ----Compilation-------> Portable file: machine code ----Execution-----> Program Running

    *Interpretation: Interpreter runs through the source code and executes it line by line.
      
      * Source Code ----------------Execution-Line-By-Line-----------------> Program Running
                      (code still needs to be converted to machine code)
                      
    *JS used to be strictly interpreted, but with modern JS and browers, interpretation is just too slow. JS now uses a mix of Interpretation and Compilation: 

      *Just-in-time (JIT) compilation: Entire code is converted into machine code at once, then executed immediately
      
          *Source Code ------Compilation-------> Machine Code -------Execution------> Program Running
                                            (NOT a portable file)
    !STEPS OF JIT COMPILATION: 
        * 1st step when a piece of JS code enters the engine: 

              *Parse (or read).
                  *During this parsing the code is parsed into a data structure called Abstract Syntax Tree(AST)
                  *This works by first splitting up each line of code into pieces that are meaningful to the language (i.e. const or function keywords), and then saving all the pieces into the tree in a structured way. This process also checks for syntax errors.
                  *The resulting tree will later be used to produce the machine code. 

        * 2nd step is the compilation: Takes the generated AST and compiles it into machine code.
        * 3rd step is Execution: This machine code gets executed right away. (Execution happens in the JS engine's call stack)
        * 4th Optimization: Modern JS engines create a very unoptimized version of machine code in the beginning, so that it can start executing as fast as possible, then in the background this code is being optimized an recompiled furing the already run program execution
    
    !JS Runtime in the browser: 
        *Containers including all the things that we need to use JS (in this case in the browser)
        *The heart of any JS runtime is the JS engine.
        *We also need access to the Web APIs (DOM, Timers, Fetch API): Functionalities provided to the engine, accessible on the window object, but not actually part of the JAvascript language.
        *JS runtime also includes Callback Queu: A data structure that contains all the callback functions that are ready to be executed
            *Event loop takes functions from the callback queu and puts them in the call stack where they can be executed

        *JS runtime can exist outside of browers, for example Node.js
            *Js runtime in node js is very similar to in the browser, but we do not have access to Web APIs, instead we have what is called C++ bindings and Thread Pool

*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 
!Execution Contexts and The Call Stack: 
*Ececution Context: An abstract concept. Environment in which a piece of JS is executed. Stores all the necessary information for some code to be executed.

*Exactly ONE global execution context (EC): Default context, created for code that is not inside any function (top-level)

*One execution context per function: For each function call, a new execution context is created.

  *After the code has been compiled into machine code a so called Global Execution Context is created for top-level code (code that is not inside any function)

  *Execution of Top-Level code (inside global EC)

  *Execution of functions and waiting for callbacks

*All of these executions together make up the call stack

!What's inside execution context: 
  *Variable Environment: 
      * let, const, and var declarations. 
      * functions
      * arguments object
  *Scope Chain:
      * Consists of references to variables that are located outside of the current function.
      * Stored in each execution context
  *This keyword: 
      *Each execution context gets access to its own 'this' keyword.
  
  *Execution contexts containing arrow functions do not get an arguments object or a this keyword. INstead they can use the arguments objects and the this keyword of their closest function parent.
  
*The content of this execution context is generated during the "creation phase", right before execution

*The call stack: 
    *The 'place' where execution contexts get stacked on top of each other, to keep track of where we are in the execution.
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/* 
!Scoping and Scope in JS: Concepts: 
    *Scoping: How our program's variables are organized and accessed

    *Lexical Scoping: Scoping is controlled by placement of functions and blocks in the code. 

    *Scope: Space or environment in which a certain variable is declared(variable environment in case of functions). There is global, function, and block scope. 

    *Scope of a variable: Region of our code where a certain variable can be accessed.

    *Global Scope: 
        * Outside of ANY function or block
        * Variables declared in global scope are accessible EVERYWHERE

    *Function Scope: 
        * Variables are accessible only inside the functino NOT outside
        * Also called local scope

    *Block Scope: 
        *Variables are accessible only inside the block(block scoped)
        *THIS ONLY APPLIES TO LET AND CONSTS VARIABLES
        *Functions are also block scoped (only in strict mode)

!Scope Chain vs. call stack: 
  *Call stack: order in which functions were called
  *Scope Chain: Order in which functions are written in the code. Has NOTHING to do with the order in which function were called. 
*/

//!SCOPE CHAIN:
const myName = 'Ayanna' // * Global Scope: myName = "Ayanna"

function first() {
  //* first(scope)
  //* age = 30
  //* millenial = true <- part of this first function scope because of the var keyword. Var is function scoped, NOT block scoped
  //* myName = 'Ayanna'
  const age = 30

  if (age >= 30) {
    //* decade = 3
    //* age = 30
    //* millenial = true
    //* myName = 'Ayanna'
    //* this does not get access to the variables in the second() scope because of lexical scoping which is dependent on where the code is written and placed
    const decade = 3 //* Let and const are block scoped
    var millenial = true
  }

  //* if block scope, and second() function scope are not written inside of eachother. The are both inside of the parent first() function, so they are sibling scopes. So, by the rules of lexical scoping, they cannot have access to each other's variables. The scope chain only works upwards, NOT sideways or downwards.

  function second() {
    //* second() scope: has access to variables from all outer scopes
    //* age = 30
    //* myName = 'Ayanna'
    //* millenial = true
    //! This is a result of variable look up in scope chain. If the variable doesn't exist here, it will look up to see if the variable exists in the parent function. Cannot look down
    const job = 'teacher'

    console.log(`${myName} is a ${age}-old ${job}`)
  }

  second()
}

first()

//////////////////////////////////////////////////////////////////////
/* 
!Scope in practice
*/

function calcAge(birthYear) {
  const age = 2021 - birthYear

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`
    console.log(output) // firstName is still Ayanna here, because JS can't look down the scope chain, so it looks up, and finds the declared firstName variable in the global scope.

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true

      //Creating NEW variable with same name as outer scope's variable.

      const firstName = 'Cris'

      //Reassigning outer scope's variable
      output = 'New output'

      const str = `Oh and you're a millenial, ${firstName}`
      console.log(str) // firstName is now cris because JS always tries to look at the variable name in the current scope first before looking up

      function add(a, b) {
        return a + b
      }
    }
    //console.log(str); // ! <-Error:  Const and Let are block scoped. They are available only in the block in which they are created.

    console.log(millenial) //! <- NO Error: Var variables are function scoped. So they simply ignore the block.

    // add(2, 3) //! <- Add is not defined: The scope of the add function is only in the block in which it was defined. Functions are block scoped (IN STRICT MODE.)

    console.log(output)
  }
  printAge()
  return age
}

const firstName = 'Ayanna'
calcAge(1994)

/////////////////////////////////////////////////////////////////

/* 
!Hoisting: 
  * Makes some types of variables accessible/usable in the code before they are actually declared. "Variables lifted to the top of their scope"

    ? Behind-the-scenes: Before Execution, code is scanned for variable declarations, and for each variable, a new property is created in the variable environment object.

  * Function Declarations: 
      ? Hoisted: YES
      ? Initial value: ACTUAL FUNCTION 
          * We can use function declarations before they are actually declared in the code because they are stored in the variable environment object even before the code starts executing.
      ? Scope: Block (ONLY TRUE FOR STRICT MODE)

  * Var variables: 
      ? Hoisted: YES
      ? Initial value: UNDEFINED 
          * When we try to access the var variable before it is declared, we don't get the declared value.
      ? Scope: FUNCTION

  * Let and Const:
      ? Hoisted: NO (Technically, yes, but not in practice. They are hoisted but their value is set to unitialized)
      ? Initial value: uninitialized, TDZ (Temporal dead zone)
          * These variables are placed in a so called temporal dead zone which makes it so we can't access the variables between the beginning of the scope, and the place where the variables are declared.
      ? Scope: Block
          * Exist only in the block in which they are created

  * Function expressions and arrow functions:
      ? Hoisted: NO (If using let and const)
      ? Initial Value : unitialized, TDZ (or undefined if using var)
      ? Scope


  !TEMPORAL DEAD ZONE
    * Each and every let and const variable get their own temporal dead zone that starts at the beginning of the scope until the line where it is defined.
    * The variable is only safe to use AFTER the TDZ
    
  ? Why TDZ? 
    * Makes it easier to avoid and catch errors: accessing variables before declaration is bad practice and should be avoided.

    * Makes const variables actually work: const should never be reassigned, and so it's only assigned when execution actually reaches the declaration, and that makes it impossible to use the varaible before.
  
  ? Why Hoisting? 
    * Using function before actual declaration
    * Var hoisting is just a byproduct
*/

/* 
!Hoisting and TDZ in practice
? VARIABLES DECLARED WITH LET AND CONST ARE NOT CREATED AS PROPERTIES ON THE WINDOW OBJECT
*/

//Variables hoisting
console.log(me) //hoisted to undefined
console.log(job) //unitialized, TDZ
console.log(year) // unitialized, TDZ

var me = 'Ayanna'
let job = 'Programmer'
const year = 1994

//Functions hoisting
console.log(addDecl(2, 3)) // 5 : Able to call the function declaration before it was defined in the code.

console.log(addExpr(2, 3)) // Uninitialized
console.log(addArrow(2, 3)) // Uninitialized

function addDecl(a, b) {
  return a + b
}

const addExpr = function (a, b) {
  return a + b
}

const addArrow = (a, b) => a + b

//Example:
if (!numProducts) deleteShoppingCart() //numProducts is undefined, so it triggers the execution of this code.

var numProducts = 10

function deleteShoppingCart() {
  console.log('All products deleted')
}

/////////////////////////////////////////////////////////////////////
/* 
!THIS Keyword:

  *Special variable that is created for every execution context (every function). Takes the value of (points to) the "owner" of the function in which the 'this' keyword is used.

  *THE VALUE OF THE THIS KEYWORD IS NOT STATIC. It depends on how the function is called, and its value is only assigned when the function is actually called.

      ? Ways of calling functions: 

          * Method: this = <Points to the object that is calling the method> 

          * Simple function call: this = Points to undefined (ONLY IN STRICT MODE otherwise, 'this' points to the window object (in the browser))

          * Arrow functions(do NOT get their own this keyword): this = <points to this of the surrounding/parent function (lexical this)>

          * Event Listener: this = <Points to DOM element that the handler is attached to>

      !'THIS' DOES NOT POINT TO THE FUNCTION ITSELF, AND ALSO NOT THE VARIABLE ENVIRONMENT

*/
//!THIS in practice

console.log(this) // <- Window/global object when not in strict mode

const calcAge = function (birthYear) {
  console.log(2021 - birthYear)
  console.log(this) //Global object or undefined in strict mode
}

calcAge(1994)

//Arrow:
const calcAgeArrow = (birthYear) => {
  console.log(2021 - birthYear)
  console.log(this) //Global or window object because arrow functions use the lexical this, so the this of the parent scope/function
}

calcAgeArrow(1994)

//!METHOD EXAMPLE:

const ayanna = {
  name: 'Ayanna',
  year: 1994,
  calcAge: function () {
    // <- Method
    console.log(2021 - this.year)
    //return 2021 - this.year //'this' point to ayanna object.
  },
}

//console.log(ayanna.calcAge())

const matilda = {
  year: 2017,
}

matilda.calcAge = ayanna.calcAge
matilda.calcAge() //this keyword always points to the object that is calling the method.

const f = ayanna.calcAge
f() //undefined because this f() function is just a function call. There is no owner of this f() function, it is not attached to any object

///////////////////////////////////////////////////////////////////////////////////////
/* 
!Regular functions vs. Arrow functions. 
*/

const ayanna = {
  //this is not a code block, simply just an object literal
  firstName: 'Ayanna',
  year: 1994,
  calcAge: function () {
    console.log(this)
    console.log(2021 - this.year)

    //!Solution 1
    const self = this //pre ES6 solution. A way to fix the regular function call problem. (Can be self or that)
    const isMillenial = function () {
      console.log(self.year >= 1981 && self.year <= 1996)
    }

    isMillenial() // A regular function call, this is undefined.

    //!Solution 2
    const isMillenialTwo = () => {
      //Arrow functions work because they don't have their ouwn this keyword. They use the 'this' of the parent scope/function
      console.log(self.year >= 1981 && self.year <= 1996)
    }

    isMillenialTwo()
  },

  greet: () => console.log(`Hey ${this.firstName}`), //! Arrow functions do not get their own 'this' keyword. They get 'this' from the parent scope, and the parent scope of this method is the global scope.
}
ayanna.calcAge()
ayanna.greet() //! This.firstName is undefined.

//!Arguments Keyword:
//* Arguments is useful when we need to pass more parameters than specified
const addExpr = function (a, b) {
  console.log(arguments) // [Arguments] {'0': 2, '1': 5}
  return a + b
}

addExpr(2, 5, 8, 12)

var addArrow = (a, b) => {
  //arrow functions do not get the argument keyword, just like they don't get this.
  console.log(arguments)
  return a + b
}

addArrow(2, 10)

//////////////////////////////////////////////////////////////////////////////
/* 
!Primitives vs. Objects

?Primitives: (Primitive Types)
?Primitive types are stored in the call stack: Stored in the execution context in which they are declared.
  * NUMBER
  * STRING
  * BOOLEAN
  * UNDEFINED
  * NULL
  * SYMBOL
  * BIGINT

? Objects: (Reference Types)  
? Objects or Refernce types get stored in the JS engine memory heap
  * OBJECT LITERAL
  * ARRAYS
  * FUNCTIONS
  * MANY MORE...
*/

//Primitive
let age = 30
/*
*The age variable is stored in the call stack like this: 
? IDENTIFIER           ADDRESS            VALUE
!    age                0001               30        **NOTE** The value at a certain memory 
                                                                ! address is immutable
!   oldAge              0001               30 
*When we change age's value, this is how it is stored in the call stack: 
? IDENTIFIER           ADDRESS            VALUE
!    age                0001               30
!  oldAge               0002               31
?Age points to the new address, while old age still points to 0001

* Age is actually equal to the memory address '0001' which holds the value of 30
* oldAge point to the same memory address '0001' 
*/
let oldAge = age
age = 31
console.log(age) //31
console.log(oldAge) //30

//Reference values
/* 
* This is was the me object looks like in the heap: 
?  ADDRESS             VALUE
!   D30F        {name: 'Ayanna', age: 30}

* In the case of reference values, the 'me' identifier does not point directly to the newly created memory address in the heap. Instead, it will point to a new piece of memory that is created in the stack. 
? IDENTIFIER           ADDRESS            VALUE
!    age                0001               30
!  oldAge               0002               31
!   me                  0003              D30F (Reference to memory address in the heap)
!  friend              (points to same address at the 'me' identifier)
* THE PIECE OF MEMORY IN THE CALL STACK REFERENCES THE PIECE OF MEMORY IN THE HEAP WHICH HOLDS OUR ME OBJECT
* REFERENCE TYPES ARE STORED THIS WAY BECAUSE OBJECTS MAY BE TO LARGE TO STORE IN THE STACK

* **NOTE** * 
! Always values declared with const are immutable, except when it come to reference values.
*/
const me = {
  name: 'Ayanna',
  age: 20,
}

const friend = me
friend.age = 27
/* 
* When we change the age on friend this is what we are doing: 
?  ADDRESS             VALUE
!   D30F        {name: 'Ayanna', age: 27}
*So since we are changing the value of the object in the heap, and since friend and me both point to D30F, both of the age values are changed.

*Friend and me are two different identifiers pointing to the exact dame value.
*/
console.log('Friend:', friend) //age 27
console.log('Me', me) //age 27

//!Primitives vs. Objects IN PRACTICE
let lastName = 'Miller'
let oldLastName = lastName
lastName = 'Matson'
console.log(lastName, oldLastName)

const cris = {
  first: 'Cris',
  last: 'Maston',
  age: 29,
}

const marriedCris = cris

marriedCris.last = 'Catson'
console.log('Before Marriage:', cris) //catson
console.log('After Marriage:', marriedCris) //catson

//Copying Objects
const cris = {
  first: 'Cris',
  last: 'Maston',
  age: 29,
  family: ['Ayanna', 'Dad'],
}

//!We can use Object.assign function to merge two objects.
const crisCopy = Object.assign({}, cris) // <-creates a new object with all the properties of the cris object. Only creates a shallow copy and not a deep clone. If there was an object within an object, that inner object would still be the original

crisCopy.last = 'Catson'

crisCopy.family.push('Blanche')

console.log('Before Marriage:', cris) //Matson, ['Ayanna', 'Dad', 'Blanche']
console.log('After Marriage:', crisCopy) //Catson ['Ayanna', 'Dad', 'Blanche']
