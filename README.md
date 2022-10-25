# Yelp Reviews API

## Motivation

This is the skills assessment project I was assigned as part
of the interview process with Crescendo Collective.


## Project Execution 

To run this application: 

1. Create a Yelp application and then place your `env` key inside `.env` at the project root directory
- [Yelp Fusion API Docs](https://www.yelp.com/developers/documentation/v3/get_started)
2. Then run the following
- `npm install`
- `npm run build`
- `npm run dev`
3. At this point you can reach the following endpoints

- `http://localhost:3000/`
- `http://localhost:3000/reviews/?search=<business here>&location=<town-name>`
- `http://localhost:3000/reviews/milwaukee_ale_house` 

Note: The third endpoint is what I used to explore the data that was retrieved from the Yelp API. Once I got a good understanding, then I wrote the endpoint that is second in this list to accomplish the task at hand. Lastly, the first one is to just test that the server is running. 

- More notes on development can be found [here](./documentation/dev_notes.md)