import { Route, Routes } from "react-router-dom";
import Users from "./Users";
import SingleUserPage from "./UserSinglePage.jsx";
import AddUser from "./AddUser.jsx";

export default function Admin() {
  return (
    <Routes>
      <Route index element={<Users />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/userInfo/:id" element={<SingleUserPage />} />
    </Routes>
  );
}
