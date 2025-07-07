import { lazy } from "react";

const Dashboard = lazy(() => import("./dashboard"));
const Users = lazy(() => import("./users"));
const Operators = lazy(() => import("./operators"));
const Respondents = lazy(() => import("./respondents"));
const Categories = lazy(() => import("./categories"));
const Regions = lazy(() => import("./regions"));
const Login = lazy(() => import("./login"));

export { Dashboard, Users, Operators, Respondents, Categories, Regions, Login };
// last version
