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
  } = useRequest(`/products/category`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Категории"
        breadcrumbs={[{ label: "Админ", link: "/" }, { label: "Категории" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addCategory`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить категорию
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {categories?.data.length == 0 ? (
          <EmptyText text={"Категории пока нет"} />
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
