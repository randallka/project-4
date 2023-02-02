import express from "express";
const router = express.Router();
import orderCtrl from "../../controllers/order.js";

router.post('/', orderCtrl.create)
router.get("/restaurant/:id", orderCtrl.restaurantOrders);
router.get("/user/:id", orderCtrl.customerOrders);
router.put("/order/:id", orderCtrl.completeOrder);

export default router;
