const MenuItem = require("../models/MenuItem");

const getMenuItems = async (req, res) => {
    try {
        const items = await MenuItem.find().sort({ createdAt: -1 });

        res.json(items);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch menu",
            error: error.message
        });
    }
};

const addMenuItem = async (req, res) => {
    try {
        const { name, description, price, category, image, available } = req.body;

        const item = await MenuItem.create({
            name,
            description,
            price,
            category,
            image,
            available
        });

        res.status(201).json({
            message: "Menu item added successfully",
            item
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to add menu item",
            error: error.message
        });
    }
};

const updateMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.json({
            message: "Menu item updated successfully",
            item
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update menu item",
            error: error.message
        });
    }
};

const deleteMenuItem = async (req, res) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id);

        if (!item) {
            return res.status(404).json({
                message: "Menu item not found"
            });
        }

        res.json({
            message: "Menu item deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete menu item",
            error: error.message
        });
    }
};

module.exports = {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
};