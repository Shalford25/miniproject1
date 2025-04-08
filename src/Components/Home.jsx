import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null); // Store the currently hovered product
  const [isAdmin, setIsAdmin] = useState(false); // Check if the user is an admin

  // Check if the user is an admin
  useEffect(() => {
    const username = sessionStorage.getItem("username"); // Assuming the username is stored in sessionStorage
    if (username) {
      fetch(`https://exp-server-mini-proj2.vercel.app/users/isAdmin/${username}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.isAdmin) {
            setIsAdmin(true);
          }
        })
        .catch((error) => {
          console.error("Error checking admin status:", error);
        });
    }
  }, []);

  // Fetch products from the server
  useEffect(() => {
    fetch("https://exp-server-mini-proj2.vercel.app/shop")
      .then((response) => response.json())
      .then((data) => {
        const normalizedProducts = data.rows.map((product) => ({
          ...product,
          price: parseFloat(product.price) || 0, // Ensure price is a number
        }));
        setProducts(normalizedProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        alert("Failed to fetch products.");
      });
  }, []);

  const addProduct = () => {
    const product_name = prompt("Enter the product name:");
    const price = parseFloat(prompt("Enter the product price:"));
    const stock_quantity = parseInt(prompt("Enter the stock quantity:"), 10);

    if (!product_name || isNaN(price) || isNaN(stock_quantity)) {
      alert("Invalid input. Please provide valid product details.");
      return;
    }

    fetch("https://exp-server-mini-proj2.vercel.app/shop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name,
        price,
        stock_quantity,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product added successfully!");
          return response.json();
        } else {
          throw new Error("Failed to add product.");
        }
      })
      .then((newProduct) => {
        setProducts((prevProducts) => [...prevProducts, newProduct]);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
        alert("An error occurred while adding the product.");
      });
  };

  const deleteProduct = (product_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    fetch(`https://exp-server-mini-proj2.vercel.app/shop/deleterecord/${product_id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Product deleted successfully!");
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product_id !== product_id)
          );
        } else {
          throw new Error("Failed to delete product.");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("An error occurred while deleting the product.");
      });
  };

  const updateProduct = (product) => {
    const newProductName = prompt("Enter the new product name:", product.product_name);
    const newPrice = parseFloat(prompt("Enter the new product price:", product.price));
    const newStockQuantity = parseInt(
      prompt("Enter the new stock quantity:", product.stock_quantity),
      10
    );

    if (!newProductName || isNaN(newPrice) || isNaN(newStockQuantity)) {
      alert("Invalid input. Please provide valid product details.");
      return;
    }

    fetch(`https://exp-server-mini-proj2.vercel.app/shop/updaterecord/${product.product_id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product_name: newProductName,
        price: newPrice,
        stock_quantity: newStockQuantity,
      }),
    })
      .then((response) => {
        if (response.ok) {
          alert("Product updated successfully!");
          setProducts((prevProducts) =>
            prevProducts.map((p) =>
              p.product_id === product.product_id
                ? { ...p, product_name: newProductName, price: newPrice, stock_quantity: newStockQuantity }
                : p
            )
          );
        } else {
          throw new Error("Failed to update product.");
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("An error occurred while updating the product.");
      });
  };

  return (
    <div className="row">
      {/* Left Column: Product Names */}
      <div className="column bg-amber-100 h-[120vh]">
        <h1 className="headertext">Products</h1>
        {isAdmin && (
          <button
            className="border-2 bg-green-500 text-white px-4 py-2 mb-4"
            onClick={addProduct}
          >
            Add Product
          </button>
        )}
        <ul>
          {products.map((product) => (
            <li
              id="product-display"
              key={product.product_id}
              onMouseEnter={() => setHoveredProduct(product)}
              className="cursor-pointer hover:text-blue-500"
            >
              {product.product_name}
              {isAdmin && (
                <>
                  <button
                    className="border-2 bg-yellow-500 text-white px-2 py-1 ml-2"
                    onClick={() => updateProduct(product)}
                  >
                    Update
                  </button>
                  <button
                    className="border-2 bg-red-500 text-white px-2 py-1 ml-2"
                    onClick={() => deleteProduct(product.product_id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column: Product Details */}
      <div className="column bg-gray-50 h-[120vh]">
        <h1 className="headertext">Product Details</h1>
        {hoveredProduct ? (
          <div>
            <p>
              <strong>Product ID:</strong> {hoveredProduct.product_id}
            </p>
            <p>
              <strong>Price:</strong> $
              {typeof hoveredProduct.price === "number" &&
              !isNaN(hoveredProduct.price)
                ? hoveredProduct.price.toFixed(2)
                : "N/A"}
            </p>
            <p>
              <strong>Stock Quantity:</strong> {hoveredProduct.stock_quantity}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(hoveredProduct.created_at).toLocaleString()}
            </p>
          </div>
        ) : (
          <p>Hover over a product to see its details.</p>
        )}
      </div>
    </div>
  );
}