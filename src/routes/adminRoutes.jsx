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
  { path: "/", element: <Dashboard />, allowRole: [1, 2, 3, 5, 6] },
  { path: "/users", element: <Users />, allowRole: [1, 2, 3] },
  { path: "/operators/*", element: <Operators />, allowRole: [1, 2, 3] },
  { path: "/respondents/*", element: <Respondents />, allowRole: [1, 2, 3] },
  { path: "/categories/*", element: <Categories />, allowRole: [1] },
  { path: "/regions/*", element: <Regions />, allowRole: [1] },
  {
    path: "/appeals",
    element: <AppealsLayout />,
    allowRole: [1],
    children: [
      { path: "new", element: <h1>New</h1> },
      { path: "inProgres", element: <h1>Jarayonda</h1> },
      { path: "done", element: <h1>Tugatilgan</h1> },
    ],
  },
];

export default adminRoutes;
