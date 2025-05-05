import { useParams } from "react-router-dom";
import { useState } from "react";
import { useRequest } from "@/hooks/useRequest";
import request from "@/services/fetch.service";
import UniversalBtn from "@/components/buttons/UniversalBtn";

export default function ChatPage() {
  const { id } = useParams();
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  const { data, refetch, isLoading } = useRequest(
    `/operator/applications/${id}`
  );

  const handleSend = () => {
    setLoading(true);
    request("/operator/chat-send", "POST", {
      ticket_id: Number(id),
      message: reply,
    })
      .then(() => {
        setReply("");
        refetch();
      })
      .finally(() => setLoading(false));
  };

  if (isLoading) return <div>Yuklanmoqda...</div>;

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Chat oynasi</h2>
      <div className="border p-3 mb-4 rounded max-h-[400px] overflow-y-auto space-y-2">
        {data?.map((msg) => (
          <div
            key={msg.id}
            className={`p-2 rounded ${
              msg.isUser ? "bg-blue-100 text-left" : "bg-green-100 text-right"
            }`}
          >
            {msg.message}
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Javob yozing..."
          className="border rounded p-2 flex-1"
        />
        <UniversalBtn loading={loading} onClick={handleSend}>
          Yuborish
        </UniversalBtn>
      </div>
    </div>
  );
}
