const express = require("express");

const {
    getMenuItems,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", getMenuItems);
router.post("/", addMenuItem);
router.put("/:id", updateMenuItem);
router.delete("/:id", deleteMenuItem);

module.exports = router;