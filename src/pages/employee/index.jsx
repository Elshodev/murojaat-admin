import { useEffect, useState } from "react";
import CustomInput from "@/components/formElements/CustomInput";
import { useRequest } from "@/hooks/useRequest";
import PageLoader from "@/components/loader/PageLoader";
import { formatDate } from "@/utils/dateFormatter";
import { useUserStore } from "@/store/userStore";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber ";
import ChatPage from "./ChatPage";
import { Link, useSearchParams } from "react-router-dom";
import UserImg from "./components/UserImg";
import UniversalBtn from "@/components/buttons/UniversalBtn";
import { MdExitToApp } from "react-icons/md";

export default function ChatApp() {
  const { user } = useUserStore();
  const [searchParams] = useSearchParams();
  const currentUserId = searchParams.get("userId");

  const [searchValue, setSearchValue] = useState("");
  const [queryUrl, setQueryUrl] = useState("/operator/applications");

  const { data: users, isLoading, error } = useRequest(queryUrl);

  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    if (users?.data && currentUserId) {
      const found = users.data.find((item) => item.id == currentUserId);
      if (found) {
        setActiveUser(found);
      }
    }
  }, [users, currentUserId]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue.trim()) {
      setQueryUrl(`/operator/applications?user_name=${searchValue.trim()}`);
    } else {
      setQueryUrl("/operator/applications");
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  console.log(users);

  return (
    <div className="h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="min-w-1/5 flex flex-col border-r p-4 bg-gray-100">
        <div className="flex flex-col gap-1 mb-3">
          <h2 className="text-base font-semibold">{user.full_name}</h2>
          <h2 className="text-base font-semibold">
            {formatPhoneNumber(user.phone_number)}
          </h2>
        </div>

        {/* Search input with button */}
        <form onSubmit={handleSearch} className="flex items-center gap-2 mb-4">
          <CustomInput
            type="search"
            required={false}
            divClass="grow-0 w-full"
            placeholder="Search Here..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <UniversalBtn type="submit">Qidirish</UniversalBtn>
        </form>

        <ul className="space-y-2 overflow-auto">
          {users?.data?.map((userData) => (
            <Link
              to={`/employee?userId=${userData.id}`}
              key={userData.id}
              className={`flex items-center gap-2 p-2 rounded border cursor-pointer ${
                userData.id == currentUserId
                  ? "border-[green]"
                  : "border-transparent"
              } ${
                userData.status == "INPROGRESS" ? "bg-red-300" : "bg-green-200"
              }`}
              onClick={() => setActiveUser(userData)}
            >
              {/* <UserImg userData={userData} currentUserId={currentUserId} /> */}
              <div className="">
                <div className="font-medium text-sm">{userData.user_name}</div>
                <div className="text-xs text-black-500">
                  {formatDate(userData.updated_at)}
                </div>
              </div>
            </Link>
          ))}
        </ul>
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
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col">
        {currentUserId ? (
          <ChatPage currentUserId={currentUserId} activeUser={activeUser} />
        ) : (
          <div className="text-gray-500 text-lg font-medium h-screen flex items-center justify-center">
            Suhbatni boshlash uchun foydalanuvchini tanlang!
          </div>
        )}
      </main>
    </div>
  );
}
