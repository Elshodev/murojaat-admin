import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegionForm() {
  const navigate = useNavigate();
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    request("/regions", "POST", formData)
      .then(() => {
        showToast.success("Регион успешно создана!");
        navigate(`/regions`);
      })
      .catch((error) => {
        console.error("Error creating region:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 grid-cols-3 w-full gap-4">
        <CustomInput
          onChange={handleChange}
          label="Название региона"
          placeholder="Название региона"
          name={"name"}
          value={formData?.name || ""}
        />
        <UniversalBtn className="self-end justify-center" type="submit">
          Создавать
        </UniversalBtn>
      </div>
    </form>
  );
}

export default RegionForm;
