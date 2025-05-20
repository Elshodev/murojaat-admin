import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { format } from "date-fns";

import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import EmptyText from "@/components/EmptyText/EmptyText";
import PaginationComp from "@/components/Paginations/PaginationComp";

import { useRequest } from "@/hooks/useRequest";
import useInitDataStore from "@/store/initDataStore";

import UserCard from "../components/UserCard";
import EmployeeCard from "../components/EmployeeCard";
import AppealActions from "../components/AppealActions";
import DateRangeTabs from "../components/DateRangeTabs";
import UniversalBtn from "@/components/buttons/UniversalBtn";

function NewAppeals() {
  const { regions, categories } = useInitDataStore();
  const [searchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [formData, setFormData] = useState({});
  const [searchData, setSearchData] = useState({});

  const queryString = useMemo(() => {
    let query = `?status=INPROGRESS&page=${currentPage}`;
    if (searchData.fromDate) {
      query += `&fromDate=${format(searchData.fromDate, "yyyy-MM-dd")}`;
    }
    if (searchData.toDate) {
      query += `&toDate=${format(searchData.toDate, "yyyy-MM-dd")}`;
    }
    return query;
  }, [currentPage, searchData]);

  const {
    data: appealsProgress,
    isLoading,
    error,
  } = useRequest(`/operator/applications${queryString}`);

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
        <div className="flex items-center gap-4 mb-4">
          <DateRangeTabs formData={formData} setFormData={setFormData} />
          {searchData?.toDate && (
            <UniversalBtn
              onClick={() => {
                setSearchData({});
                setFormData({});
              }}
            >
              Tozalash
            </UniversalBtn>
          )}
          <UniversalBtn onClick={() => setSearchData(formData)}>
            Qidirish
          </UniversalBtn>
        </div>
        {appealsProgress?.totalItems === 0 ? (
          <EmptyText text="Jarayondagi arizalar hali yo'q!" />
        ) : (
          <div className="overflow-hidden flex flex-col h-full grow">
            <div className="flex flex-col h-full overflow-auto gap-4">
              {appealsProgress.data.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-4 border border-gray-200"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <UserCard item={item} />
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
