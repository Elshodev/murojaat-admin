import { useSearchParams } from "react-router-dom";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { usersGridHeaderConfig } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import UserTbody from "./components/UserTbody.jsx";
import GridTableHeader from "./components/GridTableHeader.jsx";
import UserFilter from "./components/UserFilter.jsx";

function Users() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: users,
    isLoading,
    error,
  } = useRequest(`/operator/users?${searchParams.toString()}`);

  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  return (
    <>
      <PageHeader
        title="Murojaatchilar"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Murojaatchilar" },
        ]}
      />

      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {users?.totalItems === 0 && searchParams.toString() === "" ? (
          <EmptyText text="Murojaatchilar hali yo'q!" />
        ) : (
          <UniversalTable datas={users}>
            <GridTableHeader config={usersGridHeaderConfig} />
            <UserFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <UserTbody
              className="grid-cols-[50px_1fr_1fr_1fr_1fr_2fr] place-items-center"
              datas={users?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Users;
