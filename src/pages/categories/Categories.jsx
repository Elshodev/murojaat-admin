import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { categoriesGridHeaderConfig } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CategoryTbody from "./components/CategoryTbody.jsx";
import GridTableHeader from "../users/components/GridTableHeader.jsx";

function Categories() {
  const navigate = useNavigate();

  const { data: categories, isLoading, error } = useRequest(`/departments`);
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Bo'limlar"
        breadcrumbs={[{ label: "Admin", link: "/" }, { label: "Bo'limlar" }]}
      >
        <UniversalBtn
          onClick={() => navigate(`addCategory`)}
          iconPosition="left"
          icon={Plus}
        >
          Bo'lim qo'shish
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] grow h-full overflow-hidden flex flex-col py-5">
        {categories?.data.length == 0 ? (
          <EmptyText text={"Bo'limlar hali yo'q!"} />
        ) : (
          <UniversalTable datas={categories}>
            <GridTableHeader config={categoriesGridHeaderConfig} />
            <CategoryTbody
              className={"grid-cols-[50px_1fr_100px] place-items-center"}
              datas={categories?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Categories;
