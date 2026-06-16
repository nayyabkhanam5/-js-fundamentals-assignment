// ============================================================
// B5 - Pure Functions Library (Immutability + Functions)
// ============================================================

// A PURE FUNCTION:
// 1. Never modifies its input (no mutation)
// 2. Always returns a new value
// 3. Given the same input, always gives the same output
// 4. No side effects (no console.log, no changing variables outside)


// ============================================================
// FUNCTION 1: addToCart(cart, item)
// ============================================================
// Takes a cart (array of strings) and an item (string)
// Returns a NEW array with the item added
// The original cart is NOT changed

function addToCart(cart, item) {
  // spread operator [...cart] creates a brand new array
  // then we add the new item at the end
  return [...cart, item];
}

// Test:
const myCart = ['milk', 'eggs'];
const newCart = addToCart(myCart, 'bread');

console.log('--- addToCart ---');
console.log('New cart:', newCart);   // ['milk', 'eggs', 'bread']
console.log('Original cart:', myCart); // ['milk', 'eggs'] — unchanged!


// ============================================================
// FUNCTION 2: updateUserAge(user, newAge)
// ============================================================
// Takes a user object and a new age number
// Returns a NEW user object with the updated age
// The original user object is NOT changed

function updateUserAge(user, newAge) {
  // spread copies all properties from user,
  // then we override just the 'age' property with newAge
  return { ...user, age: newAge };
}

// Test:
const originalUser = { name: 'Ali', age: 25 };
const updatedUser = updateUserAge(originalUser, 26);

console.log('\n--- updateUserAge ---');
console.log('Updated user:', updatedUser);        // { name: 'Ali', age: 26 }
console.log('Original user age:', originalUser.age); // 25 — unchanged!


// ============================================================
// FUNCTION 3: incrementScore(scores, playerName)
// ============================================================
// Takes a scores object and a player's name
// Returns a NEW scores object with that player's score increased by 1
// The original scores object is NOT changed

function incrementScore(scores, playerName) {
  // spread copies all scores,
  // then we override just the one player's score with their current score + 1
  return {
    ...scores,
    [playerName]: scores[playerName] + 1  // [playerName] is a dynamic key
  };
}

// Test:
const originalScores = { Ali: 5, Sara: 3 };
const newScores = incrementScore(originalScores, 'Ali');

console.log('\n--- incrementScore ---');
console.log('New scores:', newScores);           // { Ali: 6, Sara: 3 }
console.log('Original Ali score:', originalScores.Ali); // 5 — unchanged!


// ============================================================
// FUNCTION 4: reverseString(str)
// ============================================================
// Returns the reversed version of a string
// Strings are IMMUTABLE in JavaScript — you cannot change them directly.
// Any string method always returns a NEW string, never modifies the original.
// So strings are already "safe" — this function is naturally pure.

function reverseString(str) {
  // split('') breaks the string into an array of characters: ['h','e','l','l','o']
  // reverse() reverses the array: ['o','l','l','e','h']
  // join('') joins it back into a string: 'olleh'
  return str.split('').reverse().join('');
}

// Test:
const original = 'hello';
const reversed = reverseString(original);

console.log('\n--- reverseString ---');
console.log('Reversed:', reversed);   // 'olleh'
console.log('Original:', original);   // 'hello' — strings are immutable, always safe!


// ============================================================
// FUNCTION 5: removeItem(arr, index)
// ============================================================
// Takes an array and an index number
// Returns a NEW array with the item at that index removed
// The original array is NOT changed

function removeItem(arr, index) {
  // filter() creates a new array keeping only items that pass the test
  // We keep all items EXCEPT the one at the given index
  // The second argument to the callback, i, is the current index
  return arr.filter(function(item, i) {
    return i !== index; // keep item only if its index is NOT the one to remove
  });
}

// Test:
const originalArr = [1, 2, 3, 4];
const newArr = removeItem(originalArr, 1); // remove index 1 (value: 2)

console.log('\n--- removeItem ---');
console.log('New array:', newArr);       // [1, 3, 4]
console.log('Original array:', originalArr); // [1, 2, 3, 4] — unchanged!