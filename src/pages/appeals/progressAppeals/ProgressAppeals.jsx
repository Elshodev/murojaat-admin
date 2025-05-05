import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import useInitDataStore from "@/store/initDataStore";

import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import EmployeeCard from "../components/EmployeeCard";
import AppealActions from "../components/AppealActions";

function NewAppeals() {
  const { regions, categories } = useInitDataStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: appealsProgress,
    isLoading,
    error,
  } = useRequest(
    `/operator/applications?status=INPROGRESS&page=${currentPage}`
  );

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
                    <UserCard item={item} />

                    {/* Operator javobi bo‘lsa */}
                    <EmployeeCard item={item} />
                  </div>
                  <AppealActions
                    item={item}
                    status={item.status}
                    regions={regions}
                    categories={categories}
                    currentPage={currentPage}
                  />
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
