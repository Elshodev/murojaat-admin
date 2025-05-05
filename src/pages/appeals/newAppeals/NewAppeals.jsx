import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import useInitDataStore from "@/store/initDataStore";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import AppealActions from "../components/AppealActions";

function NewAppeals() {
  const { regions, categories } = useInitDataStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const {
    data: appealsNew,
    isLoading,
    error,
  } = useRequest(`/operator/applications?status=NEW&page=${currentPage}`, 1000);

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Yangi arizalar"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Yangi arizalar" },
        ]}
      />
      <div className="px-[20px] grow h-full overflow-y-auto py-5">
        {appealsNew?.totalItems == 0 ? (
          <EmptyText text={"Yangi arizalar hali yo'q!"} />
        ) : (
          <div className="overflow-hidden flex flex-col h-full grow">
            <div className="flex flex-col h-full overflow-auto gap-4">
              {appealsNew.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  {/* Murojaatchi xabari */}
                  <UserCard item={item} />
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
              current={appealsNew?.currentPage}
              totalPages={appealsNew?.totalPage}
              total={appealsNew?.totalItems}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default NewAppeals;
