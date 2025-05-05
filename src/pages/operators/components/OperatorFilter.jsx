import CustomInput from "@/components/formElements/CustomInput.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import useInitDataStore from "@/store/initDataStore.js";
import { Search } from "lucide-react";
import SearchableSelect from "@/components/formElements/SearchableSelect";

const OperatorFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const { regions, roles, categories } = useInitDataStore();
  const [filterData, setFilterData] = useState({
    name: searchParams.get("name") || "",
    role: searchParams.get("role") || "",
    deportament_id: searchParams.get("deportament_id") || "",
    region_id: searchParams.get("region_id") || "",
  });

  useEffect(() => {
    setFilterData({
      name: searchParams.get("name") || "",
      role: searchParams.get("role") || "",
      region_id: searchParams.get("region_id") || "",
      deportament_id: searchParams.get("deportament_id") || "",
    });
  }, [searchParams]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (currentPage > 1) params.set("page", currentPage);
    if (filterData.name) params.set("name", filterData.name);
    if (filterData.role) params.set("role", filterData.role);
    if (filterData.deportament_id)
      params.set("deportament_id", filterData.deportament_id);
    if (filterData.region_id) params.set("region_id", filterData.region_id);

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid-cols-[50px_1fr_1fr_1fr_1fr_1.5fr_100px] shrink-0 grid w-full min-h-[36px] mt-1 gap-[2px] rounded py-1 bg-white items-center text-sm font-medium"
    >
      <div className="flex justify-center">
        <Search className="text-main-blackish" />
      </div>
      <CustomInput
        type="search"
        onChange={handleChange}
        placeholder="F.I.O"
        name="name"
        className="bg-white !border-main-blue"
        value={filterData.name}
        required={false}
      />
      {/* <MaskedPhoneInput
        value={filterData?.phone ?? ""}
        onChange={handleChange}
        name={"phone"}
        className="bg-white !border-main-blue"
        required={false}
      /> */}
      <SearchableSelect
        placeholder="Rolni tanlang"
        queryParam="name"
        value={filterData?.role}
        defaultOptions={roles ?? []}
        onChange={(selected) => {
          setFilterData((prev) => ({
            ...prev,
            role: selected?.value || "",
          }));
        }}
      />
      <SearchableSelect
        placeholder="Viloyat tanlang"
        endpoint="/regions"
        queryParam="name"
        value={filterData?.region_id}
        defaultOptions={regions ?? []}
        onChange={(selected) => {
          setFilterData((prev) => ({
            ...prev,
            region_id: selected?.value || "",
          }));
        }}
      />
      <SearchableSelect
        placeholder="Bo'limni tanlang"
        endpoint="/departments"
        queryParam="name"
        value={filterData?.deportament_id}
        defaultOptions={categories ?? []}
        onChange={(selected) => {
          setFilterData((prev) => ({
            ...prev,
            deportament_id: selected?.value || "",
          }));
        }}
      />
      <div></div>
      <UniversalBtn className="self-end justify-center" type="submit">
        Qidirish
      </UniversalBtn>
    </form>
  );
};

export default OperatorFilter;
