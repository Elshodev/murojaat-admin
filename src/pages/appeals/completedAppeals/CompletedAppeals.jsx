import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { formatDate } from "@/utils/dateFormatter";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";
const statusColor = {
  NEW: "bg-blue-100 text-blue-700",
  INPROGRESS: "bg-yellow-100 text-yellow-700",
  POSITIVE: "bg-green-100 text-green-700",
  NEGATIVE: "bg-red-100 text-red-700",
};

const statusText = {
  NEW: "Yangi",
  INPROGRESS: "Jarayonda",
  POSITIVE: "Ijobiy yakunlangan",
  NEGATIVE: "Salbiy yakunlangan",
};
function CompletedAppeals() {
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: appealsCompleted,
    isLoading,
    error,
  } = useRequest(`/operator/applications?status=COMPLETED&page=${currentPage}`);

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  console.log(appealsCompleted);

  return (
    <>
      <PageHeader
        title="Tugallangan arizalar"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Tugallangan arizalar" },
        ]}
      />
      <div className="px-[20px] grow h-full overflow-y-auto py-5">
        {appealsCompleted?.totalItems == 0 ? (
          <EmptyText text={"Tugallangan arizalar hali yo'q!"} />
        ) : (
          <div className="overflow-hidden flex flex-col h-full grow">
            <div className="flex flex-col h-full overflow-auto gap-4">
              {appealsCompleted.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white grid grid-cols-2 gap-4 rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition duration-300"
                >
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
                      <p className="text-base text-gray-800">{item.message}</p>
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
                        <div className="mb-2">
                          <p className="text-base text-blue-600 font-bold">
                            Javob beruvchi javobi:
                          </p>
                          <p className="text-base text-gray-800">
                            {item.operator_message}
                          </p>
                        </div>
                      )}
                      <span
                        className={`text-xs px-3 py-1 rounded font-medium ${
                          statusColor[item.status] ||
                          "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {statusText[item.status] || "Nomaʼlum holat"}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <PaginationComp
              current={appealsCompleted?.currentPage}
              totalPages={appealsCompleted?.totalPage}
              total={appealsCompleted?.totalItems}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CompletedAppeals;
