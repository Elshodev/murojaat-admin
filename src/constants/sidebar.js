import {
  Boxes,
  Building2,
  Grid2x2,
  LayoutDashboard,
  MapPinned,
  Share2,
  SquareTerminal,
  UsersRound,
} from "lucide-react";

const adminMenu = [
  {
    path: "/",
    Icon: LayoutDashboard,
    label: "Панель управления",
    allowRole: [1, 2, 3,5,6],
  },
  {
    path: "/users",
    Icon: UsersRound,
    label: "Пользователи",
    allowRole: [1, 2, 3],
  },
  {
    path: "/products",
    Icon: Boxes,
    label: "Продукция",
    allowRole: [2, 3,5],
  },
  {
    path: "/categories",
    Icon: Grid2x2,
    label: "Категории",
    allowRole: [2, 3,5],
  },
  {
    path: "/regions",
    Icon: MapPinned,
    label: "Регионы",
    allowRole: [1],
  },
  {
    path: "/branches",
    Icon: Share2,
    label: "Филиалы",
    allowRole: [1, 3],
  },
  {
    path: "/company",
    Icon: Building2,
    label: "Компания",
    allowRole: [1],
  },
  {
    path: "/terminal",
    Icon: SquareTerminal,
    label: "Терминал",
    allowRole: [1,2,3,6],
  },  {
    path: "/templateProducts",
    Icon: Boxes,
    label: "Продукция",
    allowRole: [1],
  },
  {
    path: "/templateCategories",
    Icon: Grid2x2,
    label: "Категории",
    allowRole: [1],
  },
];
export default adminMenu;
