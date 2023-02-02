import Order from "../models/order.js";

async function create(req, res) {
  try {
    console.log(req.body, "order req.body");
    const order = await Order.create({
      customer: req.body.customer,
      items: req.body.items,
      restaurant: req.body.restaurant,
      status: req.body.status,
      address: req.body.address,
    });
    console.log(order, "order in db");
    res.status(201).json({ order });
  } catch (err) {
    console.log(err);
  }
}

async function customerOrders(req, res) {
    console.log('customer order ctrl')
  try {
    console.log(req.params.id)
    const allOrders = await Order.find({})
    console.log(allOrders, "all orders")
    const orders = await Order.find({customer: req.params.id}).populate('restaurant', 'items').exec()
    console.log(orders, "customer orders")
  } catch (err) {
    console.log(err);
  }
}

async function restaurantOrders(req, res) {
    console.log("restaurant order ctrl");
  try {
    const orders = await Order.find({ restaurant: req.params.id })
      .populate("customer", "items")
      .exec();
      console.log(orders);
  } catch (err) {
    console.log(err);
  }
}

export default { create, customerOrders, restaurantOrders };
