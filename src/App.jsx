import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Auth, Checkout, ProductDetails } from "./pages";
import { Navbar } from "./components";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/product/:id" element={<ProductDetails />} />
          </Routes>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
