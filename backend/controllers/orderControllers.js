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
  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
    return;
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
    });

    // Save the order to the database
    const createdOrder = await order.save();

    // Respond with a JSON indicating the created order
    res.status(201).json(createdOrder);
  }
});

//desc    Get order by ID
//route   GET /api/orders/:id
//access  Private
const getOrderById = asyncHandler(async (req, res) => {
  // Retrieve the order by ID and populate the 'user' field with 'name' and 'email'
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // Check if the order exists
  if (order) {
    res.json(order); // Send the order details as a JSON response
  } else {
    res.status(404); // If the order is not found, set a 404 status and throw an error
    throw new Error("Order not found");
  }
});

//desc    Update order to paid
//route   GET /api/orders/:id/pay
//access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//desc    Update order to delivered
//route   GET /api/orders/:id/deliver
//access  Private/Admin
const updateOrderToDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();

    res.json(updateOrder);
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
});

//desc    Get logged in user orders
//route   GET /api/orders/myorders
//access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate("user", "id name");
  res.json(orders);
});

export {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders,
};
