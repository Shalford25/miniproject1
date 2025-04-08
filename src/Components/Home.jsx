import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]), [hoveredProduct, setHoveredProduct] = useState(null), [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) fetch(`https://exp-server-mini-proj2.vercel.app/users/isAdmin/${username}`).then((res) => res.json()).then((data) => setIsAdmin(data.isAdmin)).catch((err) => console.error("Error checking admin status:", err));
  }, []);

  useEffect(() => {
    fetch("https://exp-server-mini-proj2.vercel.app/shop")
      .then((res) => res.json())
      .then((data) => setProducts(data.rows.map((p) => ({ ...p, price: parseFloat(p.price) || 0 }))))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addProduct = () => {
    const product_name = prompt("Enter product name:"), price = parseFloat(prompt("Enter price:")), stock_quantity = parseInt(prompt("Enter stock quantity:"), 10);
    if (!product_name || isNaN(price) || isNaN(stock_quantity)) return alert("Invalid input.");
    fetch("https://exp-server-mini-proj2.vercel.app/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name, price, stock_quantity }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((newProduct) => setProducts((prev) => [...prev, newProduct]))
      .catch((err) => console.error("Error adding product:", err));
  };

  const deleteProduct = (product_id) => {
    if (!window.confirm("Are you sure?")) return;
    fetch(`https://exp-server-mini-proj2.vercel.app/shop/deleterecord/${product_id}`, { method: "DELETE" })
      .then((res) => (res.ok ? setProducts((prev) => prev.filter((p) => p.product_id !== product_id)) : Promise.reject()))
      .catch((err) => console.error("Error deleting product:", err));
  };

  const updateProduct = (product) => {
    const product_name = prompt("Enter new name:", product.product_name), price = parseFloat(prompt("Enter new price:", product.price)), stock_quantity = parseInt(prompt("Enter new quantity:", product.stock_quantity), 10);
    if (!product_name || isNaN(price) || isNaN(stock_quantity)) return alert("Invalid input.");
    fetch(`https://exp-server-mini-proj2.vercel.app/shop/updaterecord/${product.product_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name, price, stock_quantity }),
    })
      .then((res) => (res.ok ? setProducts((prev) => prev.map((p) => (p.product_id === product.product_id ? { ...p, product_name, price, stock_quantity } : p))) : Promise.reject()))
      .catch((err) => console.error("Error updating product:", err));
  };

  return (
    <div className="row">
      <div className="column bg-amber-100 h-[120vh]">
        <h1 className="headertext">Products</h1>
        {isAdmin && <button className="border-2 bg-green-400 text-white px-4 py-2 mb-4" onClick={addProduct}>Add Product</button>}
        <ul>
          {products.map((product) => (
            <li key={product.product_id} onMouseEnter={() => setHoveredProduct(product)} className="cursor-pointer hover:text-blue-500">
              {product.product_name}
              {isAdmin && (
                <div>
                  <button className="border-2 bg-yellow-300 text-white px-2 py-1 ml-2" onClick={() => updateProduct(product)}>Update</button>
                  <button className="border-2 bg-red-700 text-white px-2 py-1 ml-2" onClick={() => deleteProduct(product.product_id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="column bg-gray-50 h-[120vh]">
        <h1 className="headertext">Product Details</h1>
        {hoveredProduct ? (
          <div>
            <p><strong>Product ID:</strong> {hoveredProduct.product_id}</p>
            <p><strong>Price:</strong> ${hoveredProduct.price.toFixed(2)}</p>
            <p><strong>Stock Quantity:</strong> {hoveredProduct.stock_quantity}</p>
            <p><strong>Created At:</strong> {new Date(hoveredProduct.created_at).toLocaleString()}</p>
          </div>
        ) : (
          <p>Hover over a product to see its details.</p>
        )}
      </div>
    </div>
  );
}