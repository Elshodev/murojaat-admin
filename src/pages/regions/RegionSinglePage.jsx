import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import RegionFormEdit from "./components/RegionFormEdit.jsx";

function RegionSinglePage() {
  const { id } = useParams();
  const { data: region, isLoading, error } = useRequest(`/regions/${id}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Изменить регион"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Регионы", link: "/regions" },
          { label: region?.name },
        ]}
      />
      <div className="mx-auto px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Регионы", link: `/regions` }} />
          <RegionFormEdit data={region} />
        </div>
      </div>
    </>
  );
}

export default RegionSinglePage;
