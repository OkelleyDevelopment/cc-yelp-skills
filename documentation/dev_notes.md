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

- [Yelp API docs](https://www.yelp.com/developers/documentation/v3/business_reviews)

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


## Implementing the Google API

- Need an API key
- `npm install @google/vision`
- [Authentication with API keys Docs](https://cloud.google.com/docs/authentication/api-keys#gcloud)
- [Cloud Vision API Docs for detecting faces](https://cloud.google.com/vision/docs/detecting-faces)


While I did manage to setup the scaffolding for what I believe is needed for the Google API to work, I did not have enough time in the 3 hours 
alloted to continue to research through the google documentation to continue that investigation. However, I have linked to the resources above 
that I was looking through, and there is a second branch called `add-vision` which shows where we got to in the process before eventually stopping to add a few unit tests
and document the journey up to this point!