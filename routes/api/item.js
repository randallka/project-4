import express from "express";
const router = express.Router();
import itemCtrl from "../../controllers/item.js";
import multer from "multer";
const upload = multer();

router.post("/", upload.single("photo"), itemCtrl.create);
router.put("/:id", itemCtrl.edit);
router.delete("/:id", itemCtrl.deleteItem)
export default router;