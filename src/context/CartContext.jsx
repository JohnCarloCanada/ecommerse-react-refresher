import { createContext, useContext, useState } from "react";
import { getProductById } from "../data/product";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // { id: 7, quantity: 1 }

  const addToCart = (productId) => {
    const isAlreadyInCart = cartItems.find((item) => item.id === productId);
    if (isAlreadyInCart) {
      const currentQuantity = isAlreadyInCart.quantity;
      const updatedCartItems = cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: currentQuantity + 1 } : item,
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { id: productId, quantity: 1 }]);
    }
  };

  // Filter out items that don't have a corresponding product
  const getCartItemsWithProduct = () => {
    return cartItems.map((item) => ({ ...item, product: getProductById(item.id) }));

    // .filter((item) => item.product);
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCartItems = cartItems.map((item) => (item.id === productId ? { ...item, quantity: quantity } : item));
    setCartItems(updatedCartItems);
  };

  const getCartTotal = () => {
    const total = cartItems.reduce((total, item) => {
      const product = getProductById(item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);

    return total;
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        getCartItemsWithProduct,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
};
