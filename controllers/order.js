import Order from "../models/order.js";

async function create(req, res) { 
    try{ 
        console.log(req.body)
    const order = await Order.create({ 
        customer: req.customer, 
        items: req.items, 
        restaurant: req.restaurant, 
        stats: req.status, 
        address: req.address,
    })
    console.log(order)
    res.status(201).json({ order });
    } catch(err) { 
        console.log(err)
    }
}

export default { create }