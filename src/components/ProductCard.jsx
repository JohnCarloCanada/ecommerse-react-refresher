import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { cartItems, setCartItems, addToCart } = useCart();
  const getProduct = cartItems.find((item) => item.id === product.id);
  const productQuantityLabel = getProduct ? ` (${getProduct.quantity})` : "";
  return (
    <div className="product-card">
      <img className="product-card-image" src={product.image} alt="" />
      <div className="product-card-content">
        <h3 className="product-card-name">{product.name}</h3>
        <p className="product-card-price">${product.price}</p>
        <div className="product-card-actions">
          <Link to={`/product/${product.id}`} className="btn btn-secondary">
            View Details
          </Link>
          <button onClick={() => addToCart(product.id)} className="btn btn-primary">
            Add to Cart {productQuantityLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
