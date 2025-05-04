import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CompanyForm() {
  const navigate = useNavigate();
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    request("/company", "POST", formData)
      .then(() => {
        showToast.success("Компания успешно создана!");
        navigate(`/company`);
      })
      .catch((error) => {
        console.error("Error creating company:", error);
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
          className=""
          label="Имя"
          placeholder="Имя"
          name={"name"}
          value={formData?.name || ""}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          label="Войти"
          placeholder="Войти"
          name={"login"}
          value={formData?.login || ""}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          type={isOpenPassword ? "text" : "password"}
          label="Пароль"
          placeholder="Пароль"
          name={"password"}
          value={formData?.password || ""}
          onClick={() => setIsOpenPassword((prev) => !prev)}
          Icon={
            isOpenPassword ? (
              <Eye className="w-5" />
            ) : (
              <EyeOff className="w-5" />
            )
          }
        />
        <UniversalBtn className="self-end justify-center" type="submit">
          Создавать
        </UniversalBtn>
      </div>
    </form>
  );
}

export default CompanyForm;
