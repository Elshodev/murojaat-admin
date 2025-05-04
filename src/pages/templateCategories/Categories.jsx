import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { categoriesTableHeadItems } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryTbody from "./components/CategoryTbody.jsx";

function Categories() {
  const navigate = useNavigate();

  const {
    data: categories,
    isLoading,
    error,
  } = useRequest(`/products/template/category?page=1&size=10`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Шаблоны категории"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Шаблоны категории" },
        ]}
      >
        <UniversalBtn
          onClick={() => navigate(`addCategory`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить шаблон категории
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {categories?.data.length == 0 ? (
          <EmptyText text={"Шаблоны категории пока нет"} />
        ) : (
          <UniversalTable
            datas={categories}
            tableHeadItems={categoriesTableHeadItems}
            className="grid-cols-[1fr_auto] px-4 place-items-center"
          >
            <CategoryTbody
              className={"grid-cols-[1fr_auto] px-4 place-items-center"}
              datas={categories?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Categories;
