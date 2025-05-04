import { Route, Routes } from "react-router-dom";
import AddTerminal from "./AddTerminal.jsx";
import TerminalSinglePage from "./TerminalSinglePage.jsx";
import Terminal from "./Terminal.jsx";
import { useUserStore } from "@/store/userStore.js";

export default function Admin() {
  const { user } = useUserStore();

  return (
    <Routes>
      <Route index element={<Terminal />} />
      {user?.role?.roleId == 1 ? (
        <>
          <Route path="/addTerminal" element={<AddTerminal />} />
          <Route path="/terminalInfo/:id" element={<TerminalSinglePage />} />
        </>
      ) : (
        ""
      )}
    </Routes>
  );
}
