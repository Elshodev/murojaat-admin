import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import UserImg from "./components/UserImg";
import request from "@/services/fetch.service";
import { showToast } from "@/utils/toastHelper";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react"; // useRef ni ham import qiling
import MessageCard from "./components/MessageCard";
import MessageFooter from "./components/MessageFooter";

function ChatPage({ activeUser, currentUserId }) {
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null); // fayl tanlash uchun ref
  const [formValues, setFormValues] = useState({
    message: "",
    status: "",
  });

  const createFormData = (values) => {
    const formData = new FormData();
    formData.append("ticket_id", currentUserId); // tashqi manba

    Object.entries(values).forEach(([key, value]) => {
      if (key === "files" && Array.isArray(value) && value.length > 0) {
        value.forEach((file) => {
          formData.append("files", file); // ✅ HAR BIR fayl alohida append bo'ladi
        });
      } else if (key !== "files") {
        formData.append(key, value);
      }
    });

    return formData;
  };

  const {
    data: user,
    isLoading,
    error,
  } = useRequest(`/operator/applications/${currentUserId}`, 5000);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  const handleCompleteAppeal = () => {
    if (!formValues.message) {
      showToast.error("Iltimos, xabar yozing");
      return;
    }

    if (!formValues.status) {
      showToast.error("Iltimos, statusni tanlang");
      return;
    }

    setLoading(true);

    const formData = createFormData(formValues);
    request(`/operator/application-send-message`, "POST", formData)
      .then(() => {
        showToast.success("Xabar va fayllar yuborildi!");
        queryClient.invalidateQueries([`/operator/applications`]);
        setFormValues({ message: "", status: "" });
        if (fileInputRef.current) fileInputRef.current.value = null;
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
              return <MessageCard key={msg.id} msg={msg} />;
            })}
          </div>
        </>
      )}
      {/* Footer */}
      <MessageFooter
        handleCompleteAppeal={handleCompleteAppeal}
        fileInputRef={fileInputRef}
        loading={loading}
        setFormValues={setFormValues}
        formValues={formValues}
      />
    </>
  );
}

export default ChatPage;
