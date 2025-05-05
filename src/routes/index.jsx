import { Route, Routes, useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout.jsx";
import adminRoutes from "./adminRoutes.jsx";
import Login from "../pages/login/index.jsx";
import { Suspense, useEffect, useState } from "react";
import { fetchUserData } from "@/utils/auth.js";
import NoConnection from "@/components/noConnection/NoConnection.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useUserStore } from "@/store/userStore.js";
import Employee from "../pages/employee";
import ChatPage from "@/pages/employee/employeSinglePage/EmployeSinglePage.jsx";
function AppRoutes() {
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchUserData(navigate, setIsLoading, setIsError);
  }, []);

  if (isLoading) return <PageLoader />;
  if (isError) {
    if (isError.status == 401) {
      localStorage.removeItem("accessToken");
      setIsError(null);
      navigate("/login");
    } else {
      return <NoConnection />;
    }
  }

  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<AdminLayout />}>
          {adminRoutes
            .filter((item) => item.allowRole.includes(user?.role))
            .map(({ path, element, children }) => (
              <Route key={path} path={path} element={element}>
                {children &&
                  children.map(({ path, element }) => (
                    <Route key={path} path={path} element={element} />
                  ))}
              </Route>
            ))}
        </Route>
        <Route path="/employee" element={<Employee />} />
        <Route path="/employee/:id" element={<ChatPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Suspense>
  );
}

export default AppRoutes;
