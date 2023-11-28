import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductView from "./pages/ProductView";
import Login from "./pages/Login";
import MyProfile from "./pages/Account/MyProfile";
import MyProducts from "./pages/Account/MyProducts";

import { AuthProvider } from "./context/AuthContext";
import { ProductProvider } from "./context/ProductContext";

import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Register";
import MerchantView from "./pages/MerchantView";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <ProductProvider>
            <Navigation />
            <main className="pt-[88px]">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Products />} />
                <Route
                  path="/marketplace/:merchantUsername"
                  element={<MerchantView />}
                />
                <Route
                  path="/marketplace/product/:productHandle"
                  element={<ProductView />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/me" element={<MyProfile />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/me/products" element={<MyProducts />} />
              </Routes>
            </main>
            <Footer />
          </ProductProvider>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
