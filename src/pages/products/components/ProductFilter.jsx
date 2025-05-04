import CustomInput from "@/components/formElements/CustomInput.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import { size } from "@/constants/paginationStuffs.js";
import { useRequest } from "@/hooks/useRequest";
import PageLoader from "@/components/loader/PageLoader";
import SearchableSelect from "@/components/formElements/SearchableSelect";

const ProductFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const { data: categories, isLoading } = useRequest(`/products/category`);
  const [filterData, setFilterData] = useState({
    name: searchParams.get("name") || "",
    categoryId: searchParams.get("categoryId") || "",
  });

  useEffect(() => {
    setFilterData({
      name: searchParams.get("name") || "",
      categoryId: searchParams.get("categoryId") || "",
    });
  }, [searchParams]);
  if (isLoading) return <PageLoader />;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("page", currentPage);
    params.set("size", size);

    if (filterData.name) params.set("name", filterData.name);
    if (filterData.categoryId) params.set("categoryId", filterData.categoryId);

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr_auto] shrink-0 grid w-full min-h-[36px] mt-1 rounded py-1 bg-white items-center gap-4 text-sm font-medium"
    >
      <CustomInput
        onChange={handleChange}
        placeholder="Имя"
        name="name"
        className="bg-white"
        value={filterData.name}
        required={false}
      />
      <SearchableSelect
        placeholder="Выберите категорию"
        endpoint="/products/category"
        queryParam="name"
        value={filterData?.categoryId}
        defaultOptions={categories?.data ?? []}
        onChange={(selected) => {
          setFilterData((prev) => ({
            ...prev,
            categoryId: selected?.value || "",
          }));
        }}
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Количество"
        name="quantity"
        className="bg-white"
        value={filterData.quantity}
        required={false}
        type="number"
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Цена"
        name="price"
        className="bg-white"
        value={filterData.price}
        required={false}
        type="number"
      />
      <div></div>
      <div></div>
      <UniversalBtn className="self-end justify-center" type="submit">
        Поиск
      </UniversalBtn>
    </form>
  );
};

export default ProductFilter;
