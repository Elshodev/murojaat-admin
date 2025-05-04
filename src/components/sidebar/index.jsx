import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
// import { IoMdClose, IoMdMenu } from "react-icons/io";
import { MdExitToApp } from "react-icons/md";
import { useUserStore } from "../../store/userStore.js";
import adminMenu from "../../constants/sidebar.js";
import { logo } from "@/assets/index.js";
import SidebarItem from "./SidebarItem.jsx";
import UniversalBtn from "../buttons/UniversalBtn.jsx";
import SidebarDropdown from "./SidebarDropdown.jsx";
function Sidebar() {
  const { user } = useUserStore();

  const [isShow, setIsShow] = useState(true);
  const { pathname } = useLocation();
  useEffect(() => {
    setIsShow(false);
  }, [pathname]);

  return (
    <>
      {/* <div className="fixed left-0 top-0 z-[1] flex h-[80px] w-full items-center justify-between bg-white px-8 lg:hidden xs:px-4">
        <Link to={"/"} className="block">
          <img
            className="h-[45px] w-[100%] object-contain"
            src={logo}
            alt="panel"
          />
        </Link>
        <button
          className="text-[24px]"
          onClick={() => {
            setIsShow(!isShow);
          }}
        >
          {!isShow && <IoMdMenu />}
          {isShow && <IoMdClose />}
        </button>
      </div> */}
      <div
        className={`scroll-hiddenfixed p-2 lg:sticky bottom-0 flex-col overflow-auto rounded-none border border-[#EEE] bg-white  shadow-none transition-all md:top-[80px] md:z-[111] md:flex lg:bottom-auto lg:top-0 lg:flex lg:h-screen max-w-[250px] w-full shrink-0 top-[80px] z-[20] flex ${
          isShow ? "md:left-0 left-0" : "md:-left-full -left-full"
        }`}
      >
        <div className="h-[80px] mb-2 flex items-center justify-center">
          <Link to={"/"} className="h-full flex">
            <img
              className="h-auto w-full object-contain"
              src={logo}
              alt="panel"
            />
          </Link>
        </div>
        <nav className="flex flex-col h-auto gap-2">
          {adminMenu
            .filter((item) => item.allowRole.includes(user?.role.roleId))
            .map((item) =>
              item.children ? (
                <SidebarDropdown key={item.title} item={item} />
              ) : (
                <SidebarItem isOpen={isShow} key={item.path} item={item} />
              )
            )}
        </nav>
        <hr className="my-4 mt-auto border-main-blue" />
        <UniversalBtn
          iconPosition="right"
          className="justify-center"
          onClick={() => {
            localStorage.removeItem("accessToken");
            location.reload();
          }}
          icon={MdExitToApp}
        >
          Выйти
        </UniversalBtn>
      </div>
    </>
  );
}

export default Sidebar;
