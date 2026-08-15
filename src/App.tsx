// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderPage from "./pages/OrderPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";

// Router shell. Each page is registered as a <Route> here. Navigation between
// pages is done declaratively with <Link> or imperatively with useNavigate().
const App = () => {
  return (
    <div className="relative">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/menu/:categoryId" element={<MenuPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<OrderPage />} />
        <Route path="/order-confirmed" element={<OrderConfirmedPage />} />
      </Routes>
    </div>
  );
};

export default App;
