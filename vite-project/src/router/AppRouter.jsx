import { Routes, Route } from "react-router-dom";
import ProductPage from "../pages/Product"; 
import ProductDetail from "../pages/ProductDetail"; 
import Cart from "../pages/Cart"; 
import Profile from "../pages/Profile";
import Login from "../pages/Login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      
      <Route path="/" element={<ProductPage />} /> 
    </Routes>
  );
};

export default AppRouter;