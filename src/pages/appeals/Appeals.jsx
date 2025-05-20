import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import { formatDate } from "@/utils/dateFormatter";
import useInitDataStore from "@/store/initDataStore";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";
import UserCard from "./components/UserCard";
import AppealActions from "./components/AppealActions";
import EmployeeCard from "./components/EmployeeCard";
import BackLink from "@/components/BackLink/BackLink";
function Appeals() {
  const { regions, categories } = useInitDataStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const userId = Number(searchParams.get("user_id")) || null;

  const {
    data: appeals,
    isLoading,
    error,
  } = useRequest(
    `/operator/applications?page=${currentPage}&${
      userId ? `user_id=${userId}` : ""
    }`
  );
  console.log(appeals);

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title={
          userId
            ? `${appeals?.data[0].user_name}ning arizalari`
            : "Barcha arizalar"
        }
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Murojaatchilar", link: -1 },
          {
            label: userId
              ? `${appeals?.data[0].user_name}ning arizalari`
              : "Barcha arizalar",
          },
        ]}
      />
      <div className="px-[20px] grow h-full overflow-y-auto py-5">
        {appeals?.totalItems == 0 ? (
          <EmptyText text={"Barcha arizalar hali yo'q!"} />
        ) : (
          <div className="overflow-hidden flex flex-col h-full grow">
            <BackLink links={{ title: "Orqaga qaytish", link: `-1` }} />
            <div className="flex flex-col mt-4 h-full overflow-auto gap-4">
              {appeals.data.map((item) => {
                if (item?.status == "NEW") {
                  {
                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-lg shadow p-4 border border-gray-200"
                      >
                        {/* Murojaatchi xabari */}
                        <UserCard item={item} />
                        <AppealActions
                          status={item.status}
                          item={item}
                          regions={regions}
                          categories={categories}
                          currentPage={currentPage}
                        />
                      </div>
                    );
                  }
                } else if (item?.status == "INPROGRESS")
                  return (
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
                  );
                else {
                  return (
                    <div
                      key={item.id}
                      className="bg-white grid grid-cols-2 gap-4 rounded-xl shadow-md p-4 border border-gray-100 hover:shadow-lg transition duration-300"
                    >
                      <UserCard item={item} />

                      {/* Operator javobi bo‘lsa */}
                      <EmployeeCard item={item} />
                    </div>
                  );
                }
              })}
            </div>
            <PaginationComp
              current={appeals?.currentPage}
              totalPages={appeals?.totalPage}
              total={appeals?.totalItems}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Appeals;
