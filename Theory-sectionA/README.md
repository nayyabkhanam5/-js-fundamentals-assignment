
## Section A — Interview-Style Questions
 
---
 
## A1
 
### What is the difference between `var`, `let`, and `const` in JavaScript?
 
#### ① Scope
 
- **`var`** has **function scope** — it is accessible anywhere inside the function it was declared in. If declared outside any function, it becomes a global variable.
- **`let`** and **`const`** have **block scope** — they only exist inside the `{}` block where they were declared (e.g., inside an `if` statement or a `for` loop).
```js
function example() {
  if (true) {
    var x = 10;   // accessible outside the if block
    let y = 20;   // only accessible inside this if block
  }
  console.log(x); // 10  — works
  console.log(y); // ReferenceError — y is not accessible here
}
```
 
#### ② Hoisting
 
- **`var`** is hoisted and automatically given the value `undefined`. So if you access it before the declaration line, you get `undefined`.
- **`let`** and **`const`** are also hoisted, but they are NOT given any value. They sit in the **Temporal Dead Zone (TDZ)** and accessing them throws a `ReferenceError`.
```js
console.log(a); // undefined — var is hoisted with value undefined
console.log(b); // ReferenceError — let is in TDZ
var a = 5;
let b = 10;
```
 
#### ③ Temporal Dead Zone (TDZ)
 
`let` and `const` are hoisted to the top of their block, but they cannot be accessed before their declaration line. The period between the start of the block and the declaration is called the **TDZ**. Accessing a variable in the TDZ causes a `ReferenceError`.
 
> **Common interview mistake:** Many people say `let` is NOT hoisted. That is wrong. `let` IS hoisted, but to TDZ — not to `undefined`.
 
#### ④ Re-declaration and Re-assignment
 
| Keyword | Re-declare | Re-assign |
|---------|-----------|-----------|
| `var`   | ✅ Yes    | ✅ Yes    |
| `let`   | ❌ No     | ✅ Yes    |
| `const` | ❌ No     | ❌ No     |
 
```js
var a = 1;
var a = 2;   // OK — var allows re-declaration
 
let b = 1;
let b = 2;   // SyntaxError — let cannot be re-declared
 
const c = 1;
c = 2;       // TypeError — const cannot be re-assigned
```
 
#### ⑤ Which should you use in modern JavaScript?
 
- Use **`const`** by default for everything.
- Use **`let`** only when you know the value will need to change (like a counter in a loop).
- **Avoid `var`** entirely in modern JavaScript — its function scope and hoisting behaviour to `undefined` cause confusing bugs.
---
 
## A2
 
### What is the V8 Engine? What does it mean that JavaScript is single-threaded?
 
#### ① What is V8?
 
**V8** is a JavaScript engine built by Google. It is the engine that reads and runs JavaScript code. V8 is used inside **Google Chrome** (the browser) and **Node.js** (the server-side runtime). It takes your JavaScript code and turns it into machine code that your computer's processor can actually execute.
 
#### ② JIT Compilation (Just-In-Time)
 
Normally, code is either **compiled** all at once before running, or **interpreted** line by line as it runs. V8 uses **JIT compilation** — a smart middle ground. It compiles your JavaScript code into machine code *right before* each part runs, and it also caches and optimises frequently-used code on the fly. This makes JavaScript much faster than pure interpretation.
 
#### ③ Single-Threaded
 
JavaScript is **single-threaded**, which means it has **only one call stack** — it can only do one thing at a time. If one task is running, nothing else can run until it finishes. This keeps things simple and prevents conflicts, but it means long tasks can block the entire program.
 
#### ④ How does JS handle async tasks if it's single-threaded?
 
JavaScript itself is single-threaded, but the **environment** (browser or Node.js) provides extra capabilities:
 
- When you call `setTimeout` or `fetch`, the browser handles those tasks in the background using **Web APIs** (separate threads provided by the browser).
- When those background tasks finish, their callback functions are placed in the **Callback Queue**.
- The **Event Loop** constantly checks: "Is the Call Stack empty?" If yes, it picks the next callback from the queue and pushes it onto the stack to run.
This way, JS stays single-threaded but can appear to do multiple things at once.
 
#### ⑤ The Key Components
 
| Component | Role |
|-----------|------|
| **Call Stack** | Where JS executes code — one task at a time |
| **Web APIs** | Browser-provided features (setTimeout, fetch, DOM) |
| **Callback Queue** | Holds finished async callbacks waiting to run |
| **Event Loop** | Moves callbacks from queue to call stack when stack is empty |
 
