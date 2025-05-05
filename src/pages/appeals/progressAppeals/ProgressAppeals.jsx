import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { useState } from "react";
import { formatDate } from "@/utils/dateFormatter";
import UniversalBtn from "@/components/buttons/UniversalBtn";
import TextareaAutosize from "react-textarea-autosize";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import useInitDataStore from "@/store/initDataStore";
import { showToast } from "@/utils/toastHelper";
import { useQueryClient } from "@tanstack/react-query";
import request from "@/services/fetch.service";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";

function NewAppeals() {
  const { regions, categories } = useInitDataStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    region_id: null,
    department_id: null,
    operator_id: null,
  });

  const {
    data: appealsProgress,
    isLoading,
    error,
  } = useRequest(
    `/operator/applications?status=INPROGRESS&page=${currentPage}`
  );
  const queryParams = new URLSearchParams({
    role: "EMPLOYEE",
    ...(formData?.region_id && { region_id: formData.region_id }),
    ...(formData?.department_id && { deportament_id: formData.department_id }),
  });

  const { data: users, isLoading: isLoadingOperator } = useRequest(
    `/operator?${queryParams.toString()}`
  );

  const [isReplying, setIsReplying] = useState(null);
  const [isRedirecting, setIsRedirecting] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleReply = (appealId) => {
    setLoading(true);
    request("/operator/application-send-message", "POST", {
      ticket_id: appealId,
      message: replyText,
    })
      .then(() => {
        showToast.success("Arizaga muvaffaqiyatli javob yo'llandi!");
        queryClient.invalidateQueries([
          `/operator/applications?status=NEW&page=${currentPage}`,
        ]);
        setFormData({
          region_id: null,
          department_id: null,
          operator_id: null,
        });
        setIsReplying(null);
        setReplyText("");
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleRedirect = async (appealId) => {
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
        setIsReplying(null);
        setIsRedirecting(null);
        setReplyText("");
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const handleCompleteAppeal = (appealId, status) => {
    setLoading(true);
    request(`/operator/application-close/${appealId}`, "PUT", {
      type: status, // "POSITIVE" yoki "NEGATIVE"
    })
      .then(() => {
        showToast.success("Ariza yakunlandi!");
        queryClient.invalidateQueries([
          `/operator/applications?status=INPROGRESS&page=${currentPage}`,
        ]);
      })
      .catch((error) => {
        console.error("Error:", error);
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Jarayondagi arizalar"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Jarayondagi arizalar" },
        ]}
      />
      <div className="px-[20px] grow h-full overflow-y-auto py-5">
        {appealsProgress?.totalItems == 0 ? (
          <EmptyText text={"Jarayondagi arizalar hali yo'q!"} />
        ) : (
          <div className="overflow-hidden flex flex-col h-full grow">
            <div className="flex flex-col h-full overflow-auto gap-4">
              {appealsProgress.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4">
                    {/* Murojaatchi xabari */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-md border border-gray-200">
                      <div className="mb-2">
                        <p className="text-base text-black font-bold">
                          Murojaat sanasi:
                        </p>
                        <p className="text-base font-medium text-gray-800">
                          {formatDate(item.created_at)}
                        </p>
                      </div>
                      <div className="mb-2">
                        <p className="text-base text-black font-bold">
                          Murojaatchi ismi:
                        </p>
                        <p className="text-base font-medium text-gray-800">
                          {item.user_name}
                        </p>
                      </div>
                      <div>
                        <p className="text-base text-black font-bold">
                          Murojaatchi xabari:
                        </p>
                        <p className="text-base text-gray-800">
                          {item.message}
                        </p>
                      </div>
                    </div>

                    {/* Operator javobi bo‘lsa */}
                    {(item.operator_name || item.operator_message) && (
                      <div className="mb-4 p-4 bg-blue-50 rounded-md border border-blue-200">
                        <div className="mb-2">
                          <p className="text-base text-blue-600 font-bold">
                            Javob berilgan vaqt:
                          </p>
                          <p className="text-base font-medium text-gray-800">
                            {formatDate(item.updated_at)}
                          </p>
                        </div>
                        {item.operator_name && (
                          <div className="mb-2">
                            <p className="text-base text-blue-600 font-bold">
                              Javob beruvchi ismi:
                            </p>
                            <p className="text-base font-medium text-gray-800">
                              {item.operator_name}
                            </p>
                          </div>
                        )}
                        {item.operator_message && (
                          <div>
                            <p className="text-base text-blue-600 font-bold">
                              Javob beruvchi javobi:
                            </p>
                            <p className="text-base text-gray-800">
                              {item.operator_message}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
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
                          className="text-sm"
                          onClick={() => handleReply(item.id)}
                        >
                          Yuborish
                        </UniversalBtn>
                        <UniversalBtn
                          onClick={() => setIsReplying(null)}
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
                          users?.data.map((emp) => ({
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
                    <div className="flex gap-2 mt-2">
                      <UniversalBtn
                        className="!min-h-[30px] text-sm bg-yellow-500 hover:bg-yellow-600"
                        onClick={() => setIsRedirecting(item.id)}
                      >
                        Qayta yo‘naltirish
                      </UniversalBtn>
                      <UniversalBtn
                        className="!min-h-[30px] text-sm bg-green-600 hover:bg-green-700 text-white"
                        loading={loading}
                        onClick={() =>
                          handleCompleteAppeal(item.id, "POSITIVE")
                        }
                      >
                        Yakunlash (Ijobiy)
                      </UniversalBtn>
                      <UniversalBtn
                        className="!min-h-[30px] text-sm bg-red-500 hover:bg-red-600 text-white"
                        loading={loading}
                        onClick={() =>
                          handleCompleteAppeal(item.id, "NEGATIVE")
                        }
                      >
                        Yakunlash (Salbiy)
                      </UniversalBtn>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <PaginationComp
              current={appealsProgress?.currentPage}
              totalPages={appealsProgress?.totalPage}
              total={appealsProgress?.totalItems}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default NewAppeals;
