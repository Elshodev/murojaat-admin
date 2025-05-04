import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import request from "@/services/fetch.service.js";
import useInitDataStore from "@/store/initDataStore.js";
import roleBasedSelectVisibility from "@/utils/roleBasedSelectVisibility.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UsersForm() {
  const { branches, roles, fetchInitData } = useInitDataStore();
  useEffect(() => {
    fetchInitData();
  }, []);
  const navigate = useNavigate();
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({
    role: false,
    branchId: false,
  });

  const [formData, setFormData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {
      role: !formData?.role,
      branchId:
        roleBasedSelectVisibility(formData?.role) && !formData?.branchId,
    };

    setIsError(newErrors);
    if (!newErrors.role && !newErrors.branchId) {
      setLoading(true);
      request("/users", "POST", formData)
        .then(() => {
          showToast.success("Пользователь успешно создана!");
          navigate(`/users`);
        })
        .catch((error) => {
          console.error("Error creating user:", error);
          showToast.error(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["branchId", "role"].includes(name)
        ? Number(value)
        : value.trim(),
    }));
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
        />
        <CustomInput
          onChange={handleChange}
          className=""
          label="Войти"
          placeholder="Войти"
          name={"login"}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          type={isOpenPassword ? "text" : "password"}
          label="Пароль"
          placeholder="Пароль"
          name={"password"}
          onClick={() => setIsOpenPassword((prev) => !prev)}
          Icon={
            isOpenPassword ? (
              <Eye className="w-5" />
            ) : (
              <EyeOff className="w-5" />
            )
          }
        />
        <CustomSelect
          name={"role"}
          label={"Роль"}
          setIsError={(val) => setIsError((prev) => ({ ...prev, role: val }))}
          isError={isError.role}
          value={formData?.role ?? ""}
          onChange={handleChange}
          required
          options={roles}
          placeholder="Выберите роль"
          className="border !text-[#929292] border-gray-300 rounded grow"
        />

        {roleBasedSelectVisibility(formData?.role) && (
          <CustomSelect
            name={"branchId"}
            label={"Филиалы"}
            setIsError={(val) =>
              setIsError((prev) => ({ ...prev, branchId: val }))
            }
            isError={isError.branchId}
            value={formData?.branchId ?? ""}
            onChange={handleChange}
            required
            options={branches}
            placeholder="Выберите филиал"
            className="border !text-[#929292] border-gray-300 rounded grow"
          />
        )}
        <UniversalBtn
          loading={loading}
          className="self-end justify-center"
          type="submit"
        >
          Создавать
        </UniversalBtn>
      </div>
    </form>
  );
}

export default UsersForm;
