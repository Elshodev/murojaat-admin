import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import TerminalForm from "./components/TerminalForm.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { size } from "@/constants/paginationStuffs.js";

function AddTerminal() {
  const { data: branches, isLoading } = useRequest(
    `/branches?page=1&size=${size}`
  );
  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageHeader
        title="Добавить терминал"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Терминалы", link: "/terminal" },
          { label: "Добавить терминал" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Терминалы", link: `/terminal` }} />
          <TerminalForm datas={branches.data} />
        </div>
      </div>
    </>
  );
}

export default AddTerminal;
