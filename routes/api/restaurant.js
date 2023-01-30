import express from "express";
const router = express.Router();
import restaurantCtrl from '../../controllers/restaurant.js'

import multer from "multer";
const upload = multer();

router.post("/", upload.single("photo"), restaurantCtrl.create);
router.get("/owner/:ownerId", restaurantCtrl.findByOwner)
router.put("/:restaurantId", restaurantCtrl.edit);
export default router;