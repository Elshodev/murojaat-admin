import { Route, Routes } from "react-router-dom";
import Categories from "./Categories.jsx";
import AddCategory from "./AddCategory.jsx";
import CategorySinglePage from "./CategorySinglePage.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Categories />} />
      <Route path="/addCategory" element={<AddCategory />} />
      <Route path="/categoryInfo/:id" element={<CategorySinglePage />} />
    </Routes>
  );
}
