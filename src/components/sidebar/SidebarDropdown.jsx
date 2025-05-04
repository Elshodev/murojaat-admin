import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react"; // yoki boshqa icon kutubxonasi
import SidebarItem from "./SidebarItem.jsx";

export default function SidebarDropdown({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center cursor-pointer justify-between w-full text-main-black hover:bg-[rgba(88,155,255,0.1)] hover:text-[#589bff] rounded p-[16px_20px] pr-[15px] font-medium text-[14px]"
      >
        <div className="flex items-center text-start gap-[10px]">
          <item.Icon className="w-5 h-5 shrink-0" />
          <span>{item.title}</span>
        </div>
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>

      {open && (
        <ul className="pl-[10px]">
          {item.children.map((item) => (
            <SidebarItem key={item.path} item={item} />
          ))}
        </ul>
      )}
    </div>
  );
}
