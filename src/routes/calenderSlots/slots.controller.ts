import { Request, Response } from "express";
const db = require("../../models/index");
import _ from "lodash";

class SessionController {
  async create(req: Request, res: Response) {
    try {
      const calenderSlots = req.body.calenderSlots;
      if (calenderSlots.length > 0) {
        let allSlotsCreated = true; // Flag to track if all slots are created
        calenderSlots.forEach(
          (slot: {
            experId: number;
            title: string;
            start: Date;
            end: Date;
            available: Boolean;
            selected: Boolean;
          }) => {
            const newSlot = {
              expertId: slot.experId,
              title: slot.title,
              start: slot.start,
              end: slot.end,
              available: slot.available,
              selected: slot.selected,
            };
            // Create the slot
            db.Slot.create(newSlot).catch((err: any) => {
              console.error("Error creating slot:", err);
              allSlotsCreated = false; // If any slot creation fails, set the flag to false
            });
          }
        );
        // Wait for all slot creation promises to resolve
        Promise.all(calenderSlots.map((slot: any) => db.Slot.create(slot)))
          .then(() => {
            if (allSlotsCreated) {
              res
                .status(200)
                .json({ message: "All slots created successfully" });
            } else {
              res.status(500).json({ message: "Failed to create some slots" });
            }
          })
          .catch((err: any) => {
            console.error("Error creating slots:", err);
            res.status(500).json({ message: "Internal server error" });
          });
      } else {
        res.status(400).json({ message: "No calendar slots provided" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async getSlotsByExpertId(req: Request, res: Response) {
    try {
      let { available } = req.query as any;
      if (available) {
        const slots = await db.Slot.findAll({
          where: {
            expertId: req.body.expertId,
            available: true,
          },
        });
        return res.status(200).json({ message: "success", slots });
      } else {
        const slots = await db.Slot.findAll({
          where: {
            expertId: req.body.expertId,
          },
        });
        return res.status(200).json({ message: "success", slots });
      }
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }

  async updateSlotByIdAndExpertId(req: Request, res: Response) {
    try {
      const slot = await db.Slot.findOne({
        where: {
          id: req.body.id,
          expertId: req.body.expertId,
        },
      });

      if (!slot) {
        return res.status(400).json({
          message: "Slot not found for the given expert ID and slot ID",
        });
      }

      await slot.set({
        title: req.body.title,
        start: req.body.start,
        end: req.body.end,
        available: req.body.available,
        selected: req.body.selected,
      });

      await slot
        .save()
        .then(async () => {
          const updatedSlot = await db.Slot.findOne({
            where: { id: req.body.id },
          });
          return res.status(200).json({
            message: "success",
            updatedSlot,
          });
        })
        .catch((err: any) => {
          return res.status(500).json({
            message: "slot update error",
            error: err,
          });
        });
    } catch (error) {
      return res.status(500).json({
        message: "an error occured",
        error,
      });
    }
  }
}

export default SessionController;
