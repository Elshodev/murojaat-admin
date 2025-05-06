import UniversalBtn from "@/components/buttons/UniversalBtn";
import CustomInput from "@/components/formElements/CustomInput";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { Camera, Paperclip, Send } from "lucide-react";
import UserImg from "./components/UserImg";
import { formatDate } from "@/utils/dateFormatter";

function ChatPage({ activeUser, currentUserId }) {
  const {
    data: user,
    isLoading,
    error,
  } = useRequest(`/operator/applications/${currentUserId}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  return (
    <>
      {/* Header */}
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserImg userData={activeUser} currentUserId={currentUserId} />

          <span className="font-medium">{activeUser.user_name}</span>
        </div>
      </header>
      {isLoading ? (
        <div className="relative grow w-full">
          <PageLoader />
        </div>
      ) : (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-white">
            {user.map((msg) => {
              return (
                <div
                  key={msg.id}
                  className={`max-w-[50%] p-3 flex flex-col gap-3 rounded-[10px] rounded-bl-[0] ${
                    !msg.isUser
                      ? "ml-auto bg-blue-100 text-right"
                      : "bg-[#DCE8FF]"
                  }`}
                >
                  {msg.content_type == "IMAGE" ? (
                    <img className="rounded" src={msg.message} alt="" />
                  ) : (
                    <p className="text-black text-base">{msg.message}</p>
                  )}
                  <span className="text-black ml-auto text-sm">
                    {formatDate(msg.created_at)}
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}
      {/* Footer */}
      <footer className="p-4 mt-auto border-t flex items-center gap-2">
        <CustomInput
          placeholder="Write Something..."
          //   value={newMsg}
          //   onChange={(e) => setNewMsg(e.target.value)}
          className="flex-1"
        />
        <UniversalBtn>
          <Send size={18} />
        </UniversalBtn>
      </footer>
    </>
  );
}

export default ChatPage;
