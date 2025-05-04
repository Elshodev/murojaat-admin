import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import PageLoader from "@/components/loader/PageLoader.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import { useParams } from "react-router-dom";
import ProductFormEdit from "./components/ProductFormEdit.jsx";
import useInitDataStore from "@/store/initDataStore.js";

function ProductSinglePage() {
  const { id } = useParams();
  const { branches } = useInitDataStore();

  const { data: product, isLoading, error } = useRequest(`/products/${id}`);
  const { data: categories, isLoading: categLoading } =
    useRequest(`/products/category`);
  if (isLoading || categLoading) return <PageLoader />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <>
      <PageHeader
        title="Изменить продукт"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Продукты", link: "/products" },
          { label: product?.name },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Продукты", link: `/products` }} />
          <ProductFormEdit
            branches={branches}
            datas={categories.data}
            data={product}
          />
        </div>
      </div>
    </>
  );
}

export default ProductSinglePage;
