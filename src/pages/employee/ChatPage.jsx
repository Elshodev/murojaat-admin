import UniversalBtn from "@/components/buttons/UniversalBtn";
import CustomInput from "@/components/formElements/CustomInput";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { Send } from "lucide-react";
import UserImg from "./components/UserImg";
import { formatDate } from "@/utils/dateFormatter";
import { useState } from "react";
import request from "@/services/fetch.service";
import { showToast } from "@/utils/toastHelper";
import { useQueryClient } from "@tanstack/react-query";

function ChatPage({ activeUser, currentUserId }) {
  const [replyText, setReplyText] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const {
    data: user,
    isLoading,
    error,
  } = useRequest(`/operator/applications/${currentUserId}`, 5000);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  const handleCompleteAppeal = () => {
    if (!replyText || !status) {
      showToast.error("Iltimos, xabar va statusni to'ldiring");
      return;
    }

    setLoading(true);
    request(`/operator/application-send-message`, "POST", {
      message: replyText,
      ticket_id: +currentUserId,
      status,
    })
      .then(() => {
        showToast.success("Ariza yakunlandi!");
        queryClient.invalidateQueries([`//operator/applications`]);
        setReplyText("");
        setStatus("");
      })
      .catch((error) => {
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => setLoading(false));
  };

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
      <footer className="p-4 mt-auto border-t flex flex-col md:flex-row gap-2">
        <div className="flex-1 flex gap-2">
          <CustomInput
            placeholder="Xabar yozing..."
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="flex-1"
          />
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border rounded px-2 py-1 text-sm text-gray-700"
          >
            <option value="">Status tanlang</option>
            <option value="POSITIVE">✅ Positive</option>
            <option value="NEGATIVE">❌ Negative</option>
          </select>
        </div>
        <UniversalBtn onClick={handleCompleteAppeal} loading={loading}>
          <Send size={18} />
        </UniversalBtn>
      </footer>
    </>
  );
}

export default ChatPage;
