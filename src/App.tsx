// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import OrderPage from "./pages/OrderPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import NotificationsPage from "./pages/NotificationsPage";
import AdminPage from "./pages/AdminPage";
import AddTablePage from "./pages/AddTablePage";
import EditTablePage from "./pages/EditTablePage";
import AddCategoryPage from "./pages/AddCategoryPage";
import EditCategoryPage from "./pages/EditCategoryPage";
import AddProductPage from "./pages/AddProductPage";
import EditProductPage from "./pages/EditProductPage";
import OrderDetailPage from "./pages/OrderDetailPage";

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
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/tables" element={<AdminPage />} />
        <Route path="/admin/tables/new" element={<AddTablePage />} />
        <Route path="/admin/tables/:id/edit" element={<EditTablePage />} />
        <Route path="/admin/categories/new" element={<AddCategoryPage />} />
        <Route path="/admin/categories/:id/edit" element={<EditCategoryPage />} />
        <Route path="/admin/products/new" element={<AddProductPage />} />
        <Route path="/admin/products/:id/edit" element={<EditProductPage />} />
        <Route path="/admin/products" element={<AdminPage />} />
        <Route path="/admin/orders" element={<AdminPage />} />
        <Route path="/admin/orders/:id" element={<OrderDetailPage />} />
      </Routes>
    </div>
  );
};

export default App;
