import express from "express";
const router = express.Router();
import orderCtrl from "../../controllers/order.js";

router.post('/', orderCtrl.create)
export default router;
