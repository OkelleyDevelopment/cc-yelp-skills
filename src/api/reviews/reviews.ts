import { Request, Response, Router } from "express";
import axios from "axios";

import { Review } from "./types";
import { UserData } from "./types";
import { process_reviews, reviewHandler } from "./review_handler";

// The router for our reviews endpoint
export let router: Router = Router();

// Endpoint to get our targeted resturaunts reviews
// and is more flexible for the various places people may search
router.route("/").get(reviewHandler)

// Below shows my investigation into the Yelp API
// Endpoint to get our targeted resturaunts reviews
//
// Note this route name *could* be a parameter passed in that is integrated with the URL
/// This was left to show how we explore the data retrived from our API source (with a known resturant)
router
  .route("/milwaukee_ale_house")
  .get(async (_req: Request, res: Response) => {
    // The request fails if we don't have this token
    // eject to save processsing another error
    if (process.env.API_TOKEN === undefined) {
      res.status(500).send("Contact maintainer");
      return;
    }

    // Constant url for the Ale House as we explore further
    const url: string =
      "https://api.yelp.com/v3/businesses/milwaukee-ale-house-milwaukee/reviews";
    // Config for the get request
    const config = {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    };
    
    let response = await axios
      .get(url, config)
      .then((response) => {
        // Once we have the data, process it
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        res.status(error.response.status).send({
          status: error.response.status,
          message: "Failed to retrieve reviews",
        }); // Good enough for now, should be more descriptive
      });

    let processed: Review[] = process_reviews(response.reviews);

    res.status(200).send({ processed_reviews: processed });
  });


