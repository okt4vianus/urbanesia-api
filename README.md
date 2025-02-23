# Urbanesia API

Cities information API

## REST API Specifications

### User

Cities:

| Endpoints     | HTTP Method        | Description                  | Status |
| ------------- | ------------------ | ---------------------------- | ------ |
| /cities       | GET                | Get all cities               | Done   |
| /cities/:slug | GET                | Get city by slug             | Done   |
| /cities       | POST               | Create city                  | Done   |
| /cities/:id   | DELETE             | Delete city by id            | Done   |
| /cities       | DELETE             | Delete all cities            | Done   |
| /cities/:id   | PATCH              | Update city by id            | Done   |
| /cities/:id   | PUT (PATCH & POST) | Update city by id, or create | Done   |

Other features:

| Endpoints        | HTTP Method | Description          | Status |
| ---------------- | ----------- | -------------------- | ------ |
| /search?q=string | GET         | Search city by query | Done   |

### Admin

| Endpoints         | HTTP Method | Description    | Status |
| ----------------- | ----------- | -------------- | ------ |
| /admin/cities/:id | GET         | Get city by id | Done   |

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
