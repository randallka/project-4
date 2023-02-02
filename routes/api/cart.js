import express from "express";
const router = express.Router();
import cartCtrl from "../../controllers/cart.js";

router.put("/:id/empty", cartCtrl.emptyCart);
router.get('/:id', cartCtrl.getCart)
router.put("/:id", cartCtrl.removeItem);
router.post('/', cartCtrl.addToCart)


export default router;
