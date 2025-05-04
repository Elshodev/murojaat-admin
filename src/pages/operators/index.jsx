import { Route, Routes } from "react-router-dom";
import Operators from "./Operators";
import OperatorSinglePage from "./OperatorSinglePage.jsx";
import AddOperator from "./AddOperator.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Operators />} />
      <Route path="addOperator" element={<AddOperator />} />
      <Route path=":id" element={<OperatorSinglePage />} />
    </Routes>
  );
}
