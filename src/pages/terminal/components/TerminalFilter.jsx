import CustomInput from "@/components/formElements/CustomInput.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import { useEffect, useState } from "react";
import { size } from "@/constants/paginationStuffs.js";

const TerminalFilter = ({ searchParams, currentPage, setSearchParams }) => {
  const [filterData, setFilterData] = useState({
    branchName: searchParams.get("branch") || "",
    terminalId: searchParams.get("terminal_id") || "",
    status: searchParams.get("status") || "",
    companyName: searchParams.get("company") || "",
  });

  useEffect(() => {
    setFilterData({
      branchName: searchParams.get("branch") || "",
      terminalId: searchParams.get("terminal_id") || "",
      status: searchParams.get("status") || "",
      companyName: searchParams.get("company") || "",
    });
  }, [searchParams]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFilterData((prev) => ({
      ...prev,
      status: value == "" ? "" : value == "1" ? "ACTIVE" : "NOACTIVE",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.set("page", currentPage);
    params.set("size", size);

    if (filterData.branchName) params.set("branch", filterData.branchName);
    if (filterData.terminalId) params.set("terminal_id", filterData.terminalId);
    if (filterData.status) params.set("status", filterData.status);
    if (filterData.companyName) params.set("company", filterData.companyName);

    setSearchParams(params);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid-cols-[1fr_1fr_1fr_1fr_1fr_1fr_auto] shrink-0 px-4 grid w-full min-h-[36px] mt-1 rounded py-1 bg-white items-center gap-4 text-sm font-medium"
    >
      <CustomInput
        onChange={handleChange}
        placeholder="Филиал"
        name="branchName"
        className="bg-white !border-main-blue"
        value={filterData.branchName}
        required={false}
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Терминал ID"
        name="terminalId"
        className="bg-white !border-main-blue"
        value={filterData.terminalId}
        required={false}
      />
      <CustomSelect
        name="status"
        value={
          filterData.status == ""
            ? ""
            : filterData.status == "ACTIVE"
            ? "1"
            : "2"
        }
        onChange={(e) => handleSelectChange(e.target.value)}
        options={[
          {
            id: 1,
            name: "ACTIVE",
          },
          {
            id: 2,
            name: "NOACTIVE",
          },
        ]}
        placeholder="Выберите статус"
        className="!bg-white !border-main-blue rounded"
        required={false}
      />
      <CustomInput
        onChange={handleChange}
        placeholder="Название компании"
        name="companyName"
        className="bg-white !border-main-blue"
        value={filterData.companyName}
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

export default TerminalFilter;
