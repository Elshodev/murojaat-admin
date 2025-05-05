import {
  ClipboardCheck,
  ClipboardMinus,
  Grid2x2,
  LayoutDashboard,
  MapPinned,
  NotebookTabs,
  UserCog,
  UsersRound,
} from "lucide-react";
import { TbReport } from "react-icons/tb";
import roles from "./roles";
const adminMenu = [
  {
    path: "/",
    Icon: LayoutDashboard,
    label: "Bosh sahifa",
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/users",
    Icon: UsersRound,
    label: "Murojaatchilar",
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/operators",
    Icon: UserCog,
    label: "Xodimlar",
    allowRole: [roles.ADMIN],
  },
  {
    path: "/categories",
    Icon: Grid2x2,
    label: "Bo'limlar",
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    path: "/regions",
    Icon: MapPinned,
    label: "Viloyatlar",
    allowRole: [roles.ADMIN, roles.OPERATOR],
  },
  {
    Icon: NotebookTabs,
    title: "Arizalar",
    allowRole: [roles.ADMIN, roles.OPERATOR],
    children: [
      { label: "Yangi", Icon: ClipboardMinus, path: "/appeals/new" },
      { label: "Jarayonda", Icon: TbReport, path: "/appeals/inProgres" },
      { label: "Tugallangan", Icon: ClipboardCheck, path: "/appeals/done" },
    ],
  },
];
export default adminMenu;
