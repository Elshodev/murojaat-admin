import {
  Branches,
  Categories,
  Company,
  Dashboard,
  Products,
  Regions,
  TemplateCategories,
  TemplateProducts,
  Terminal,
  Users,
} from "@/pages/index.jsx";
const adminRoutes = [
  { path: "/", element: <Dashboard />, allowRole: [1, 2, 3, 5, 6] },
  { path: "/users/*", element: <Users />, allowRole: [1, 2, 3] },
  { path: "/products/*", element: <Products />, allowRole: [2, 3, 5] },
  { path: "/categories/*", element: <Categories />, allowRole: [2, 3, 5] },
  { path: "/regions/*", element: <Regions />, allowRole: [1] },
  { path: "/branches/*", element: <Branches />, allowRole: [1, 3] },
  { path: "/company/*", element: <Company />, allowRole: [1] },
  { path: "/terminal/*", element: <Terminal />, allowRole: [1, 2, 3, 6] },
  {
    path: "/templateProducts/*",
    element: <TemplateProducts />,
    allowRole: [1],
  },
  {
    path: "/templateCategories/*",
    element: <TemplateCategories />,
    allowRole: [1],
  },
];

export default adminRoutes;
