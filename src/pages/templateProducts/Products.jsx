import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import EmptyText from "@/components/EmptyText/EmptyText.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import UniversalTable from "@/components/tables/UniversalTables.jsx";
import { productTableHeadItems } from "@/constants/tableHeadNames.js";
import { useRequest } from "@/hooks/useRequest.js";
import { Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductTbody from "./components/ProductTbody.jsx";
import ProductFilter from "./components/ProductFilter.jsx";
import { size } from "@/constants/paginationStuffs.js";

function Products() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const {
    data: products,
    isLoading,
    error,
  } = useRequest(
    `/products/template?${
      searchParams.toString() || `page=${currentPage}&size=${size}`
    }`
  );
  if (isLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Шаблонные продукты"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Шаблонные продукты" },
        ]}
      >
        <UniversalBtn
          onClick={() => navigate(`addProduct`)}
          iconPosition="left"
          icon={Plus}
        >
          Добавить шаблонные продукт
        </UniversalBtn>
      </PageHeader>
      <div className="px-[20px] h-full overflow-hidden flex flex-col py-5">
        {products?.totalItems == 0 && searchParams.toString() === "" ? (
          <EmptyText text={"Шаблонные продукты пока нет"} />
        ) : (
          <UniversalTable
            datas={products}
            tableHeadItems={productTableHeadItems}
            className="grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_auto] px-4 place-items-center"
          >
            <ProductFilter
              searchParams={searchParams}
              currentPage={currentPage}
              setSearchParams={setSearchParams}
            />
            <ProductTbody
              className={
                "grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_auto] px-4 place-items-center"
              }
              datas={products?.data}
            />
          </UniversalTable>
        )}
      </div>
    </>
  );
}

export default Products;
