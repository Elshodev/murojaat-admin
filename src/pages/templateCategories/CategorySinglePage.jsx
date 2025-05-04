import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import CategoryFormEdit from "./components/CategoryFormEdit.jsx";

function CategorySinglePage() {
  const { id } = useParams();
  const {
    data: category,
    isLoading,
    error,
  } = useRequest(`/products/template/category/${id}`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Изменить шаблон категории"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Шаблоны категории", link: "/templateCategories" },
          { label: category?.name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink
            links={{ title: "Шаблоны категории", link: `/templateCategories` }}
          />
          <CategoryFormEdit data={category} />
        </div>
      </div>
    </>
  );
}

export default CategorySinglePage;
