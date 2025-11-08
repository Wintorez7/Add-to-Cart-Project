export async function fetchProducts(page = 1, limit = 8) {
  try {
    const skip = (page - 1) * limit;
    const res = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    if (!res.ok) throw new Error("Failed to fetch products");
    return res.json(); // returns { products, total, skip, limit }
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}
