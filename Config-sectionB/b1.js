// ============================================================
// B1 - var / let / const + Hoisting
// ============================================================

// ---- PART 1: PREDICT THE OUTPUT ----

// console.log(a) => undefined
// WHY: var is hoisted to the top of its scope and given the value 'undefined'
//      JavaScript internally moves 'var a' to the top, but NOT its value (10).
//      So when we log 'a' before the assignment, it exists but has no value yet.

// console.log(b) => ReferenceError: Cannot access 'b' before initialization
// WHY: let is also hoisted, but it is placed in the "Temporal Dead Zone" (TDZ).
//      In TDZ, the variable exists but cannot be accessed. Trying to access it throws an error.

// console.log(c) => ReferenceError: Cannot access 'c' before initialization
// WHY: const behaves exactly like let with hoisting — it also goes into TDZ.
//      You cannot read a const variable before its declaration line.

// ---- PART 2: RE-DECLARATION ----

// var a = 99;   => ALLOWED — var can be re-declared in the same scope (no error)
// let b = 88;   => SyntaxError: Identifier 'b' has already been declared
//                  let does NOT allow re-declaration in the same scope
// const c = 77; => SyntaxError: Identifier 'c' has already been declared
//                  const also does NOT allow re-declaration in the same scope

// ---- PART 3: const OBJECT MUTATION ----

// const user = { name: 'Asad' };
// user.name = 'Ali';  => ALLOWED
// WHY: const prevents re-assigning the variable itself, but the object it
//      points to can still be changed (mutated). We are not reassigning 'user',
//      just changing a property inside it.

// user = {};  => TypeError: Assignment to constant variable.
// WHY: This tries to make 'user' point to a completely new object {}.
//      That is re-assignment, which const does NOT allow.


// ============================================================
// CORRECTED VERSION OF THE CODE
// ============================================================

// --- Correct way to use var, let, const ---

var a = 10;     // var: declare before using to avoid undefined
let b = 20;     // let: declare before using to avoid TDZ error
const c = 30;   // const: declare before using to avoid TDZ error

console.log(a); // 10
console.log(b); // 20
console.log(c); // 30

// --- Re-declaration fix ---
// Instead of re-declaring, just re-assign (only var and let allow re-assignment)

a = 99;         // OK — var allows re-assignment
b = 88;         // OK — let allows re-assignment
// c = 77;      // NOT OK — const does not allow re-assignment (leave this commented)

console.log(a); // 99
console.log(b); // 88
console.log(c); // 30 (unchanged — const cannot be reassigned)

// --- Correct const object usage ---

const user = { name: 'Asad' };
user.name = 'Ali';  // OK — mutating a property is allowed with const
console.log(user.name); // 'Ali'

// user = {};   // This would cause TypeError — we do NOT do this
// To "reset" the object, change its properties one by one:
user.name = 'Asad'; // Reset back to original value
console.log(user.name); // 'Asad'