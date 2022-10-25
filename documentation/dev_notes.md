# Requirements

- Goal: Build an API end point to retrieve the reviews of a particular resturaunt and return JSON

- Stretch goal: Google vision API (will need to read further)

## Basic outline

- Simple express server (what I've most recently used)

Will need to install:

- Cors
- helmet
- typescript
- nodemon
- supertest/ jest (potentially)
- the various types (@types/node, @types/express, etc)

## API Endpoints

### Pulse

**Route**: `http://localhost:3000/`
**Returns**: - status: 200 - text: "Hello World"

### Data Exploration Endpoint

**Route**: `http://localhost:3000/reviews/milwaukee_ale_house`

**Returns**: - JSON of the list of processsed reviews - OR an error code with an empty array

### Reviews Endpoint (Meant to be more flexible)

**ROUTE**: `http://localhost:3000/reviews/?business=<>&?location=?`

**Returns**: - JSON of the list of processsed reviews - OR an error code with an empty array

Example: `http://localhost:3000/reviews/?business=speedys-pizza&location=sylva`
