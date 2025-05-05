import PageLoader from "@/components/loader/PageLoader";
import AppealsLayout from "@/pages/appeals";
import CompletedAppeals from "@/pages/appeals/completedAppeals/CompletedAppeals";
import NewAppeals from "@/pages/appeals/newAppeals/NewAppeals";
import ProgressAppeals from "@/pages/appeals/progressAppeals/ProgressAppeals";
import {
  Categories,
  Dashboard,
  Operators,
  Regions,
  Respondents,
  Users,
} from "@/pages/index.jsx";
import { Suspense } from "react";
const adminRoutes = [
  {
    path: "/",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Dashboard />
      </Suspense>
    ),
    allowRole: ["ADMIN"],
  },
  {
    path: "/users",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Users />
      </Suspense>
    ),
    allowRole: ["ADMIN"],
  },
  {
    path: "/operators/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Operators />
      </Suspense>
    ),
    allowRole: ["ADMIN"],
  },
  {
    path: "/respondents/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Respondents />
      </Suspense>
    ),
    allowRole: ["ADMIN"],
  },
  {
    path: "/categories/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Categories />
      </Suspense>
    ),
    allowRole: ["ADMIN"],
  },
  {
    path: "/regions/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Regions />
      </Suspense>
    ),
    allowRole: ["ADMIN"],
  },
  {
    path: "/appeals",
    element: <AppealsLayout />,
    allowRole: ["ADMIN"],
    children: [
      {
        path: "new",
        element: (
          <Suspense fallback={<PageLoader />}>
            <NewAppeals />
          </Suspense>
        ),
      },
      {
        path: "inProgres",
        element: (
          <Suspense fallback={<PageLoader />}>
            <ProgressAppeals />
          </Suspense>
        ),
      },
      {
        path: "done",
        element: (
          <Suspense fallback={<PageLoader />}>
            <CompletedAppeals />
          </Suspense>
        ),
      },
    ],
  },
];

export default adminRoutes;