> **Bonus:** If JS is single-threaded, is Node.js also single-threaded? The JS execution IS single-threaded, but Node.js uses **libuv** (a C++ library) which manages a thread pool for I/O operations like reading files or making network requests.
 
---
 
## A3
 
### Explain the 8 JavaScript data types. What is type coercion — implicit vs explicit?
 
#### ① The 8 Data Types
 
JavaScript has **7 primitive types** and **1 non-primitive type**:
 
| # | Type | Example |
|---|------|---------|
| 1 | `string` | `'hello'` |
| 2 | `number` | `42`, `3.14`, `NaN`, `Infinity` |
| 3 | `boolean` | `true`, `false` |
| 4 | `undefined` | a variable declared but not assigned |
| 5 | `null` | intentionally empty value |
| 6 | `bigint` | `9007199254740991n` |
| 7 | `symbol` | `Symbol('id')` |
| 8 | `object` | `{}`, `[]`, functions — all non-primitives |
 
#### ② The Famous `typeof null` Bug
 
```js
typeof null === 'object' // true — this is a BUG!
```
 
When JavaScript was first written in 1995 in just 10 days, the internal representation of values used bit tags. The `null` value happened to use the same bit tag as objects (`000`). So `typeof null` returned `'object'`. This bug was discovered later but was **never fixed** because fixing it would break millions of existing websites that depend on this behaviour. The correct way to check for null is `value === null`.
 
#### ③ Implicit Coercion (JS converts types silently)
 
```js
'5' + 3       // '53'  — JS converts 3 to a string and concatenates
'5' - 3       // 2     — JS converts '5' to a number and subtracts
if (0) {}     // 0 is coerced to false — falsy
```
 
#### ④ Explicit Coercion (you convert types intentionally)
 
```js
Number('42')    // 42   — string to number
String(42)      // '42' — number to string
Boolean(0)      // false — 0 is falsy
```
 
#### ⑤ Why `==` is dangerous and `===` is safe
 
`==` (loose equality) performs **type coercion** before comparing — it tries to convert both values to the same type first. This causes unexpected results:
 
```js
0 == false      // true  — both coerced to 0
'' == false     // true  — both coerced to 0
null == undefined // true — special case
 
0 === false     // false — no coercion, different types
'' === false    // false — no coercion, different types
```
 
Always use `===` in real code to avoid bugs from silent type conversion.
 
---
 
## A4
 
### What is the difference between primitive and non-primitive types in JavaScript? How are they stored in memory?
 
#### ① Primitive Types — Stored on the Stack
 
The 7 primitive types are: `string`, `number`, `boolean`, `undefined`, `null`, `bigint`, `symbol`.
 
Primitives are stored directly in the **Stack** — a fast, organised memory area. The actual value is stored in the variable slot.
 
#### ② Non-Primitive Types — Stored in the Heap
 
Non-primitives are: `objects`, `arrays`, and `functions`.
 
The actual data is stored in the **Heap** — a larger, less organised memory area for complex data. The variable does NOT hold the data itself; it holds a **reference** (like an address/pointer) to where the data lives in the heap.
 
#### ③ Copying a Primitive
 
When you copy a primitive, you get a completely **independent copy** of the value. Changing one does not affect the other:
 
```js
let a = 10;
let b = a; // b gets its own copy of the value 10
b = 20;
console.log(a); // 10 — a is unchanged
console.log(b); // 20
```
 
#### ④ Copying a Reference Variable
 
When you copy an object or array, you copy the **reference** (the address), NOT the actual data. Both variables now point to the **same object in memory**:
 
```js
let obj1 = { name: 'Ali' };
let obj2 = obj1; // obj2 gets the same address, not a copy
obj2.name = 'Sara';
console.log(obj1.name); // 'Sara' — obj1 also changed!
```
 
#### ⑤ Code Example
 
```js
// Copying an object — mutation affects the original
const original = { score: 100 };
const copy = original;   // NOT a real copy — same reference
copy.score = 999;
console.log(original.score); // 999 — both changed!
 
// Correct way: use spread to create a new object
const trueCopy = { ...original };
trueCopy.score = 1;
console.log(original.score); // 999 — original unchanged
```
 
> **Interview tip:** Arrays are objects in JavaScript — non-primitive, stored in the heap, copied by reference.
 
---
 
## A5
 
### What is pass by value vs pass by reference? Is JavaScript truly pass by reference?
 
