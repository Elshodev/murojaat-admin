import { Route, Routes } from "react-router-dom";
import Branches from "./Branches.jsx";
import AddBranch from "./AddBranch.jsx";
import BranchSinglePage from "./BranchSinglePage.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Branches />} />
      <Route path="/addBranch" element={<AddBranch />} />
      <Route path="/branchInfo/:id" element={<BranchSinglePage />} />
    </Routes>
  );
}
