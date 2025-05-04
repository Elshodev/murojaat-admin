import MoreLink from "@/components/MoreLink.jsx";
import { formatDate } from "../../../utils/dateFormatter.js";
import { useUserStore } from "@/store/userStore.js";
import { Switch } from "@/components/ui/switch";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function TerminalTbody({ datas, className }) {
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const handleStatusChange = async (checked, id) => {
    setLoading(true);
    try {
      const newStatus = checked ? "ACTIVE" : "NOACTIVE";
      await request(`terminal/${id}`, "PUT", {
        status: newStatus,
      });
      queryClient.invalidateQueries([`terminal/${id}`]);
    } catch (error) {
      console.error(error);
      showToast.error("Statusni yangilashda xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={index}
          className={`grid w-full min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center gap-4 text-sm text-main-blackish font-medium ${className}`}
        >
          <span>{item.branchName}</span>
          <span>{item.terminalId}</span>
          <div className="flex items-center space-x-2">
            {(user?.role?.roleId == 1 || user?.role?.roleId == 6) && (
              <Switch
                disabled={loading}
                checked={item.status === "ACTIVE"}
                onCheckedChange={(e) => handleStatusChange(e, item.id)}
                id={`terminal-${item.id}`}
                className={`data-[state=checked]:bg-green-500 cursor-pointer data-[state=unchecked]:bg-red-500`}
              />
            )}

            <label htmlFor={`terminal-${item.id}`}>
              {item.status == "ACTIVE" ? "Активный" : "Неактивный"}
            </label>
          </div>
          <span>{item.companyName}</span>
          <span>{item.expire ? formatDate(item.expire) : "-"}</span>
          <span>{formatDate(item.createdAt)}</span>
          {user?.role?.roleId == 1 && (
            <MoreLink link={`terminalInfo/${item.id}`} />
          )}
        </div>
      ))}
    </div>
  );
}

export default TerminalTbody;
