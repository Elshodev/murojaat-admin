import { Route, Routes } from "react-router-dom";
import Respondents from "./respondents";
import RespondentsinglePage from "./RespondentsinglePage.jsx";
import AddUser from "./AddRespondents.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Respondents />} />
      <Route path="/addRespondents" element={<AddUser />} />
      <Route path="/:id" element={<RespondentsinglePage />} />
    </Routes>
  );
}
