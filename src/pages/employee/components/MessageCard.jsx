import { formatDate } from "@/utils/dateFormatter";
import { FileText } from "lucide-react";
import React from "react";

function MessageCard({ msg }) {
  return (
    <div
      key={msg.id}
      className={`max-w-[50%] w-fit p-3 flex flex-col gap-3 rounded-[10px] rounded-bl-[0] ${
        !msg.isUser ? "ml-auto bg-green-100 text-right" : "bg-[#DCE8FF]"
      }`}
    >
      {msg.content_type === "IMAGE" ? (
        <img
          className="rounded max-h-[300px] object-contain"
          src={msg.message}
          alt="image"
        />
      ) : msg.content_type === "VOICE" ? (
        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 max-w-[350px] w-full">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Audio xabar:
          </p>
          <audio controls className="w-full rounded-lg">
            <source src={`${msg.message}`} type="audio/ogg" />
            Your browser does not support the audio element.
          </audio>
        </div>
      ) : msg.content_type === "DOCUMENT" ? (
        <div className="bg-white rounded-xl shadow p-4 border border-gray-200 max-w-[350px] w-full flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-700 mb-2">
            <FileText />
          </p>
          <a
            target="_blank"
            href={msg.message}
            download={msg.file_name ?? "Document"} // Fayl nomini ajratib berish
            className="text-blue-600 hover:underline break-words"
          >
            {msg.file_name ?? "Document"}
          </a>
        </div>
      ) : (
        <p className="text-black text-base overflow-hidden">{msg.message}</p>
      )}

      <span className="text-black ml-auto text-sm">
        {formatDate(msg.created_at)}
      </span>
    </div>
  );
}

export default MessageCard;
