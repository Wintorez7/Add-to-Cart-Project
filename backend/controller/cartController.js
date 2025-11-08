const Cart = require("../model/Cart");

// 🛒 ADD TO CART
const addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;

    if (!userId || !productId || !quantity)
      return res.status(400).json({ message: "Missing required fields" });

    // ✅ Fetch product from DummyJSON (external API)
    const response = await fetch(`https://dummyjson.com/products/${productId}`);
    const product = await response.json();

    if (!product || product.message === "Product not found")
      return res.status(404).json({ message: "Product not found" });

    // ✅ Check if product already in user's cart
    const existingItem = await Cart.findOne({ userId, productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json({
        message: "Product quantity updated in cart",
        cartItem: existingItem,
      });
    }

    // ✅ Create a new cart entry
    const newCartItem = new Cart({
      userId,
      productId: Number(productId),
      quantity,
    });

    await newCartItem.save();
    res
      .status(201)
      .json({ message: "Product added to cart successfully", cartItem: newCartItem });
  } catch (error) {
    console.error("❌ Error adding to cart:", error.message);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

// 🧾 GET CART ITEMS (with live product info)
const getCartItems = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId)
      return res.status(400).json({ message: "userId is required" });

    const cartItems = await Cart.find({ userId });

    if (!cartItems.length)
      return res.status(200).json([]);

    // ✅ Fetch each product from DummyJSON
    const detailedCart = await Promise.all(
      cartItems.map(async (item) => {
        const response = await fetch(`https://dummyjson.com/products/${item.productId}`);
        const product = await response.json();

        return {
          _id: item._id,
          quantity: item.quantity,
          productId: item.productId,
          userId: item.userId,
          product, // full product details
        };
      })
    );

    res.status(200).json(detailedCart);
  } catch (error) {
    console.error("❌ Error fetching cart:", error.message);
    res.status(500).json({ message: "Failed to fetch cart" });
  }
};

// ❌ REMOVE ITEM FROM CART
const removeFromCart = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const deletedItem = await Cart.findByIdAndDelete(cartItemId);

    if (!deletedItem)
      return res.status(404).json({ message: "Cart item not found" });

    res.status(200).json({ message: "Item removed from cart successfully" });
  } catch (error) {
    console.error("❌ Error removing item:", error.message);
    res.status(500).json({ message: "Failed to remove item" });
  }
};

// 💳 MOCK CHECKOUT
const checkout = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId)
      return res.status(400).json({ message: "userId is required" });

    const cartItems = await Cart.find({ userId });
    if (!cartItems.length)
      return res.status(400).json({ message: "Cart is empty" });

    // Fetch live product prices
    const detailedCart = await Promise.all(
      cartItems.map(async (item) => {
        const response = await fetch(`https://dummyjson.com/products/${item.productId}`);
        const product = await response.json();
        return { ...item.toObject(), product };
      })
    );

    const total = detailedCart.reduce(
      (sum, item) => sum + (item.product.price || 0) * item.quantity,
      0
    );

    const receipt = {
      userId,
      total,
      timestamp: new Date().toISOString(),
      items: detailedCart.map((i) => ({
        title: i.product.title,
        price: i.product.price,
        quantity: i.quantity,
      })),
    };

    await Cart.deleteMany({ userId });

    res.status(200).json({ message: "Checkout successful", receipt });
  } catch (error) {
    console.error("❌ Error during checkout:", error.message);
    res.status(500).json({ message: "Checkout failed" });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  checkout,
};
