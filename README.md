# Urbanesia API

Cities information API

Live at: <https://urbanesia-api.oktavianusrtasak.com>

## REST API Specifications

### User

Cities:

| Endpoints           | HTTP Method        | Description                         | Status |
| ------------------- | ------------------ | ----------------------------------- | ------ |
| /cities             | GET                | Get all cities                      | Done   |
| /cities/:identifier | GET                | Get city by identifier (id or slug) | Done   |
| /cities             | POST               | Create city                         | Done   |
| /cities/:id         | DELETE             | Delete city by id                   | Done   |
| /cities             | DELETE             | Delete all cities                   | Done   |
| /cities/:id         | PATCH              | Update city by id                   | Done   |
| /cities/:id         | PUT (PATCH & POST) | Update city by id, or create        | Done   |

Places:

| Endpoints           | HTTP Method | Description                          | Status |
| ------------------- | ----------- | ------------------------------------ | ------ |
| /places             | GET         | Get all places                       | Done   |
| /places/:identifier | GET         | Get place by identifier (id or slug) | Done   |
| /places             | POST        | Create place                         | Done   |
| /places/:id         | DELETE      | Delete place by id                   | Done   |
| /places             | DELETE      | Delete all places                    | Done   |
| /places/:id         | PATCH       | Update place by id                   | Done   |

Other features:

| Endpoints        | HTTP Method | Description                   | Status |
| ---------------- | ----------- | ----------------------------- | ------ |
| /search?q=string | GET         | Search city or place by query | Done   |

### Admin

| Endpoints                | HTTP Method | Description      | Status |
| ------------------------ | ----------- | ---------------- | ------ |
| /admin/cities/id/:id     | GET         | Get city by id   | Done   |
| /admin/cities/slug/:slug | GET         | Get city by slug | Done   |

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
