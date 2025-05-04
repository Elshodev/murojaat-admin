import AppealsLayout from "@/pages/appeals";
import {
  Categories,
  Dashboard,
  Operators,
  Regions,
  Respondents,
  Users,
} from "@/pages/index.jsx";
const adminRoutes = [
  { path: "/", element: <Dashboard />, allowRole: ["ADMIN"] },
  { path: "/users", element: <Users />, allowRole: ["ADMIN"] },
  { path: "/operators/*", element: <Operators />, allowRole: ["ADMIN"] },
  { path: "/respondents/*", element: <Respondents />, allowRole: ["ADMIN"] },
  { path: "/categories/*", element: <Categories />, allowRole: ["ADMIN"] },
  { path: "/regions/*", element: <Regions />, allowRole: ["ADMIN"] },
  {
    path: "/appeals",
    element: <AppealsLayout />,
    allowRole: ["ADMIN"],
    children: [
      { path: "new", element: <h1>New</h1> },
      { path: "inProgres", element: <h1>Jarayonda</h1> },
      { path: "done", element: <h1>Tugatilgan</h1> },
    ],
  },
];

export default adminRoutes;
