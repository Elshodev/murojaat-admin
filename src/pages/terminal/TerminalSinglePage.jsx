import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import TerminalFormEdit from "./components/TerminalFormEdit.jsx";
import { size } from "@/constants/paginationStuffs.js";

function TerminalSinglePage() {
  const { id } = useParams();
  const { data: terminal, isLoading, error } = useRequest(`terminal/${id}`);
  const { data: branches, isLoading: branchLoading } = useRequest(
    `/branches?page=1&size=${size}`
  );
  if (isLoading || branchLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Добавить компанию"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Терминалы", link: "/terminal" },
          { label: terminal?.name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Терминалы", link: `/terminal` }} />
          <TerminalFormEdit datas={branches.data} data={terminal} />
        </div>
      </div>
    </>
  );
}

export default TerminalSinglePage;
