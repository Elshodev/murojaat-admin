import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard"));
const Users = lazy(() => import("./users"));
const Products = lazy(() => import("./products"));
const Categories = lazy(() => import("./categories"));
const Regions = lazy(() => import("./regions"));
const Branches = lazy(() => import("./branches"));
const Company = lazy(() => import("./company"));
const Terminal = lazy(() => import("./terminal"));
const Login = lazy(() => import("./login"));
const TemplateProducts = lazy(() => import("./templateProducts"));
const TemplateCategories = lazy(() => import("./templateCategories"));

export {
  Dashboard,
  Users,
  Products,
  Categories,
  Regions,
  Branches,
  Company,
  Terminal,
  Login,
  TemplateProducts,
  TemplateCategories,
};
