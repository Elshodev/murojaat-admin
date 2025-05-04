import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { regionsGridHeaderConfig } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RegionTbody from "./components/RegionTbody.jsx";
import { size } from "@/constants/paginationStuffs.js";
import GridTableHeader from "../users/components/GridTableHeader.jsx";

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
        title="Viloyatlar"
        breadcrumbs={[{ label: "Admin", link: "/" }, { label: "Viloyatlar" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addRegion`)}
          iconPosition="left"
          icon={Plus}
        >
          Viloyat qo'shish
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {regions?.totalItems == 0 && searchParams.toString() === "" ? (
          <EmptyText text={"Viloyatlar hali yo'q!"} />
        ) : (
          <UniversalTable datas={regions}>
            <GridTableHeader config={regionsGridHeaderConfig} />
            <RegionTbody
              className={"grid-cols-[50px_1fr_1fr_100px] place-items-center"}
              datas={regions?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Regions;
