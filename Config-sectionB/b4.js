// ============================================================
// B4 - Pass-by-Reference Bugs + Shallow Copy Fixes
// ============================================================


// ============================================================
// BUG 1: Cart Duplication Bug (Shallow Copy)
// ============================================================

// ORIGINAL BUGGY CODE:
const cart1 = { items: ['JS Book', 'React Book'], total: 150 };
const cart2 = { ...cart1 }; // spread operator creates a SHALLOW copy

// BUG EXPLANATION:
// The spread operator {...cart1} copies the top-level properties.
// BUT 'items' is an array (a non-primitive), so only the REFERENCE to that
// array is copied — not the actual array itself.
// Both cart1.items and cart2.items now point to the SAME array in memory!

cart2.items.push('Node Book');
console.log('Bug 1 - cart1.items:', cart1.items);
// Output: ['JS Book', 'React Book', 'Node Book']
// PROBLEM: We pushed to cart2.items but cart1.items also changed!
// This is the shallow copy bug.

// -------------------
// FIXED VERSION:
// We need to also make a copy of the nested array

const cart1Fixed = { items: ['JS Book', 'React Book'], total: 150 };

// Option 1: Copy the items array separately using spread
const cart2Fixed = { ...cart1Fixed, items: [...cart1Fixed.items] };

// Option 2 (even safer): Use structuredClone for a full deep copy
// const cart2Fixed = structuredClone(cart1Fixed);

cart2Fixed.items.push('Node Book');
console.log('\nFixed Bug 1:');
console.log('cart1Fixed.items:', cart1Fixed.items); // ['JS Book', 'React Book'] — unchanged!
console.log('cart2Fixed.items:', cart2Fixed.items); // ['JS Book', 'React Book', 'Node Book']


// ============================================================
// BUG 2: Function Mutating the Original Object
// ============================================================

// ORIGINAL BUGGY CODE:
function applyTax(order) {
  order.total = order.total * 1.17; // 17% tax applied
  return order;
}

const myOrder = { id: 1, total: 100 };
const taxedOrder = applyTax(myOrder);

console.log('\nBug 2 - myOrder.total:', myOrder.total);
// Output: 117
// PROBLEM: We passed myOrder to the function and the function MUTATED it.
// Objects are passed by reference in JavaScript.
// The function changed order.total, which is the SAME object as myOrder.
// So myOrder.total is now 117 even though we didn't want to change it.

// -------------------
// FIXED VERSION:
// Create a NEW object inside the function instead of modifying the original

function applyTaxFixed(order) {
  // Use spread to create a new object with all the same properties,
  // then override just the 'total' property with the new calculated value
  return { ...order, total: order.total * 1.17 };
}

const myOrderFixed = { id: 1, total: 100 };
const taxedOrderFixed = applyTaxFixed(myOrderFixed);

console.log('\nFixed Bug 2:');
console.log('myOrderFixed.total:', myOrderFixed.total);   // 100 — original unchanged!
console.log('taxedOrderFixed.total:', taxedOrderFixed.total); // 117 — new object has the tax


// ============================================================
// BUG 3: Config Reset That Doesn't Work
// ============================================================

// ORIGINAL BUGGY CODE:
const defaultConfig = { theme: 'dark', lang: 'en', nested: { fontSize: 14 } };

function resetConfig(config) {
  config = { ...defaultConfig }; // This does NOT work as expected!
  config.nested.fontSize = 14;
}

const appConfig = { theme: 'light', lang: 'ur', nested: { fontSize: 20 } };
resetConfig(appConfig);

console.log('\nBug 3 - appConfig.theme:', appConfig.theme);          // 'light' (not 'dark')
console.log('Bug 3 - appConfig.nested.fontSize:', appConfig.nested.fontSize); // 20 (not 14)

// BUG EXPLANATION (two bugs):
// Bug 3a: config = { ...defaultConfig } reassigns the LOCAL variable 'config'.
//   In JavaScript, function parameters are passed by value (the reference value).
//   Reassigning 'config' inside the function only changes the LOCAL copy.
//   It does NOT affect 'appConfig' outside the function. So theme stays 'light'.
//
// Bug 3b: Even if the shallow copy worked, config.nested is still a reference
//   to the SAME nested object. So config.nested.fontSize = 14 would affect
//   defaultConfig.nested too (shared reference).

// -------------------
// FIXED VERSION:
// The function should RETURN a new deep copy, and we assign it outside.

function resetConfigFixed() {
  // structuredClone creates a true deep copy — no shared references at all
  return structuredClone(defaultConfig);
}

// We assign the returned value to our variable (outside the function)
let appConfigFixed = { theme: 'light', lang: 'ur', nested: { fontSize: 20 } };
appConfigFixed = resetConfigFixed(); // replace with a fresh deep copy

console.log('\nFixed Bug 3:');
console.log('appConfigFixed.theme:', appConfigFixed.theme);          // 'dark' — reset worked!
console.log('appConfigFixed.nested.fontSize:', appConfigFixed.nested.fontSize); // 14 — reset worked!