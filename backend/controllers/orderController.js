const Order = require("../models/Order");

const createOrder = async (req, res) => {
    try {
        const { user, items, totalAmount, pickupTime } = req.body;

        const order = await Order.create({
            user,
            items,
            totalAmount,
            pickupTime
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to place order",
            error: error.message
        });
    }
};

const getOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("items.menuItem", "name price")
            .sort({ createdAt: -1 });

        res.json(orders);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch orders",
            error: error.message
        });
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        res.json({
            message: "Order status updated successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update order status",
            error: error.message
        });
    }
};

module.exports = {
    createOrder,
    getOrders,
    updateOrderStatus
};