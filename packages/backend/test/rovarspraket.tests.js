const test = require('node:test');
const assert = require('node:assert/strict');
const { toRovarspraket } = require('../src/index');

test('toRovarspraket basic', () => {
  assert.equal(toRovarspraket("Filip"), "Fofilolipop");
});

test('toRovarspraket sentence', () => {
    assert.equal(toRovarspraket("Hej mitt namn är Filip, och jag är 31 år gammal!"), "Hohejoj momitottot nonamomnon äror Fofilolipop, ocochoh jojagog äror 31 åror gogamommomalol!");
  });

test('toRovarspraket handles null and coercion', () => {
  assert.equal(toRovarspraket(null), "");
  assert.equal(toRovarspraket(123), "123");
});
