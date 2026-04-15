import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/product";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();
  const { cartItems, addToCart } = useCart();

  useEffect(() => {
    const productData = getProductById(id);

    if (!productData) {
      navigate("/"); // Redirect to home if product not found
    }

    setProduct(productData); // Simulate a delay for loading
  }, [id]);

  if (!product) {
    return (
      <div className="page">
        <div className="container">
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  const getProduct = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = getProduct ? ` (${getProduct.quantity})` : "";

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="product-detail-content">
            <h1 className="product-detail-name">{product?.name}</h1>
            <p className="product-detail-price">${product?.price}</p>
            <p className="product-detail-description">{product?.description}</p>
            <button onClick={() => addToCart(product.id)} className="btn btn-primary">
              Add to Cart {productQuantityLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
