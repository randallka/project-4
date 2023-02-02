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
  console.log("customer order ctrl");
  try {
    console.log(req.params.id);
    const allOrders = await Order.find({});
    console.log(allOrders, "all orders");
    const orders = await Order.find({ customer: req.params.id })
      .populate("restaurant")
      .populate("items")
      .exec();
    console.log(orders, "customer orders");
    res.status(201).json({ orders });
  } catch (err) {
    console.log(err);
  }
}

async function restaurantOrders(req, res) {
  console.log("restaurant order ctrl");
  try {
    const orders = await Order.find({ restaurant: req.params.id })
      .populate("customer")
      .populate('items')
      .exec();
    console.log(orders);
    res.status(201).json({ orders });
  } catch (err) {
    console.log(err);
  }
}

async function completeOrder(req, res) {
  try {
    const id = req.params.id
    const order = await Order.findByIdAndUpdate(
      {id},
      { status: true },
      function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Updated Order : ", result);
        }
      }
    );
    order.save()
    res.status(201).json({ order });
  } catch {}
}

export default { create, customerOrders, restaurantOrders, completeOrder };
