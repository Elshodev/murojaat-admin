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

  // const { data, isLoading, error } = useRequest(`/products/category`);
  // if (isLoading) return <PageLoader />;
  // if (error) return <p className="text-red-500">{error.message}</p>;
  const categories = {
    data: [
      {
        id: 1,
        name: "Axborot texnologiyalarini rivojlantirish boshqarmasi",
        createdAt: "2025-04-29T14:41:51.692Z",
        updatedAt: "2025-04-29T14:41:51.692Z",
      },
      {
        id: 2,
        name: "Ma'muriy amaliyot markazi",
        createdAt: "2025-04-29T14:42:08.337Z",
        updatedAt: "2025-04-29T14:42:08.337Z",
      },
      {
        id: 3,
        name: "Tashkiliy boshqarma",
        createdAt: "2025-04-29T16:23:45.324Z",
        updatedAt: "2025-04-29T16:23:45.324Z",
      },
      {
        id: 4,
        name: "Ro'yxatdan o'tkazish va imtihon olish bo'limi",
        createdAt: "2025-04-29T16:24:09.262Z",
        updatedAt: "2025-04-29T16:24:09.262Z",
      },
      {
        id: 5,
        name: "Texnika nazorato bo'limi",
        createdAt: "2025-04-29T16:24:24.455Z",
        updatedAt: "2025-04-29T16:24:24.455Z",
      },
      {
        id: 6,
        name: "Yo'l patrul xizmati faoliyatini tashkil etish bo'limi",
        createdAt: "2025-04-29T16:25:00.654Z",
        updatedAt: "2025-04-29T16:25:00.654Z",
      },
      {
        id: 7,
        name: "Moliya va moddiy texnika ta'minoti",
        createdAt: "2025-04-29T16:25:15.627Z",
        updatedAt: "2025-04-29T16:25:15.627Z",
      },
      {
        id: 8,
        name: "Ma'naviy ma'rifiy ishlar va kadrlar bilan ta'minlash bo'limi",
        createdAt: "2025-04-29T16:25:42.229Z",
        updatedAt: "2025-04-29T16:25:42.229Z",
      },
      {
        id: 9,
        name: "Muammolarni o'rganish markazi",
        createdAt: "2025-04-29T16:25:55.393Z",
        updatedAt: "2025-04-29T16:25:55.393Z",
      },
      {
        id: 10,
        name: "Yo'l infratuzilmasini nazorat qilish bo'limi",
        createdAt: "2025-04-29T16:26:19.359Z",
        updatedAt: "2025-04-29T16:26:19.359Z",
      },
    ],
    totalPage: 1,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
    totalItems: 6,
  };
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
