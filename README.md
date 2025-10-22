# NodeJS Cached Rövarspråk (monorepo)

Small Express API + backend lib. Two endpoints:

* `POST /add` → integer addition via backend lib.
* `POST /rovar` → Rövarspråket transform via backend lib.

## Structure

```
.
├── package.json
├── packages
│   ├── api
│   │   ├── package.json
│   │   └── src
│   │       ├── server.js
│   │       └── routes/
│   │           ├── index.js
│   │           ├── add.js
│   │           └── rovar.js
│   └── backend
│       ├── package.json
│       └── src
│           ├── add.js
│           ├── index.js    // exports { add, rovarspraket }
│           └── rovarspraket.js
```

## Prereqs

* Node ≥18 (LTS recommended)
* npm ≥8

## Install

From repo root:

```
npm install
```

If your root isn’t configured as a workspace, install per package:

```
cd packages/backend && npm install
cd ../api && npm install
```

## Run API

From repo root:

```
npm -w @acme/api start
```

or:

```
cd packages/api && npm start
```

Env:

```
PORT=8081 HOST=127.0.0.1 npm -w @acme/api start
```

Default: `http://127.0.0.1:8081`.

## Endpoints

### POST /add

* Body: `{ "a": <number>, "b": <number> }`
* 200: `{ "result": <number> }`
* 400: `{ "error": "<message>" }`

`curl`:

```
curl -sS -X POST http://127.0.0.1:8081/add \
  -H 'content-type: application/json' \
  -d '{"a":2,"b":3}'
```

### POST /rovar

Transforms text to Rövarspråket.

* Body: `{ "text": "<string>" }`
* 200: `{ "result": "<string>" }`
* 400: `{ "error": "<message>" }`

`curl`:

```
curl -sS -X POST http://127.0.0.1:8081/rovar \
  -H 'content-type: application/json' \
  -d '{"text":"hej på dig"}'
```

## Backend API (library)

`@acme/backend/src/index.js` exports:

```js
const add = require('./add');
const rovarspraket = require('./rovarspraket');
module.exports = { add, rovarspraket };
```

Usage:

```js
const { add, rovarspraket } = require('@acme/backend');
add(2,3);              // 5
rovarspraket('hej');   // hhojej
```

## Development

* Route handlers live in `packages/api/src/routes/*`. Add new endpoints by:

  1. creating a router file in `routes/`,
  2. mounting it in `routes/index.js`.
* Keep `server.js` minimal (JSON parsing, routing, errors).
* Domain logic stays in `packages/backend/src/*` (pure, testable).

## Testing

* Backend tests: `packages/backend/test/*.tests.js`.
* Run with your preferred runner. Example (Node ≥20, using node:test):

```
node --test packages/backend/test
```

or configure a test script in `packages/backend/package.json` (e.g., mocha, vitest).

## Error model

* Invalid input → `400 { error }`
* Unknown route → `404 { error: "Not Found" }` (add this to `server.js` if not present)
* Unhandled → `500 { error: "Server error" }`

## Conventions

* Consistent naming: file `rovarspraket.js`, export `rovarspraket`, route `/rovar`.
* Keep backend functions pure (no I/O).
* Add per-route logic in routers (e.g., validation/caching later).

## Roadmap (optional)

* Input validation middleware per route.
* Caching layer (e.g., Redis) for idempotent ops.
* Rate limiting.
* OpenAPI spec + schema validation.
* CI for tests + linting.

## License

TBD.
