// ============================================================
// C1 - E-Commerce Shopping Cart System
// Concepts: var/let/const · Pass by Reference · Deep Copy · Functions
// ============================================================


// ============================================================
// TASK 1: ORIGINAL BUGGY CODE — Predict and explain the output
// ============================================================

var cartA = { owner: 'Asad', items: [{ name: 'Laptop', price: 150000 }], total: 150000 };

// BUG HERE: cartB = cartA does NOT create a copy!
// This just makes cartB point to the EXACT SAME object in memory as cartA.
// They share the same reference. Whatever you do to cartB, cartA also changes.
var cartB = cartA;

// Tab 2 user adds an item
cartB.items.push({ name: 'Mouse', price: 2500 });
cartB.total = cartB.total + 2500;

console.log('--- BUGGY CODE OUTPUT ---');
console.log('Tab 1 cart items:', cartA.items.length);
// Output: 2  <-- BUG! Tab 1 should still have 1 item, but cartA === cartB

console.log('Tab 1 total:', cartA.total);
// Output: 152500  <-- BUG! Tab 1 total should still be 150000


// BUG in applyPromo function:
// The function directly modifies cart.total — this mutates the original object
// because objects are passed by reference in JavaScript.
function applyPromo(cart, discount) {
  cart.total = cart.total - discount; // BUG: directly mutates the original!
  cart.promoApplied = true;           // BUG: adds a property to the original!
  return cart;
}

const originalCart = { owner: 'Sara', items: ['Book'], total: 500 };
const discountedCart = applyPromo(originalCart, 50);

console.log('Original total:', originalCart.total);
// Output: 450  <-- BUG! originalCart.total should remain 500


// ============================================================
// TASK 2: Bug identification is written as comments above each bug line
// See comments marked with "BUG HERE" and "BUG:" throughout the code
// ============================================================


// ============================================================
// TASK 3: FIXED VERSION
// ============================================================

console.log('\n--- FIXED CODE OUTPUT ---');

// Fix 1: Use const instead of var (better practice)
// Fix 2: Use structuredClone to create a true DEEP copy of cartA
// structuredClone copies everything — including nested arrays and objects
const cartAFixed = { owner: 'Asad', items: [{ name: 'Laptop', price: 150000 }], total: 150000 };
const cartBFixed = structuredClone(cartAFixed); // DEEP copy — completely independent!

// Tab 2 user adds an item — now this ONLY changes cartBFixed
cartBFixed.items.push({ name: 'Mouse', price: 2500 });
cartBFixed.total = cartBFixed.total + 2500;

console.log('Tab 1 cart items:', cartAFixed.items.length); // 1 — correct! Tab 1 unchanged
console.log('Tab 1 total:', cartAFixed.total);             // 150000 — correct! Tab 1 unchanged
console.log('Tab 2 cart items:', cartBFixed.items.length); // 2 — Tab 2 has the new item
console.log('Tab 2 total:', cartBFixed.total);             // 152500 — Tab 2 has updated total


// Fix 3: applyPromo should NOT mutate the original
// Instead, return a brand new cart object with the discount applied
function applyPromoFixed(cart, discount) {
  // Use spread to create a new object
  // Override total with the discounted value
  return {
    ...cart,
    total: cart.total - discount,
    promoApplied: true
  };
}

const originalCartFixed = { owner: 'Sara', items: ['Book'], total: 500 };
const discountedCartFixed = applyPromoFixed(originalCartFixed, 50);

console.log('\noriginalCartFixed.total:', originalCartFixed.total);    // 500 — unchanged!
console.log('discountedCartFixed.total:', discountedCartFixed.total);  // 450 — discount applied!
console.log('discountedCartFixed.promoApplied:', discountedCartFixed.promoApplied); // true


// ============================================================
// TASK 4: addItem function — returns new cart, proves original unchanged
// ============================================================

function addItem(cart, item) {
  // Create a completely new cart object
  // Copy all properties from the original cart
  // Override 'items' with a new array that has the new item added
  // Update total by adding the item's price
  return {
    ...cart,
    items: [...cart.items, item],         // new array with new item
    total: cart.total + item.price        // updated total
  };
}

// Prove original is unchanged:
const baseCart = { owner: 'Asad', items: [{ name: 'Laptop', price: 150000 }], total: 150000 };

console.log('\n--- addItem test ---');
console.log('Before addItem — items count:', baseCart.items.length); // 1
console.log('Before addItem — total:', baseCart.total);              // 150000

const updatedCart = addItem(baseCart, { name: 'Mouse', price: 2500 });

console.log('After addItem — original items count:', baseCart.items.length); // 1 — unchanged!
console.log('After addItem — original total:', baseCart.total);              // 150000 — unchanged!
console.log('After addItem — new cart items count:', updatedCart.items.length); // 2
console.log('After addItem — new cart total:', updatedCart.total);              // 152500