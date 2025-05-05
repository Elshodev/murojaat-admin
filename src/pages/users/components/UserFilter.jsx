import CustomInput from "@/components/formElements/CustomInput.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import useInitDataStore from "@/store/initDataStore.js";
// import MaskedPhoneInput from "@/components/formElements/MaskedPhoneInput";
import { Search } from "lucide-react";
import SearchableSelect from "@/components/formElements/SearchableSelect";

const UserFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const { regions } = useInitDataStore();

  const [filterData, setFilterData] = useState({
    fullname: searchParams.get("fullname") || "",
    regionId: searchParams.get("regionId") || "",
  });

  useEffect(() => {
    setFilterData({
      fullname: searchParams.get("fullname") || "",
      regionId: searchParams.get("regionId") || "",
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
    if (filterData.fullname) params.set("fullname", filterData.fullname);
    if (filterData.regionId) params.set("regionId", filterData.regionId);
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
        name="fullname"
        className="bg-white !border-main-blue"
        value={filterData.fullname}
        required={false}
        type="search"
      />
      <div></div>
      {/* <MaskedPhoneInput
        value={filterData?.phone ?? ""}
        onChange={handleChange}
        name={"phone"}
        className="bg-white !border-main-blue"
        required={false}
      /> */}
      <SearchableSelect
        placeholder="Viloyat tanlang"
        endpoint="/regions"
        queryParam="name"
        value={filterData?.regionId}
        defaultOptions={regions ?? []}
        onChange={(selected) => {
          setFilterData((prev) => ({
            ...prev,
            regionId: selected?.value || "",
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

export default UserFilter;
