import { Request, Response } from "express";
import Rating from "./rating.model";
import expertModel from "../experts/expert.model";

class RatingController {
  async create(req: Request, res: Response) {
    try {
      const rating = new Rating({
        expertId: req.body.expertId,
        userId: req.body.userId,
        rating: req.body.rating,
        comment: req.body.comment,
      });
      await rating
        .save()
        .then(async () => {
          const expertRatings = await Rating.find({
            expertId: req.body.expertId,
          });

          // calculate rating
          if (expertRatings && expertRatings.length > 0) {
            let count = 0;
            expertRatings.forEach((item: any) => {
              return (count += item.rating);
            });
            const newRate =
              Math.round((count / expertRatings.length) * 10) / 10;
            // expert update
            const expert = await expertModel.updateOne(
              {
                _id: req.body.expertId,
              },
              {
                $set: {
                  rating: newRate,
                },
              }
            );
            if (expert.acknowledged) {
              res.status(201).json({
                message: "success",
              });
            }
          } else {
            res.status(400).json({
              message: "an error occured",
            });
          }
        })
        .catch((err) => {
          res.status(500).json({
            message: "error rating expert",
            error: err,
          });
        });
    } catch (error) {
      console.error("error rating expert", error);
    }
  }

  async ratings(req: Request, res: Response) {
    try {
      const ratings = await Rating.find({
        expertId: req.params.id,
      });
      if (ratings) {
        return res.status(200).json(ratings);
      } else {
        return res.status(404).json({
          message: "no ratings found",
        });
      }
    } catch (error) {
      console.error("error fetching ratings", error);
    }
  }
}

export default RatingController;
