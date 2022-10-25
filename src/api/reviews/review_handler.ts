import express, {Response, Request} from 'express'
import axios from 'axios'
import { Review, UserData } from './types';

/**
 * 
 * @param req the requested business and location
 * @param res the response to the client
 * @returns A list of processed reviews or an error with message
 */
export async function reviewHandler(req: Request, res: Response) {
      // The request fails if we don't have this token
  // eject to save processsing another error
  if (
    process.env.API_TOKEN === undefined &&
    process.env.NODE_ENV !== "testing"
  ) {
    res.status(500).send("Contact maintainer");
    return;
  }

  // Get our query parameters
  const business = req.query.business;
  const location = req.query.location;
  let vision_api = req.query.vision || ""

  if (business === undefined || location === undefined) {
    res.status(400).send({
      message:
        "Please search for reviews with a business and location specified",
    });
    return;
  }

  // Preparing the information for the Axios GET request
  const url: string = `https://api.yelp.com/v3/businesses/${business}-${location}/reviews`;
  const config = {
    headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
  };

  let status: number;
  let response = await axios
    .get(url, config)
    .then((response) => {
      // Once we have the data, process it
      status = response.status;
      return response.data;
    })
    .catch((error) => {
      console.log(error);
      res.status(error.response.status).send({
        status: error.response.status,
        message: "Failed to retrieve reviews",
      }); // Good enough for now, could be more descriptive
    });

  // Get our processed reviews
  let processed: Review[] = process_reviews(response.reviews);
  // TODO: This would be a great spot to do the image processing
  // Will crate a branch incase the time allotment runs out
  if(vision_api.toLowerCase() === "true") {
    console.log(`Not implemented, but this would call the Google Vision API`)
  }

  res.status(status).send({ processed_reviews: processed });
}

/**
 * Helper function to process our JSON response into a Review array
 * @param reviews: the json list to process
 * @returns the processed list
 */
export function process_reviews(reviews: any): Review[] {
    let payload: Review[] = []; // our list
  
    // For each review create a user and review object
    // leaving off the review URL essentially
    reviews.forEach((r) => {
      let user: UserData = {
        id: r.user.id,
        name: r.user.name,
        profile_url: r.user.profile_url,
        image_url: r.user.image_url,
      };
      let review: Review = {
        user: user,
        id: r.id,
        text: r.text,
        rating: r.rating,
        time_created: r.time_created,
      };
      payload.push(review);
    });
  
    return payload;
  }