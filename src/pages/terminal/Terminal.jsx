import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import {
  terminalTableHeadItems,
  terminalTableHeadItems1,
} from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import TerminalTbody from "./components/TerminalTbody.jsx";
import { size } from "@/constants/paginationStuffs.js";
import { useUserStore } from "@/store/userStore.js";
import TerminalFilter from "./components/TerminalFilter.jsx";

function Terminal() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const { user } = useUserStore();
  const {
    data: terminals,
    isLoading,
    error,
  } = useRequest(
    `terminal?${searchParams.toString() || `page=${currentPage}&size=${size}`}`
  );
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Терминалы"
        breadcrumbs={[{ label: "Админ", link: "/" }, { label: "Терминалы" }]}
      >
        {user?.role?.roleId == 1 && (
          <UniversalBtn
            onClick={() => navigate(`addTerminal`)}
            iconPosition="left"
            icon={Plus}
          >
            Добавить терминал
          </UniversalBtn>
        )}
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {terminals?.totalItems == 0 && searchParams.toString() === "" ? (
          <EmptyText text={"Терминалы пока нет"} />
        ) : (
          <UniversalTable
            datas={terminals}
            tableHeadItems={
              user?.role?.roleId == 1
                ? terminalTableHeadItems
                : terminalTableHeadItems1
            }
            className="grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] px-4 place-items-center"
          >
            <TerminalFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <TerminalTbody
              className={
                "grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] px-4 place-items-center"
              }
              datas={terminals?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Terminal;
