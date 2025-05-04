import {
  Boxes,
  Building2,
  Grid2x2,
  LayoutDashboard,
  MapPinned,
  Share2,
  SquareTerminal,
  UserCog,
  UserPen,
  UsersRound,
} from "lucide-react";

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
    Icon: UserCog ,
    label: "Operatorlar",
    allowRole: [1],
  },
  {
    path: "/respondents",
    Icon: UserPen ,
    label: "Arizaga javob beruvchilar",
    allowRole: [1,],
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
];
export default adminMenu;
