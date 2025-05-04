import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import BranchFormEdit from "./components/BranchFormEdit.jsx";

function BranchSinglePage() {
  const { id } = useParams();
  const { data: branch, isLoading, error } = useRequest(`/branches/${id}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title={`Изменить филиал`}
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Филиалы", link: "/branches" },
          { label: branch?.name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Филиалы", link: `/branches` }} />
          <BranchFormEdit data={branch} />
        </div>
      </div>
    </>
  );
}

export default BranchSinglePage;
