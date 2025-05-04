import CustomInput from "@/components/formElements/CustomInput.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import useInitDataStore from "@/store/initDataStore.js";
import { size } from "@/constants/paginationStuffs.js";
import MaskedPhoneInput from "@/components/formElements/MaskedPhoneInput";
import { Search } from "lucide-react";

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
      className="grid-cols-[50px_1fr_1fr_1fr_1fr_2fr] shrink-0 grid w-full min-h-[36px] mt-1 gap-[2px] rounded py-1 bg-white items-center text-sm font-medium"
    >
      <div className="flex justify-center">
        <Search className="text-main-blackish" />
      </div>
      <CustomInput
        onChange={handleChange}
        placeholder="F.I.O"
        name="login"
        className="bg-white !border-main-blue"
        value={filterData.login}
        required={false}
      />
      <MaskedPhoneInput
        value={filterData?.phone ?? ""}
        onChange={handleChange}
        name={"phone"}
        className="bg-white !border-main-blue"
        required={false}
      />
      <CustomSelect
        name="role"
        value={filterData.role}
        onChange={(e) => handleSelectChange(e.target.value)}
        options={roles}
        placeholder="Viloyat tanlang"
        className="!bg-white !border-main-blue rounded"
        required={false}
      />
      <div></div>
      <UniversalBtn className="self-end justify-center" type="submit">
        Qidirish
      </UniversalBtn>
    </form>
  );
};

export default UserFilter;
