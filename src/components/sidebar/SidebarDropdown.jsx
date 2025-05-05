import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react"; // yoki boshqa icon kutubxonasi
import SidebarItem from "./SidebarItem.jsx";
import { Link, useLocation } from "react-router-dom";

export default function SidebarDropdown({ item }) {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const isMatch = item.children.some((item) =>
      location.pathname.includes(item.path)
    );
    if (isMatch) {
      setOpen(true);
    }
  }, [location.pathname, item.children]);

  return (
    <div>
      <Link
        to={item.path}
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer justify-between w-full text-main-blackish hover:bg-[rgb(88,155,255,90%)] hover:text-[#fff] rounded p-[16px_14px] pr-[15px] font-medium text-[14px]"
      >
        <div className="flex items-center  text-start gap-[10px]">
          <item.Icon className="w-5 h-5 shrink-0" />
          <span>{item.title}</span>
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </Link>

      {open && (
        <ul className="pl-[10px] mt-1 space-y-1">
          {item.children.map((item, index) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
