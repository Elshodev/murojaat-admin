import { Route, Routes } from "react-router-dom";
import Company from "./Company.jsx";
import AddCompany from "./AddCompany.jsx";
import CompanySinglePage from "./CompanySinglePage.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Company />} />
      <Route path="/addCompany" element={<AddCompany />} />
      <Route path="/companyInfo/:id" element={<CompanySinglePage />} />
    </Routes>
  );
}
