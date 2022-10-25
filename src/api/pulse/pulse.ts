import { Request, Response, Router } from "express";

export let router: Router = Router();

// Defined a simple endpoint for a "heart beat" check
router.route("/").get((_req: Request, res: Response) => {
  res.status(200).send("Hello World!");
});
