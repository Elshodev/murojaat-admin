import BackLink from "@/components/BackLink/BackLink.jsx";
import PageHeader from "@/components/header/PageHeader.jsx";
import ProductForm from "./components/ProductForm.jsx";
import { useRequest } from "@/hooks/useRequest.js";
import PageLoader from "@/components/loader/PageLoader.jsx";
import useInitDataStore from "@/store/initDataStore.js";

function AddProduct() {
  const { data: categories, isLoading } = useRequest(
    `/products/template/category?page=1&size=10`
  );
  const { branches } = useInitDataStore();
  if (isLoading) return <PageLoader />;

  return (
    <>
      <PageHeader
        title="Добавить шаблонные продукт"
        breadcrumbs={[
          { label: "Админ", link: "/" },
          { label: "Шаблонные продукты", link: "/templateProducts" },
          { label: "Добавить шаблонные продукт" },
        ]}
      />
      <div className="px-[20px] py-5">
        <div className="flex flex-col items-start gap-3 gap-y-[50px] bg-white p-6">
          <BackLink
            links={{ title: "Шаблонные продукты", link: `/templateProducts` }}
          />
          <ProductForm branches={branches} datas={categories.data} />
        </div>
      </div>
    </>
  );
}

export default AddProduct;
