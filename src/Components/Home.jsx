import { useState, useEffect } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null); // Store the currently hovered product

  // Fetch products from the server
  useEffect(() => {
    fetch("https://exp-server-mini-proj2.vercel.app/shop")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.rows); // Populate products from the response
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      });
  }, []);

  return (
    <div className="row">
      {/* Left Column: Product Names */}
      <div className="column bg-amber-100 h-[120vh]">
        <h1 className="headertext">Products</h1>
        <ul>
          {products.map((product) => (
            <li
              id="product-display"
              key={product.product_id}
              onMouseEnter={() => {
                setHoveredProduct(product); // Set the hovered product
                console.log("Hovered Product:", product);
              }}
              className="cursor-pointer hover:text-blue-500"
            >
              {product.product_name}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column: Product Details */}
      <div className="column bg-gray-50 h-[120vh]">
        <h1 className="headertext">Product Details</h1>
        {hoveredProduct ? (
          <div>
            <p><strong>Product ID:</strong> {hoveredProduct.product_id}</p>
            <p>
              <strong>Price:</strong> $
              {hoveredProduct.price != null ? hoveredProduct.price.toFixed(2) : "N/A"}
            </p>
            <p><strong>Stock Quantity:</strong> {hoveredProduct.stock_quality}</p>
            <p><strong>Created At:</strong> {new Date(hoveredProduct.created_at).toLocaleString()}</p>
          </div>
        ) : (
          <p>Hover over a product to see its details.</p>
        )}
      </div>
    </div>
  );
}