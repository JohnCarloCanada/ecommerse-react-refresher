import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Home, Auth, Checkout } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
