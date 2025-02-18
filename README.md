# Urbanesia API

Cities information API

## API Specifications

| Endpoints               | HTTP Method | Description                  | Status |
| ----------------------- | ----------- | ---------------------------- | ------ |
| /cities                 | GET         | Get all cities               | Done   |
| /cities/:id             | GET         | Get city by id               | Done   |
| /cities/:slug           | GET         | Get city by id               | Done   |
| /cities/search?q=string | GET         | Search city by query         | Done   |
| /cities                 | POST        | Create city                  | Done   |
| /cities/:id             | DELETE      | Delete city by id            |        |
| /cities                 | DELETE      | Delete all cities            |        |
| /cities/:id             | PATCH       | Update city by id            |        |
| /cities/:id             | PUT         | Update city by id, or create |        |

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

open http://localhost:3000
