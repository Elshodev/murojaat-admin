import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { formatDate } from "@/utils/dateFormatter";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";

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
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base">
                      Murojaatchi:{" "}
                      <span className="font-semibold">{item.user_name}</span>
                    </h3>
                    <span className="text-sm text-gray-500">
                      {formatDate(item.created_at)}
                    </span>
                  </div>
                  <p className="text-sm mb-2">{item.message}</p>
                  <p className="text-sm mb-2">{item.status}</p>
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
