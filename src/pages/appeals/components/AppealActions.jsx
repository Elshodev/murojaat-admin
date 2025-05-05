import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useQueryClient } from "@tanstack/react-query";
import request from "@/services/fetch.service";
import UniversalBtn from "@/components/buttons/UniversalBtn";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import { showToast } from "@/utils/toastHelper";
import { useRequest } from "@/hooks/useRequest";

const AppealActions = ({ item, regions, categories, currentPage, status }) => {
  const queryClient = useQueryClient();

  const [isReplying, setIsReplying] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    region_id: null,
    department_id: null,
    operator_id: null,
  });

  const queryParams = new URLSearchParams({
    role: "EMPLOYEE",
    ...(formData?.region_id && { region_id: formData.region_id }),
    ...(formData?.department_id && { deportament_id: formData.department_id }),
  });

  const { data: users, isLoading: isLoadingOperator } = useRequest(
    `/operator?${queryParams.toString()}`
  );

  const handleCompleteAppeal = (appealId, status) => {
    setLoading(true);
    request(`/operator/application-send-message`, "POST", {
      message: replyText,
      ticket_id: appealId,
      status,
    })
      .then(() => {
        showToast.success("Ariza yakunlandi!");
        queryClient.invalidateQueries([
          `/operator/applications?status=NEW&page=${currentPage}`,
        ]);
        setReplyText("");
        setIsReplying(null);
      })
      .catch((error) => {
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => setLoading(false));
  };

  const handleRedirect = (appealId) => {
    setLoading(true);
    request("/operator/connect-employee", "POST", {
      app_id: appealId,
      operator_id: formData?.operator_id,
    })
      .then(() => {
        showToast.success("Ariza muvaffaqiyatli yo'naltirildi!");
        queryClient.invalidateQueries([
          `/operator/applications?status=NEW&page=${currentPage}`,
        ]);
        setFormData({
          region_id: null,
          department_id: null,
          operator_id: null,
        });
        setIsRedirecting(null);
      })
      .catch((error) => {
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => setLoading(false));
  };

  return (
    <>
      {isReplying === item.id ? (
        <div className="flex flex-col gap-2 mt-2">
          <TextareaAutosize
            minRows={6}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Javob yozing..."
            className="border rounded p-2 text-sm w-full"
          />
          <div className="flex gap-2">
            <UniversalBtn
              className="!min-h-[30px] text-sm bg-green-600 hover:bg-green-700 text-white"
              loading={loading}
              onClick={() => handleCompleteAppeal(item.id, "POSITIVE")}
            >
              Yakunlash (Ijobiy)
            </UniversalBtn>
            <UniversalBtn
              className="!min-h-[30px] text-sm bg-red-500 hover:bg-red-600 text-white"
              loading={loading}
              onClick={() => handleCompleteAppeal(item.id, "NEGATIVE")}
            >
              Yakunlash (Salbiy)
            </UniversalBtn>
            <UniversalBtn
              onClick={() => {
                setIsReplying(null);
                setReplyText("");
              }}
              className="bg-main-grey hover:!bg-main-blackish !text-main-blackish hover:!text-white !min-h-[30px] text-sm"
            >
              Bekor qilish
            </UniversalBtn>
          </div>
        </div>
      ) : isRedirecting === item.id ? (
        <div className="flex flex-col gap-2 mt-2">
          <SearchableSelect
            placeholder="Viloyat tanlang"
            labelText={"Viloyat"}
            endpoint="/regions"
            queryParam="name"
            value={formData.region_id}
            defaultOptions={regions ?? []}
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                region_id: selected?.value || null,
              }))
            }
          />
          <SearchableSelect
            placeholder="Bo‘limni tanlang"
            labelText={"Bo‘lim"}
            endpoint="/departments"
            queryParam="name"
            value={formData.department_id}
            defaultOptions={categories ?? []}
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                department_id: selected?.value || null,
              }))
            }
          />
          <SearchableSelect
            placeholder="Xodim tanlang"
            labelText="Xodim"
            defaultOptions={
              users?.data?.map((emp) => ({
                id: emp.id,
                name: emp.fullName,
              })) ?? []
            }
            value={formData.operator_id}
            onChange={(selected) =>
              setFormData((prev) => ({
                ...prev,
                operator_id: selected?.value || null,
              }))
            }
            isDisabled={isLoadingOperator}
          />
          <div className="flex gap-2">
            <UniversalBtn
              loading={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-white !min-h-[30px] text-sm"
              onClick={() => handleRedirect(item.id)}
            >
              Yo‘naltirish
            </UniversalBtn>
            <UniversalBtn
              onClick={() => setIsRedirecting(null)}
              className="bg-main-grey hover:!bg-main-blackish !text-main-blackish hover:!text-white !min-h-[30px] text-sm"
            >
              Bekor qilish
            </UniversalBtn>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 mt-2">
          {status == "NEW" ? (
            <UniversalBtn
              className="!min-h-[30px] text-sm"
              onClick={() => setIsReplying(item.id)}
            >
              Javob yozish
            </UniversalBtn>
          ) : (
            ""
          )}
          <UniversalBtn
            className="!min-h-[30px] text-sm bg-yellow-500 hover:bg-yellow-600"
            onClick={() => setIsRedirecting(item.id)}
          >
            {status == "NEW" ? "Yo‘naltirish" : "Qayta yo'naltirish"}
          </UniversalBtn>
        </div>
      )}
    </>
  );
};

export default AppealActions;
