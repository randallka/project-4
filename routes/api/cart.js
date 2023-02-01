import express from "express";
const router = express.Router();
import cartCtrl from "../../controllers/cart.js";

router.get('/:id', cartCtrl.getCart)
router.post('/', cartCtrl.addToCart)


export default router;
