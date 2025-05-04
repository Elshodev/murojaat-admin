import CustomInput from "@/components/formElements/CustomInput.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import { size } from "@/constants/paginationStuffs.js";

const RegionFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const [filterData, setFilterData] = useState({
    name: searchParams.get("name") || "",
  });

  useEffect(() => {
    setFilterData({
      name: searchParams.get("name") || "",
    });
  }, [searchParams]);
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

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid-cols-[1fr_1fr_auto] shrink-0 grid w-full min-h-[36px] mt-1 rounded py-1 bg-white items-center gap-4 text-sm font-medium"
    >
      <CustomInput
        onChange={handleChange}
        placeholder="Имя"
        name="name"
        className="bg-white !border-main-blue"
        value={filterData.name}
        required={false}
      />
      <div></div>
      <UniversalBtn className="self-end justify-center" type="submit">
        Поиск
      </UniversalBtn>
    </form>
  );
};

export default RegionFilter;
