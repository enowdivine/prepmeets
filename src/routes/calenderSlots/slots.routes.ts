import express, { Router } from "express";
import SlotsCTL from "./slots.controller";
import verifyToken from "../../middleware/auth/verifyToken";

const router: Router = express.Router();
const slot = new SlotsCTL();

router.post("/create", verifyToken, slot.create);
router.get("/get-slots-by-expert-id", verifyToken, slot.getSlotsByExpertId);
router.put("/update", verifyToken, slot.updateSlotByIdAndExpertId);

export default router;
