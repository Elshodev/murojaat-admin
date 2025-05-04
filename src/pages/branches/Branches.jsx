import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { branchTableHeadItems } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BranchTbody from "./components/BranchTbody.jsx";
import { size } from "@/constants/paginationStuffs.js";
import BranchFilter from "./components/BranchFilter.jsx";

function Branches() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: branches,
    isLoading,
    error,
  } = useRequest(
    `/branches?${searchParams.toString() || `page=${currentPage}&size=${size}`}`
  );
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Филиалы"
        breadcrumbs={[{ label: "Админ", link: "/" }, { label: "Филиалы" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addBranch`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить филиал
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {branches?.totalItems == 0 && searchParams.toString() === "" ? (
          <EmptyText text={"Филиалы пока нет"} />
        ) : (
          <UniversalTable
            datas={branches}
            tableHeadItems={branchTableHeadItems}
            className="grid-cols-[1fr_1fr_1fr_1.5fr_auto] px-4 place-items-center"
          >
            <BranchFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <BranchTbody
              className={
                "grid-cols-[1fr_1fr_1fr_1.5fr_auto] px-4 place-items-center"
              }
              datas={branches?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Branches;
