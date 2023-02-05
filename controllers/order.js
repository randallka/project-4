import Order from "../models/order.js";

async function create(req, res) {
  try {
    const order = await Order.create({
      customer: req.body.customer,
      items: req.body.items,
      restaurant: req.body.restaurant,
      status: req.body.status,
      address: req.body.address,
    });
    res.status(201).json({ order });
  } catch (err) {
    console.log(err);
  }
}

async function customerOrders(req, res) {
  try {
    const allOrders = await Order.find({});
    const orders = await Order.find({ customer: req.params.id })
      .populate("restaurant")
      .populate("items")
      .populate("customer")
      .sort({'createdAt': 'desc'})
      .exec();
    res.status(201).json({ orders });
  } catch (err) {
    console.log(err);
  }
}

async function restaurantOrders(req, res) {
  try {
    const orders = await Order.find({ restaurant: req.params.id })
      .populate("customer")
      .populate("items")
      .populate("restaurant")
      .sort({ createdAt: "desc" })
      .exec();
    res.status(201).json({ orders });
  } catch (err) {
    console.log(err);
  }
}

async function completeOrder(req, res) {
  try {
    const id = req.params.id
    const order = await Order.findById(id).populate('items').populate('restaurant').exec()
    order.status = true
    order.save()
    res.status(201).json({ order });
  } catch(err) {
    console.log(err)
  }
}

export default { create, customerOrders, restaurantOrders, completeOrder };
