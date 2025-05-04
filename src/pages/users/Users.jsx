import { useNavigate, useSearchParams } from "react-router-dom";
import { Plus } from "lucide-react";

import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { usersTableHeadItems } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { size } from "@/constants/paginationStuffs.js";
import UserTbody from "./components/UserTbody.jsx";
import UserFilter from "./components/UserFilter.jsx";

function Users() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: users,
    isLoading,
    error,
  } = useRequest(
    `/users?${searchParams.toString() || `page=${currentPage}&size=${size}`}`
  );

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Пользователи"
        breadcrumbs={[{ label: "Админ", link: "/" }, { label: "Пользователи" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addUser`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить пользователя
        </UniversalBtn>
      </PageHeader>

      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {users?.totalItems === 0 && searchParams.toString() === "" ? (
          <EmptyText text="Пользователи пока нет" />
        ) : (
          <UniversalTable
            datas={users}
            tableHeadItems={usersTableHeadItems}
            className="grid-cols-[1fr_1fr_.5fr_1fr_1.5fr_1fr_auto] place-items-center"
          >
            <UserFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <UserTbody
              className="grid-cols-[1fr_1fr_.5fr_1fr_1.5fr_1fr_auto] place-items-center"
              datas={users?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Users;
