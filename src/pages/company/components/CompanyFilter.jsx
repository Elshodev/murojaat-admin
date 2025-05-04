import CustomInput from "@/components/formElements/CustomInput.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import { size } from "@/constants/paginationStuffs.js";

const CompanyFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const [filterData, setFilterData] = useState({
    name: searchParams.get("name") || "",
    login: searchParams.get("login") || "",
    region: searchParams.get("region") || "",
  });

  useEffect(() => {
    setFilterData({
      name: searchParams.get("name") || "",
      login: searchParams.get("login") || "",
      region: searchParams.get("region") || "",
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
    if (filterData.login) params.set("login", filterData.login);
    if (filterData.region) params.set("region", filterData.region);

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid-cols-[1fr_1fr_1fr_1.5fr_auto] shrink-0 grid w-full min-h-[36px] mt-1 rounded py-1 bg-white items-center gap-4 text-sm font-medium"
    >
      <CustomInput
        onChange={handleChange}
        placeholder="Имя"
        name="name"
        className="bg-white !border-main-blue"
        value={filterData.name}
        required={false}
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Войти"
        name="login"
        className="bg-white !border-main-blue"
        value={filterData.login}
        required={false}
      />
      <div></div>
      <div></div>
      <UniversalBtn className="self-end justify-center" type="submit">
        Поиск
      </UniversalBtn>
    </form>
  );
};

export default CompanyFilter;
