import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/Product"; 
import ProductDetail from "../pages/ProductDetail"; 
import Cart from "../pages/Cart"; 
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register"; 

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductPage />} /> 
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registr" element={<Register />} /> 
    </Routes>
  );
};

export default AppRouter;