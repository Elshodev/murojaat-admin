import EmptyText from "@/components/EmptyText/EmptyText";
import PageHeader from "@/components/header/PageHeader";
import PageLoader from "@/components/loader/PageLoader";
import { useRequest } from "@/hooks/useRequest";
import PaginationComp from "@/components/Paginations/PaginationComp";
import { useSearchParams } from "react-router-dom";
import UserCard from "../components/UserCard";
import EmployeeCard from "../components/EmployeeCard";
import { useMemo } from "react";

function CompletedAppeals() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const activeTab = searchParams.get("tab") || "all";
  // 💡 Requestni tabga qarab o‘zgartiramiz
  const apiUrl = useMemo(() => {
    if (activeTab === "positive") {
      return `/operator/applications?status=POSITIVE&page=${currentPage}`;
    } else if (activeTab === "negative") {
      return `/operator/applications?status=NEGATIVE&page=${currentPage}`;
    } else {
      return `/operator/applications?status=COMPLETED&page=${currentPage}`;
    }
  }, [activeTab, currentPage]);
  const { data: appealsCompleted, isLoading, error } = useRequest(apiUrl);
  const tabs = [
    { label: "Barchasi", value: "all" },
    { label: "✅ Positive", value: "positive" },
    { label: "❌ Negative", value: "negative" },
  ];
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  const handleTabChange = (tab) => {
    setSearchParams({ tab, page: 1 }); // page ni 1ga reset qilamiz
  };
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
        <div className="flex gap-4 mb-5">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleTabChange(tab.value)}
              className={`relative cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-300 border ${
                activeTab === tab.value
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100 hover:border-blue-400"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
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
