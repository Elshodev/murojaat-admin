import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useInitDataStore from "../store/initDataStore.js";
import Sidebar from "@/components/sidebar/index.jsx";
import { useUserStore } from "@/store/userStore.js";
import { fetchUserData } from "@/utils/auth.js";
import PageLoader from "@/components/loader/PageLoader.jsx";
import NoConnection from "@/components/noConnection/NoConnection.jsx";

const AdminLayout = () => {
  const { fetchInitData } = useInitDataStore();
  const { user } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      fetchUserData(navigate, setIsLoading, setIsError);
    }
    fetchInitData(user?.role);
  }, [user]);
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
    <div className="flex h-screen w-full bg-[#F8F8F8]">
      <Sidebar />
      <div className="relative w-full overflow-hidden flex flex-col h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
