import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";

import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import OperatorsTbody from "./components/OperatorsTbody.jsx";
import GridTableHeader from "../users/components/GridTableHeader.jsx";
import { operatorsGridHeaderConfig } from "@/constants/tableHeadNames.js";
import OperatorFilter from "./components/OperatorFilter.jsx";

function Operators() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: users,
    isLoading,
    error,
  } = useRequest(`/operator?${searchParams.toString()}`);

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Xodimlar"
        breadcrumbs={[{ label: "Admin", link: "/" }, { label: "Xodimlar" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addOperator`)}
          iconPosition="left"
          icon={Plus}
        >
          Xodim qo'shish
        </UniversalBtn>
      </PageHeader>

      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {users?.totalItems === 0 && searchParams.toString() === "" ? (
          <EmptyText text="Xodimlar hali yo'q!" />
        ) : (
          <UniversalTable datas={users}>
            <GridTableHeader config={operatorsGridHeaderConfig} />
            <OperatorFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <OperatorsTbody
              className="grid-cols-[50px_1fr_1fr_1fr_1fr_1.5fr_100px] place-items-center"
              datas={users?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Operators;
