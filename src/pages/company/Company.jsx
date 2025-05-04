import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { companyTableHeadItems } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CompanyTbody from "./components/CompanyTbody.jsx";
import { size } from "@/constants/paginationStuffs.js";
import CompanyFilter from "./components/CompanyFilter.jsx";

function Company() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: companies,
    isLoading,
    error,
  } = useRequest(
    `/company?${searchParams.toString() || `page=${currentPage}&size=${size}`}`
  );
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Компании"
        breadcrumbs={[{ label: "Админ", link: "/" }, { label: "Компании" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addCompany`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить компанию
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {companies?.totalItems == 0 && searchParams.toString() === "" ? (
          <EmptyText text={"Компании пока нет"} />
        ) : (
          <UniversalTable
            datas={companies}
            tableHeadItems={companyTableHeadItems}
            className="grid-cols-[1fr_1fr_1fr_1.5fr_auto] px-4 place-items-center"
          >
            <CompanyFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <CompanyTbody
              className={
                "grid-cols-[1fr_1fr_1fr_1.5fr_auto] px-4 place-items-center"
              }
              datas={companies?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Company;
