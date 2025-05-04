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
    allowRole: [1],
  },
  {
    path: "/users",
    Icon: UsersRound,
    label: "Foydalanuvchilar",
    allowRole: [1],
  },
  {
    path: "/operators",
    Icon: UserCog,
    label: "Operatorlar",
    allowRole: [1],
  },
  {
    path: "/respondents",
    Icon: UserPen,
    label: "Arizaga javob beruvchilar",
    allowRole: [1],
  },
  {
    path: "/categories",
    Icon: Grid2x2,
    label: "Bo'limlar",
    allowRole: [1],
  },
  {
    path: "/regions",
    Icon: MapPinned,
    label: "Viloyatlar",
    allowRole: [1],
  },
  {
    Icon: NotebookTabs,
    title: "Arizalar",
    allowRole: [1],
    children: [
      { label: "Yangi", Icon: ClipboardMinus, path: "/appeals/new" },
      { label: "Jarayonda", Icon: TbReport, path: "/appeals/inProgres" },
      { label: "Tugallangan", Icon: ClipboardCheck, path: "/appeals/done" },
    ],
  },
];
export default adminMenu;
