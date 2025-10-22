# Repository dump

## Tree

```text
.
├── package.json
├── packages
│   ├── api
│   │   ├── package.json
│   │   └── src
│   │       └── server.js
│   └── backend
│       ├── package.json
│       ├── src
│       │   ├── add.js
│       │   ├── index.js
│       │   └── rovaspraket.js
│       └── test
│           ├── add.tests.js
│           └── rovarspraket.tests.js
└── repo_dump.md

7 directories, 10 files
```
## ./package.json

```json
{
    "name": "nodejs_cached_rovarsprak",
    "private": true,
    "workspaces": ["packages/*"]
  }
```

## ./packages/api/package.json

```json
{
    "name": "@acme/api",
    "version": "1.0.0",
    "main": "src/server.js",
    "type": "commonjs",
    "scripts": { "start": "node src/server.js" },
    "dependencies": {
      "express": "^5.1.0",
      "@acme/backend": "file:../backend"
    }
  }
```

## ./packages/api/src/server.js

```javascript
const express = require('express');
const { add } = require('@acme/backend');

const app = express();
app.use(express.json());

app.post('/add', (req, res) => {
  try {
    const { a, b } = req.body;
    res.json({ result: add(a, b) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

const PORT = process.env.PORT || 8081;
const HOST = process.env.HOST || '127.0.0.1';
app.listen(PORT, HOST, () => console.log(`API on http://${HOST}:${PORT}`));

```

## ./packages/backend/package.json

```json
{
    "name": "@acme/backend",
    "version": "1.0.0",
    "main": "src/index.js",
    "type": "commonjs",
    "scripts": { "test": "node --test" }
  }
  
```

## ./packages/backend/src/add.js

```javascript
function add(a, b) {
    if (typeof a !== "number" || typeof b !== "number") throw new TypeError("numbers only");
    return a + b;
  }
  module.exports = { add };
```

## ./packages/backend/src/index.js

```javascript
const { add } = require("./add");
const { toRovarspraket } = require("./rovaspraket");
module.exports = { add, toRovarspraket };
```

## ./packages/backend/src/rovaspraket.js

```javascript
function toRovarspraket(input) {
    if (input == null) return "";
    const vowels = "aeiouyåäöAEIOUYÅÄÖ";
    return String(input).replace(/[\p{L}]/gu, ch => {
      if (vowels.includes(ch)) return ch;
      const lower = ch.toLocaleLowerCase();
      const second = ch !== lower ? lower : ch;
      return ch + "o" + second;
    });
  }
  module.exports = { toRovarspraket };
```

## ./packages/backend/test/add.tests.js

```javascript
const test = require('node:test');
const assert = require('node:assert/strict');
const { add } = require('../src/index');

test('add', () => {
  assert.equal(add(2, 3), 5);
  assert.throws(() => add("2", 3), TypeError);
});

```

## ./packages/backend/test/rovarspraket.tests.js

```javascript
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

```

## ./repo_dump.md

```markdown

```

