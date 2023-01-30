import express from "express";
const router = express.Router();
import restaurantCtrl from '../../controllers/restaurant.js'

import multer from "multer";
const upload = multer();

router.post("/", upload.single("photo"), restaurantCtrl.create);

export default router;