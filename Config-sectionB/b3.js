// ============================================================
// B3 - calculateDiscount Function (Operators + Conditions)
// ============================================================

// This function calculates the final price of a product
// after applying discounts based on user type and membership.
// Rules are applied in a specific order — read comments carefully.

function calculateDiscount(price, userType, isMember) {

  // --- RULE 1: Validate the price ---
  // typeof checks if price is not a number
  // isNaN checks if it is NaN (Not a Number)
  // We also reject prices of 0 or below (can't have zero or negative price)
  if (typeof price !== 'number' || isNaN(price) || price <= 0) {
    return 'Invalid price';
  }

  // Start with the original price
  // We use 'let' here because we will be changing this value step by step
  let finalPrice = price;

  // --- RULE 2: Admin always gets 50% off ---
  // This is checked FIRST before any other price-based rule
  if (userType === 'admin') {
    finalPrice = finalPrice * 0.50; // 50% off means we keep only 50%

  // --- RULE 3: Price > 1000 gets 20% off ---
  } else if (price > 1000) {
    finalPrice = finalPrice * 0.80; // 20% off means we keep 80%

  // --- RULE 4: Price > 500 gets 10% off ---
  } else if (price > 500) {
    finalPrice = finalPrice * 0.90; // 10% off means we keep 90%
  }

  // --- RULE 5: Members get an extra 5% off (applied AFTER above discounts) ---
  // This applies to everyone who is a member, regardless of userType
  if (isMember === true) {
    finalPrice = finalPrice * 0.95; // extra 5% off
  }

  // --- RULE 6: Final price must never go below 1 ---
  // Math.max picks the larger of the two values
  // So if finalPrice is 0.50, Math.max(0.50, 1) gives us 1
  finalPrice = Math.max(finalPrice, 1);

  // --- RULE 7: Round to 2 decimal places ---
  // toFixed(2) returns a string like "912.00"
  // We wrap it with Number() to keep it as a number
  finalPrice = Number(finalPrice.toFixed(2));

  return finalPrice;
}


// ============================================================
// TEST CASES
// ============================================================

console.log('--- Test 1: price=1200, user, not a member ---');
console.log(calculateDiscount(1200, 'user', false));
// price > 1000 => 20% off => 1200 * 0.80 = 960
// No member discount
// Result: 960

console.log('\n--- Test 2: price=1200, user, member ---');
console.log(calculateDiscount(1200, 'user', true));
// price > 1000 => 20% off => 1200 * 0.80 = 960
// Member discount: 960 * 0.95 = 912
// Result: 912

console.log('\n--- Test 3: price=600, admin, member ---');
console.log(calculateDiscount(600, 'admin', true));
// Admin => 50% off => 600 * 0.50 = 300
// Member discount: 300 * 0.95 = 285
// Result: 285

console.log('\n--- Test 4: price=-50, user, not a member ---');
console.log(calculateDiscount(-50, 'user', false));
// price <= 0 => 'Invalid price'
// Result: 'Invalid price'

console.log('\n--- Test 5: price="abc", user, not a member ---');
console.log(calculateDiscount('abc', 'user', false));
// typeof 'abc' is 'string', not 'number' => 'Invalid price'
// Result: 'Invalid price'