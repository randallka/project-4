import Item from "../models/item.js";
import restaurantCtrl from "./restaurant.js";
import S3 from "aws-sdk/clients/s3.js";
const s3 = new S3();
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.BUCKET_NAME;

function create(req, res) {
  if (!req.file) return res.status(400).json({ err: "No file was submitted" });

  const key = `project-4/items/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };

  s3.upload(params, async function (err, data) {
    console.log(err, " err from aws");
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
      console.log(item)
      await restaurantCtrl.addToMenu(req.body.restaurant, item);
      res.status(201).json({ item });
    } catch (err) {
      res.status(400).json({ err });
    }
  });
}

async function deleteItem(req, res) {
  try {
    await Item.findByIdAndDelete(req.params.id);
    res.json({ data: "item deleted" });
  } catch (err) {
    console.log(err);
  }
}

async function edit(req, res) {
  try {
    let update = await Item.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      },
      { new: true }
    );
    res.status(200).json({ data: update });
  } catch (err) {
    console.log(err);
  }
}

export default { create, deleteItem, edit };
