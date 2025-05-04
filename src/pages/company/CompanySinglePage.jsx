import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import CompanyFormEdit from "./components/CompanyFormEdit.jsx";

function CompanySinglePage() {
  const { id } = useParams();
  const { data: company, isLoading, error } = useRequest(`/company/${id}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Изменить компанию"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Компании", link: "/company" },
          { label: company?.name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Компании", link: `/company` }} />
          <CompanyFormEdit data={company} />
        </div>
      </div>
    </>
  );
}

export default CompanySinglePage;
