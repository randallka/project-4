import Item from "../models/item.js";
import Restaurant from "../models/restaurant.js";
import restaurantCtrl from './restaurant.js'
import S3 from "aws-sdk/clients/s3.js";
const s3 = new S3();
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.BUCKET_NAME;

function create(req, res) {
  console.log(req.user, " <- req.user", req.body, req.file);

  if (!req.file) return res.status(400).json({ err: "No file was submitted" });

  const key = `project-4/items/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log("========================");
    console.log(err, " err from aws");
    console.log("========================");
    console.log(data.Location)
    if (err)
      return res.status(400).json({ err: "Check terminal error from aws" });

    try {
      const item = await Item.create({
        name: req.body.name,
        restaurant: req.body.restaurant,
        price: req.body.price,
        description: req.body.description,
        imageUrl: data.Location,
      });
      await restaurantCtrl.addToMenu(req.body.restaurant, item)


      res.status(201).json({ item });
    } catch (err) {
      res.status(400).json({ err });
    }
  });
}
export default {create};
