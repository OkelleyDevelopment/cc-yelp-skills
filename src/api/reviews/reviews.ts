import { Request, Response, Router } from "express";
import axios from "axios";

import { Review, VisionResults } from "./types";
import { UserData } from "./types";

// The router for our reviews endpoint
export let router: Router = Router();

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

    // Constant url for the Ale House
    const url: string =
      "https://api.yelp.com/v3/businesses/milwaukee-ale-house-milwaukee/reviews";
    // Config for the get request
    const config = {
      headers: { Authorization: `Bearer ${process.env.API_TOKEN}` },
    };

    //console.log(config)
    let response = await axios
      .get(url, config)
      .then((response) => {
        // Once we have the data, process it
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        res
          .status(error.response.status)
          .send({
            status: error.response.status,
            message: "Failed to retrieve reviews",
          }); // Good enough for now, could be more descriptive
      });

    let processed: Review[] = process_reviews(response.reviews);

    res.status(200).send({ processed_reviews: processed });
  });

// Endpoint to get our targeted resturaunts reviews

router.route("/").get(async (req: Request, res: Response) => {
  // The request fails if we don't have this token
  // eject to save processsing another error
  if (process.env.API_TOKEN === undefined) {
    res.status(500).send("Contact maintainer");
    return;
  }

  // Get our query parameters
  const business = req.query.business;
  const location = req.query.location;
  let vision_api: String = req.query.vision || ""; // bool

  if (business == "" || location == "") {
    res
      .status(400)
      .send("Please search for reviews with a business and location specified");
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
      res
        .status(error.response.status)
        .send({
          status: error.response.status,
          message: "Failed to retrieve reviews",
        });
    });

  // Get our processed reviews
  let processed: Review[] = process_reviews(response.reviews);

  // If true, processs for the right data
  if (vision_api.toLowerCase() === "true") {
    processed = await process_vision(processed);
  }

  res.status(status).send({ processed_reviews: processed });
});


// A
async function process_vision(reviews) {
  let payload: Review[] = [];

  const vision = require("@google-cloud/vision");

  let cred = process.env.GOOGLE_API_KEY
  const client = new vision.ImageAnnotatorClient(cred);

  reviews.forEach(async (r) => {
    const [result] = await client.faceDetection(`${r.user.image_url}`);
    const faces = result.faceAnnotations;
    
    console.log("Faces:");
    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`);
      console.log(`    Joy: ${face.joyLikelihood}`);
      console.log(`    Anger: ${face.angerLikelihood}`);
      console.log(`    Sorrow: ${face.sorrowLikelihood}`);
      console.log(`    Surprise: ${face.surpriseLikelihood}`);
    
    let results: VisionResults = {
        joy: faces.joyLikelihood,
        anger: faces.angerLikelihood,
        sorrow: faces.sorrowLikelihood,
        surprise: faces.surpriseLikelihood,
    }

    r.user.vision_results.push(results)
    });
  });

  return payload;
}

// Helper function to process our JSON response into a Review array
function process_reviews(reviews: any): Review[] {
  let payload: Review[] = []; // our list

  // For each review create a user and review object
  // leaving off the review URL essentially
  reviews.forEach((r) => {
    let user: UserData = {
      id: r.user.id,
      name: r.user.name,
      profile_url: r.user.profile_url,
      image_url: r.user.image_url,
      vision_results: []
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
