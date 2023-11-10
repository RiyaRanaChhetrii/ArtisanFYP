import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

//desc    Create new order
//route   POST /api/orders
//access  Private
const addOrderItems = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  // Check if there are no order items
  if(orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
    return
  } else {
     // Create a new Order instance with the provided data
    const order = new Order({
        orderItems,
        user: req.user._id, // Assuming user is attached to the request (private route)
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
    })

     // Save the order to the database
    const createdOrder = await order.save()

    // Respond with a JSON indicating the created order
    res.status(201).json(createdOrder)
  }

});

export { addOrderItems }
