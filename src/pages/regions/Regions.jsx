import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { regionsTableHeadItems } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegionTbody from "./components/RegionTbody.jsx";
import { size } from "@/constants/paginationStuffs.js";
import RegionFilter from "./components/RegionFilter.jsx";

function Regions() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: regions,
    isLoading,
    error,
  } = useRequest(
    `/regions?${searchParams.toString() || `page=${currentPage}&size=${size}`}`
  );
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Регионы"
        breadcrumbs={[{ label: "Админ", link: "/" }, { label: "Регионы" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addRegion`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить регион
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {regions?.totalItems == 0 && searchParams.toString() === "" ? (
          <EmptyText text={"Регионы пока нет"} />
        ) : (
          <UniversalTable
            datas={regions}
            tableHeadItems={regionsTableHeadItems}
            className="grid-cols-[1fr_1fr_auto] px-4 place-items-center"
          >
            <RegionFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <RegionTbody
              className={"grid-cols-[1fr_1fr_auto] px-4 place-items-center"}
              datas={regions?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Regions;
