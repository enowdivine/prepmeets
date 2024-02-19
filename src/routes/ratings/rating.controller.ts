import { Request, Response } from "express";
const db = require("../../models/index");

class RatingController {
  async create(req: Request, res: Response) {
    try {
      const ratingData = {
        expertId: req.body.expertId,
        userId: req.body.userId,
        rating: req.body.rating,
        comment: req.body.comment,
      };
      await db.Rating.create(ratingData)
        .then(async () => {
          const expertRatings = await db.Rating.findAll({
            where: { expertId: req.body.expertId },
          });

          // calculate rating
          if (expertRatings && expertRatings.length > 0) {
            let count = 0;
            expertRatings.forEach((item: any) => {
              return (count += item.dataValues.rating);
            });
            const newRate =
              Math.round((count / expertRatings.length) * 10) / 10;

            // expert update
            const expert = await db.ExpertModel.findOne({
              where: { id: Number(req.body.expertId) },
            });
            expert?.set({ rating: newRate });
            expert?.save().then(() => {
              res.status(201).json({
                message: "success",
              });
            });
          } else {
            res.status(400).json({
              message: "error returning user ratings",
            });
          }
        })
        .catch((err: any) => {
          res.status(500).json({
            message: "error rating expert",
            error: err,
          });
        });
    } catch (error) {
      console.error("error rating expert", error);
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async ratings(req: Request, res: Response) {
    try {
      const ratings = await db.Rating.findAll({
        where: { expertId: req.params.id },
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
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default RatingController;
