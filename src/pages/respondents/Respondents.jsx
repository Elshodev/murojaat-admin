import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";

import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import GridTableHeader from "../users/components/GridTableHeader.jsx";
import { operatorsGridHeaderConfig } from "@/constants/tableHeadNames.js";
import OperatorsTbody from "../operators/components/OperatorsTbody.jsx";

function Respondents() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: users,
    isLoading,
    error,
  } = useRequest(`/operator?role=EMPLOYEE${searchParams.toString()}`);

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Arizaga javob beruvchilar"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Arizaga javob beruvchilar" },
        ]}
      >
        <UniversalBtn
          onClick={() => navigate(`addOperator`)}
          iconPosition="left"
          icon={Plus}
        >
          Arizaga javob beruvchi qo'shish
        </UniversalBtn>
      </PageHeader>

      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {users?.totalItems === 0 && searchParams.toString() === "" ? (
          <EmptyText text="Arizaga javob beruvchilar hali yo'q!" />
        ) : (
          <UniversalTable datas={users}>
            <GridTableHeader config={operatorsGridHeaderConfig} />
            <OperatorsTbody
              className="grid-cols-[50px_1fr_1fr_1fr_1fr_2fr_1fr] place-items-center"
              datas={users?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Respondents;
