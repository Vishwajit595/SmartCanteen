const express = require("express");

const {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

const router = express.Router();

// Students can view menu
router.get(
    "/",
    getMenuItems
);

// Only Admin can add menu items
router.post(
    "/",
    protect,
    adminOnly,
    addMenuItem
);

// Only Admin can update menu items
router.put(
    "/:id",
    protect,
    adminOnly,
    updateMenuItem
);

// Only Admin can delete menu items
router.delete(
    "/:id",
    protect,
    adminOnly,
    deleteMenuItem
);

module.exports = router;