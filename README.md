# Urbanesia API

Cities information API.

## API Specification

| Endpoints        | HTTP Method | Description                  | Status |
| ---------------- | ----------- | ---------------------------- | ------ |
| /cities          | GET         | Get all cities               | DONE   |
| /cities/:slug    | GET         | Get city by slug             | DONE   |
| /search?q=string | GET         | Search city by query         | TODO   |
| /cities          | POST        | Create city                  | TODO   |
| /cities          | DELETE      | Delete all cities            |        |
| /cities/:id      | DELETE      | Delete city by id            |        |
| /cities/:id      | PATCH       | Update city by id            |        |
| /cities/:id      | PUT         | Update city by id, or create |        |

## Development

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
