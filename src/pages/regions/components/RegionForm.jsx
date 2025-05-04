import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    request("/regions", "POST", formData)
      .then(() => {
        showToast.success("Viloyat muvaffaqiyatli yaratildi!");
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
          label="Viloyat nomi"
          placeholder="Viloyat nomi"
          name={"name"}
          value={formData?.name || ""}
        />
        <UniversalBtn className="self-end justify-center" type="submit">
          Yaratish
        </UniversalBtn>
      </div>
    </form>
  );
}

export default RegionForm;
