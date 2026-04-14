import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../data/product";
import { useEffect, useState } from "react";

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="page">
      <div className="container">
        <div className="product-detail">
          <div className="product-detail-image">
            <img src={product?.image} alt={product?.name} />
          </div>
          <div className="produc-detail-content">
            <h1 className="product-detail-name">{product?.name}</h1>
            <p className="product-detail-price">${product?.price}</p>
            <p className="product-detail-description">{product?.description}</p>
            <button className="btn btn-primary">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
