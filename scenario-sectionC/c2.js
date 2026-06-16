// ============================================================
// C2 - User Registration System — Validation Engine
// Concepts: Functions · Operators · Conditions · Type Coercion · Data Types
// ============================================================

// This function validates user registration data.
// The data may come in messy — wrong types, missing fields, etc.
// We handle every edge case and return either a valid user or a list of errors.

function validateUser(data) {

  // We collect all errors in an array
  // Instead of stopping at the first error, we find ALL errors at once
  const errors = [];

  // ---- VALIDATE: name ----
  // name must be a string AND must not be empty
  // We use typeof to check the type
  // We use .trim() to remove spaces from both ends before checking length
  if (typeof data.name !== 'string' || data.name.trim().length === 0) {
    errors.push('Name cannot be empty');
  }

  // ---- VALIDATE: email ----
  // email must be a string AND must contain '@' AND must contain '.'
  // The includes() method checks if a string contains a given substring
  if (
    typeof data.email !== 'string' ||
    !data.email.includes('@') ||
    !data.email.includes('.')
  ) {
    errors.push('Invalid email format');
  }

  // ---- VALIDATE: age ----
  // age may come as a string from a form ('25') — we need to coerce it
  // We use Number() to convert it — if it fails, we get NaN
  // isNaN() checks if a value is NaN (Not a Number)
  // We also use ?? (nullish coalescing) as a fallback: if data.age is null/undefined, use undefined
  const ageAsNumber = Number(data.age ?? undefined);

  if (isNaN(ageAsNumber)) {
    // The value could not be converted to a valid number (e.g., '17abc')
    errors.push('Age must be a valid number');
  } else if (ageAsNumber < 13 || ageAsNumber > 120) {
    // Valid number but outside the allowed range
    errors.push('Age must be between 13 and 120');
  }

  // ---- VALIDATE: password ----
  // password must be a string AND at least 8 characters long
  if (typeof data.password !== 'string' || data.password.length < 8) {
    errors.push('Password must be at least 8 characters');
  }

  // ---- VALIDATE: role (optional field) ----
  // If role is provided, it must be one of these three values
  // If role is NOT provided (undefined), we default to 'user'
  const allowedRoles = ['admin', 'editor', 'user'];

  // The ?? operator: if data.role is null or undefined, use 'user' as default
  const role = data.role ?? 'user';

  if (!allowedRoles.includes(role)) {
    errors.push('Role must be admin, editor, or user');
  }

  // ---- RETURN RESULT ----
  // If there are any errors, return the invalid response
  if (errors.length > 0) {
    return { valid: false, errors: errors };
  }

  // If no errors, return the cleaned, valid user data
  // We build a new object — we do NOT mutate the original data object (pure function)
  return {
    valid: true,
    user: {
      name: data.name.trim(),       // remove extra spaces from name
      email: data.email,
      age: ageAsNumber,             // store the coerced NUMBER, not the original string
      password: data.password,
      role: role                    // use the defaulted role
    }
  };
}


// ============================================================
// TEST CASES
// ============================================================

console.log('--- Test 1: Valid user, age as string "25" ---');
console.log(validateUser({ name: 'Ali', email: 'ali@test.com', age: '25', password: 'pass1234' }));
// Expected: { valid: true, user: { name:'Ali', email:'ali@test.com', age:25, password:'pass1234', role:'user' } }
// Note: age '25' (string) gets coerced to 25 (number)
// Note: role defaults to 'user' because it was not provided

console.log('\n--- Test 2: Multiple validation errors ---');
console.log(validateUser({ name: '', email: 'notanemail', age: 10, password: 'abc' }));
// Expected: { valid: false, errors: ['Name cannot be empty', 'Invalid email format', 'Age must be between 13 and 120', 'Password must be at least 8 characters'] }

console.log('\n--- Test 3: Valid user with admin role ---');
console.log(validateUser({ name: 'Sara', email: 'sara@x.io', age: 30, password: 'secure99', role: 'admin' }));
// Expected: { valid: true, user: { ...role: 'admin' } }

console.log('\n--- Test 4: Age as uncoercible string "17abc" ---');
console.log(validateUser({ name: 'X', email: 'x@x.com', age: '17abc', password: 'hello123' }));
// Expected: { valid: false, errors: ['Age must be a valid number'] }
// Number('17abc') returns NaN, so we catch it with isNaN()