import {
  Categories,
  Dashboard,
  Operators,
  Regions,
  Respondents,
  Users,
} from "@/pages/index.jsx";
const adminRoutes = [
  { path: "/", element: <Dashboard />, allowRole: [1, 2, 3, 5, 6] },
  { path: "/users", element: <Users />, allowRole: [1, 2, 3] },
  { path: "/operators/*", element: <Operators />, allowRole: [1, 2, 3] },
  { path: "/respondents/*", element: <Respondents />, allowRole: [1, 2, 3] },
  { path: "/categories/*", element: <Categories />, allowRole: [1] },
  { path: "/regions/*", element: <Regions />, allowRole: [1] },
];

export default adminRoutes;
