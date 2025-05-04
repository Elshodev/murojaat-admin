import { Route, Routes } from "react-router-dom";
import Products from "./Products.jsx";
import AddProduct from "./AddProduct.jsx";
import ProductSinglePage from "./ProductSinglePage.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Products />} />
      <Route path="/addProduct" element={<AddProduct />} />
      <Route path="/productInfo/:id" element={<ProductSinglePage />} />
    </Routes>
  );
}
