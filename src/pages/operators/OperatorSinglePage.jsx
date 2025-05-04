import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import CompanyFormEdit from "./components/UsersFormEdit.jsx";

function OperatorSinglePage() {
  const { id } = useParams();
  const { data: user, isLoading, error } = useRequest(`/users/${id}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;
  return (
    <>
      <PageHeader
        title="Изменить пользователя"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Пользователи", link: "/users" },
          { label: user?.name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Пользователи", link: `/users` }} />
          <CompanyFormEdit data={user} />
        </div>
      </div>
    </>
  );
}

export default OperatorSinglePage;
