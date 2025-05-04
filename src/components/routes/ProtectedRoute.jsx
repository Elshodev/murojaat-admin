import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

export default function ProtectedRoute({ allowedRoles = [] }) {
  const user = useUserStore((state) => state.user);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role?.int)) {
    return <Navigate to="/transactions" replace />;
  }

  return <Outlet />;
}
