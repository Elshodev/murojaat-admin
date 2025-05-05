import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import OperatorFormEdit from "./components/OperatorFormEdit.jsx";

function OperatorSinglePage() {
  const { id } = useParams();
  const { data: user, isLoading, error } = useRequest(`/operator/${id}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  return (
    <>
      <PageHeader
        title="Xodim ma'lumotlarini o'zgartirish"
        breadcrumbs={[
          { label: "Admin", link: "/" },
          { label: "Xodimlar", link: "/operators" },
          { label: user?.full_name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Xodimlar", link: `/operators` }} />
          <OperatorFormEdit data={user} />
        </div>
      </div>
    </>
  );
}

export default OperatorSinglePage;
