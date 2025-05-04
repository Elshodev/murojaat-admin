import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import request from "@/services/fetch.service.js";
import useInitDataStore from "@/store/initDataStore.js";
import { useUserStore } from "@/store/userStore.js";
import { showToast } from "@/utils/toastHelper.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function BranchForm() {
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { companies, regions, fetchInitData } = useInitDataStore();
  useEffect(() => {
    fetchInitData();
  }, []);
  const [isError, setIsError] = useState({
    companyId: false,
    regionId: false,
  });
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      companyId: !formData?.companyId && user?.role?.roleId != 3,
      regionId: !formData?.regionId,
    };
    setIsError(newErrors);
    if (!newErrors.companyId && !newErrors.regionId) {
      request("/branches", "POST", formData)
        .then(() => {
          showToast.success("Филиал успешно создан!");
          navigate(`/branches`);
        })
        .catch((error) => {
          console.error("Error creating branch:", error);
          showToast.error(error.response.data.message);
        });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["companyId", "regionId", "region_id"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 grid-cols-3 w-full gap-4">
        <CustomInput
          onChange={handleChange}
          className="bg-white"
          label="Название филиала"
          placeholder="Название филиала"
          name={"name"}
          value={formData?.name || ""}
        />
        {user?.role?.roleId != 3 && (
          <CustomSelect
            name={"companyId"}
            label={"Компания"}
            setIsError={(val) =>
              setIsError((prev) => ({ ...prev, companyId: val }))
            }
            isError={isError.companyId}
            value={formData?.companyId ?? ""}
            onChange={handleChange}
            required
            options={companies}
            placeholder="Выберите компанию"
            className="border !text-[#929292] border-gray-300 rounded grow"
          />
        )}
        <CustomSelect
          label={"Регион"}
          name={"regionId"}
          setIsError={(val) =>
            setIsError((prev) => ({ ...prev, regionId: val }))
          }
          isError={isError.regionId}
          value={formData?.regionId ?? ""}
          onChange={handleChange}
          required
          options={regions}
          placeholder="Выберите регион"
          className="border !text-[#929292] border-gray-300 rounded grow"
        />
        <UniversalBtn className="self-end justify-center" type="submit">
          Создавать
        </UniversalBtn>
      </div>
    </form>
  );
}

export default BranchForm;
