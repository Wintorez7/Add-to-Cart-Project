const express = require("express");
const {
  addToCart,
  getCartItems,
  removeFromCart,
  checkout
} = require("../controller/cartController.js");

const router = express.Router();

router.post("/checkout", checkout);
router.post("/", addToCart);
router.get("/", getCartItems);
router.delete("/:id", removeFromCart);

module.exports = router;
