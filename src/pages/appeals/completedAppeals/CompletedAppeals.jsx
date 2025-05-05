import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import EmployeeCard from "../components/EmployeeCard";

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
                  <UserCard item={item} />

                  {/* Operator javobi bo‘lsa */}
                  <EmployeeCard item={item} />
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