#### ① Passing a Primitive to a Function
 
When you pass a primitive to a function, the function gets a **copy** of the value. Changing it inside the function does NOT affect the original:
 
```js
function addTen(num) {
  num = num + 10; // changes the local copy only
}
let x = 5;
addTen(x);
console.log(x); // 5 — x is unchanged
```
 
#### ② Passing an Object to a Function
 
When you pass an object, the function receives a copy of the **reference** (the address). So it can reach into the object and mutate its properties:
 
```js
function changeName(obj) {
  obj.name = 'Sara'; // mutates the actual object in heap memory
}
const user = { name: 'Ali' };
changeName(user);
console.log(user.name); // 'Sara' — original was mutated!
```
 
#### ③ The Key Nuance: JS Passes the Reference BY VALUE
 
JavaScript does NOT truly "pass by reference" in the traditional sense. It passes the **reference address as a value**. The function gets a copy of the reference, not the reference itself.
 
This is an important distinction:
 
#### ④ Reassigning `obj` inside a function does NOT change the original
 
```js
function tryReplace(obj) {
  obj = { name: 'New Object' }; // reassigns the LOCAL copy of the reference
}
const user = { name: 'Ali' };
tryReplace(user);
console.log(user.name); // 'Ali' — user is unchanged!
```
 
Because `obj` inside the function is a local copy of the reference. Pointing it to a new object just changes the local copy. The original `user` variable still points to the old object.
 
#### ⑤ But Mutating `obj.property` DOES affect the original
 
```js
function mutate(obj) {
  obj.name = 'Sara'; // follows the reference to the original object and changes it
}
const user = { name: 'Ali' };
mutate(user);
console.log(user.name); // 'Sara' — original was mutated through the reference
```
 
> **The precise answer:** JavaScript always passes by value. For primitives, the value IS the data. For objects, the value IS the reference address. So you can mutate through the reference, but you cannot replace the original reference itself.
 
---
 
## A6
 
### What is a function in JavaScript? Explain function declaration syntax, hoisting, return values, and parameters.
 
#### ① What problem does a function solve?
 
A function is a **reusable block of code** that performs a specific task. Instead of writing the same code over and over, you write it once inside a function and call it whenever needed. Functions make code organised, readable, and easy to maintain.
 
#### ② Function Declaration Syntax
 
```js
function functionName(parameter1, parameter2) {
  // code to execute
  return result;
}
```
 
#### ③ Is a function declaration hoisted?
 
Yes! **Function declarations are fully hoisted** — both the name AND the entire body are moved to the top of their scope. This means you can call a function BEFORE it is written in the code:
 
```js
greet('Ali'); // Works! — function is hoisted
 
function greet(name) {
  console.log('Hello, ' + name);
}
```
 
This is different from `let`/`const` which are in TDZ, and different from function expressions which are NOT hoisted.
 
#### ④ Parameter vs Argument
 
- **Parameter** — the variable name listed in the function definition (a placeholder)
- **Argument** — the actual value you pass when calling the function
```js
function add(a, b) {  // a and b are PARAMETERS
  return a + b;
}
add(3, 5);  // 3 and 5 are ARGUMENTS
```
 
#### ⑤ What does a function return if no return statement is written?
 
If a function has no `return` statement, or just a bare `return;`, it automatically returns **`undefined`**:
 
```js
function sayHi() {
  console.log('Hi');
  // no return statement
}
const result = sayHi(); // logs 'Hi'
console.log(result);    // undefined
```
 
#### ⑥ Real-world example — age validation function
 
```js
function validateAge(age) {
  // Check if age is actually a number
  if (typeof age !== 'number' || isNaN(age)) {
    return 'Error: age must be a number';
  }
  // Check if age is within a realistic range
  if (age < 0 || age > 120) {
    return 'Error: age must be between 0 and 120';
  }
  // Check minimum age requirement (e.g., 18 to register)
  if (age < 18) {
    return 'Sorry, you must be at least 18 years old';
  }
  return 'Age is valid — welcome!';
}
 
console.log(validateAge(25));    // 'Age is valid — welcome!'
console.log(validateAge(15));    // 'Sorry, you must be at least 18 years old'
console.log(validateAge(-5));    // 'Error: age must be between 0 and 120'
console.log(validateAge('abc')); // 'Error: age must be a number'
```
 
> **Bonus fact:** Functions are also objects in JavaScript. `typeof function(){} === 'function'`, but functions are also `instanceof Object`. They have properties like `.name` and `.length` (number of parameters).
 