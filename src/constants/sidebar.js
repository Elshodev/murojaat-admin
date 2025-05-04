import {
  Boxes,
  Building2,
  ClipboardCheck,
  ClipboardMinus,
  Grid2x2,
  LayoutDashboard,
  MapPinned,
  NotebookTabs,
  UserCog,
  UserPen,
  UsersRound,
} from "lucide-react";
import { TbReport } from "react-icons/tb";
const adminMenu = [
  {
    path: "/",
    Icon: LayoutDashboard,
    label: "Bosh sahifa",
    allowRole: ["ADMIN"],
  },
  {
    path: "/users",
    Icon: UsersRound,
    label: "Murojaatchilar",
    allowRole: ["ADMIN"],
  },
  {
    path: "/operators",
    Icon: UserCog,
    label: "Xodimlar",
    allowRole: ["ADMIN"],
  },
  {
    path: "/categories",
    Icon: Grid2x2,
    label: "Bo'limlar",
    allowRole: ["ADMIN"],
  },
  {
    path: "/regions",
    Icon: MapPinned,
    label: "Viloyatlar",
    allowRole: ["ADMIN"],
  },
  {
    Icon: NotebookTabs,
    title: "Arizalar",
    allowRole: ["ADMIN"],
    children: [
      { label: "Yangi", Icon: ClipboardMinus, path: "/appeals/new" },
      { label: "Jarayonda", Icon: TbReport, path: "/appeals/inProgres" },
      { label: "Tugallangan", Icon: ClipboardCheck, path: "/appeals/done" },
    ],
  },
];
export default adminMenu;
