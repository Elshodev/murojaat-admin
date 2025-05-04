import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import ProductForm from "./components/ProductForm.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import PageLoader from "@/components/loader/PageLoader.jsx";
import useInitDataStore from "@/store/initDataStore.js";

function AddProduct() {
  const { data: categories, isLoading } = useRequest(`/products/category`);
  const { branches } = useInitDataStore();
  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageHeader
        title="Добавить продукт"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Продукты", link: "/products" },
          { label: "Добавить продукт" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink links={{ title: "Продукты", link: `/products` }} />
          <ProductForm branches={branches} datas={categories.data} />
        </div>
      </div>
    </>
  );
}

export default AddProduct;
