import { NavLink } from "react-router-dom";

const SidebarItem = ({ item }) => {
  const activeStyle = "bg-[rgb(88,155,255,90%)] text-[#fff]";

  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => {
        return `${
          isActive ? activeStyle : "text-main-blackish"
        } flex items-center gap-[10px] p-[14px_14px] rounded pr-[10px] font-semibold text-[14px] hover:bg-[rgb(88,155,255,90%)] hover:text-[#fff] justify-start`;
      }}
    >
      <item.Icon className={`w-5 h-5 shrink-0 `} />
      <span className="">{item.label}</span>
    </NavLink>
  );
};

export default SidebarItem;
