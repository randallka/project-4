import express from "express";
const router = express.Router();
import cartCtrl from "../../controllers/cart.js";

router.get('/:id', cartCtrl.getCart)
router.put("/:id", cartCtrl.removeItem);
router.post('/', cartCtrl.addToCart)


export default router;
