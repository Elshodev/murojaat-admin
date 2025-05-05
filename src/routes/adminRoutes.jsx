import PageLoader from "@/components/loader/PageLoader";
import roles from "@/constants/roles";
import AppealsLayout from "@/pages/appeals";
import Appeals from "@/pages/appeals/Appeals";
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
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/users",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Users />
      </Suspense>
    ),
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/operators/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Operators />
      </Suspense>
    ),
    allowRole: [roles.ADMIN],
  },
  {
    path: "/respondents/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Respondents />
      </Suspense>
    ),
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/categories/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Categories />
      </Suspense>
    ),
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/regions/*",
    element: (
      <Suspense fallback={<PageLoader />}>
        <Regions />
      </Suspense>
    ),
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/appeals",
    element: <AppealsLayout />,
    allowRole: [roles.ADMIN, roles.OPERATOR],
    children: [
      {
        path: "/appeals",
        element: (
          <Suspense fallback={<PageLoader />}>
            <Appeals />
          </Suspense>
        ),
      },
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
