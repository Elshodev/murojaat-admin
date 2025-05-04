import CustomInput from "@/components/formElements/CustomInput.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import useInitDataStore from "@/store/initDataStore.js";
import { size } from "@/constants/paginationStuffs.js";

const UserFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const { roles } = useInitDataStore();
  const [filterData, setFilterData] = useState({
    name: searchParams.get("name") || "",
    login: searchParams.get("login") || "",
    role: searchParams.get("roleId") || "",
    company: searchParams.get("company") || "",
    branch: searchParams.get("branch") || "",
  });

  useEffect(() => {
    setFilterData({
      name: searchParams.get("name") || "",
      login: searchParams.get("login") || "",
      role: searchParams.get("roleId") || "",
      company: searchParams.get("company") || "",
      branch: searchParams.get("branch") || "",
    });
  }, [searchParams]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFilterData((prev) => ({ ...prev, role: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("page", currentPage);
    params.set("size", size);

    if (filterData.name) params.set("name", filterData.name);
    if (filterData.login) params.set("login", filterData.login);
    if (filterData.role) params.set("roleId", filterData.role);
    if (filterData.company) params.set("company", filterData.company);
    if (filterData.branch) params.set("branch", filterData.branch);

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid-cols-[1fr_1fr_.5fr_1fr_1.5fr_1fr_auto] shrink-0 px-4 grid w-full min-h-[36px] mt-1 rounded py-1 bg-white items-center gap-4 text-sm font-medium"
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
      <CustomSelect
        name="role"
        value={filterData.role}
        onChange={(e) => handleSelectChange(e.target.value)}
        options={roles}
        placeholder="Выберите роль"
        className="!bg-white !border-main-blue rounded"
        required={false}
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Компания"
        name="company"
        className="bg-white !border-main-blue"
        value={filterData.company}
        required={false}
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Филиал"
        name="branch"
        className="bg-white !border-main-blue"
        value={filterData.branch}
        required={false}
      />
      <div></div>
      <UniversalBtn className="self-end justify-center" type="submit">
        Поиск
      </UniversalBtn>
    </form>
  );
};

export default UserFilter;
