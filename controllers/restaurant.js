import Restaurant from "../models/restaurant.js";
import Item from "../models/item.js";
import S3 from "aws-sdk/clients/s3.js";
const s3 = new S3(); 
import { v4 as uuidv4 } from "uuid";

const BUCKET_NAME = process.env.BUCKET_NAME;

async function addToMenu(restaurantId, item) { 
    try { 
    const restaurant = await Restaurant.findById(restaurantId)
    restaurant.menu.push(item._id)
    restaurant.save()
    } catch(err){ 
        console.log(err)
    }

}
function create(req, res) {

  if (!req.file) return res.status(400).json({ err: "No file was submitted" });

  
  const key = `project-4/logos/${uuidv4()}-${req.file.originalname}`;
  const params = { Bucket: BUCKET_NAME, Key: key, Body: req.file.buffer };
 
  s3.upload(params, async function (err, data) {
    console.log("========================");
    console.log(err, " err from aws");
    console.log("========================");
    if (err)
      return res.status(400).json({ err: "Check terminal error from aws" });

    try {
      
      const restaurant = await Restaurant.create({
        menu: [],
        name: req.body.name,
        owner: req.user._id,
        address: req.body.address,
        description: req.body.description,
        logoUrl: data.Location, 
      });

      await restaurant.populate("owner");
      
      res.status(201).json({ restaurant });
    } catch (err) {
      res.status(400).json({ err });
    }
  }); 
}

async function findByOwner(req, res) { 
    try{ 
        const restaurant = await Restaurant.find({ owner: req.params.ownerId }).populate('menu').exec();
        res.status(200).json({ data: restaurant });
    } catch(err) { 
        console.log(err)
    }
}
async function index(req, res) {
 try {
   const restaurants = await Restaurant.find({}).exec(); 
   res.status(200).json({ data: restaurants });
 } catch (err) {
   res.status(400).json({ err });
 }
}

async function edit(req, res) {
    try{ 
let update = await Restaurant.findByIdAndUpdate(req.params.restaurantId, { 
        name: req.body.name, 
        address: req.body.address, 
        description: req.body.description,
    }, {new : true})
    res.status(200).json({ data: update });
    } catch (err) { 
        console.log(err)
    }
   
    
}


export default {
  create,
  index,
  findByOwner, 
  edit, 
  addToMenu
};
