// ============================================================
// B2 - typeAnalyser Function (Functions + Type Coercion)
// ============================================================

// This function takes ANY value and returns a detailed report about it.
// It tells us: what type it is, is it an array, is it null,
// and what it becomes when converted to Number, Boolean, or String.

function typeAnalyser(value) {

  // typeof gives us the basic type as a string
  // SPECIAL CASE: typeof null === 'object' — this is a famous JavaScript bug!
  // JavaScript was built in 10 days and this mistake was never fixed.

  const typeofResult = typeof value;

  // Array.isArray() is the correct way to check for arrays
  // because typeof [] also returns 'object' — same as typeof {}
  const isArray = Array.isArray(value);

  // The only way to correctly check for null is === null
  // because typeof null returns 'object' (the bug mentioned above)
  const isNull = value === null;

  // Number(value) tries to convert the value into a number
  // Examples: Number('42') => 42, Number(true) => 1, Number(null) => 0,
  //           Number('hello') => NaN, Number([]) => 0
  const toNumber = Number(value);

  // Boolean(value) converts to true or false
  // FALSY values (become false): 0, '', null, undefined, NaN, false
  // TRUTHY values (become true): everything else — including [], {}, 'hello'
  // IMPORTANT: Boolean([]) === true  (empty array is TRUTHY!)
  const toBoolean = Boolean(value);

  // String(value) converts the value to a string
  // Examples: String(42) => '42', String(null) => 'null', String([1,2]) => '1,2'
  const toString = String(value);

  // Return all the information as one object
  return {
    input: value,
    typeofResult: typeofResult,
    isArray: isArray,
    isNull: isNull,
    toNumber: toNumber,
    toBoolean: toBoolean,
    toString: toString
  };
}


// ============================================================
// TEST CALLS — Run all 8 values
// ============================================================

console.log('--- typeAnalyser(42) ---');
console.log(typeAnalyser(42));
// typeofResult: 'number', isArray: false, isNull: false
// toNumber: 42, toBoolean: true (non-zero number is truthy), toString: '42'

console.log('\n--- typeAnalyser("hello") ---');
console.log(typeAnalyser('hello'));
// typeofResult: 'string', toBoolean: true (non-empty string is truthy)

console.log('\n--- typeAnalyser(null) ---');
console.log(typeAnalyser(null));
// typeofResult: 'object' (the famous bug!), isNull: true
// toNumber: 0, toBoolean: false (null is falsy)

console.log('\n--- typeAnalyser([]) ---');
console.log(typeAnalyser([]));
// typeofResult: 'object', isArray: true, isNull: false
// toNumber: 0, toBoolean: true  <-- IMPORTANT: empty array is TRUTHY!

console.log('\n--- typeAnalyser(undefined) ---');
console.log(typeAnalyser(undefined));
// typeofResult: 'undefined', toNumber: NaN, toBoolean: false (undefined is falsy)

console.log('\n--- typeAnalyser(true) ---');
console.log(typeAnalyser(true));
// typeofResult: 'boolean', toNumber: 1, toBoolean: true

console.log('\n--- typeAnalyser(0) ---');
console.log(typeAnalyser(0));
// typeofResult: 'number', toBoolean: false  <-- 0 is FALSY!

console.log('\n--- typeAnalyser("") ---');
console.log(typeAnalyser(''));
// typeofResult: 'string', toBoolean: false  <-- empty string is FALSY!