import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import MaskedPhoneInput from "@/components/formElements/MaskedPhoneInput";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import request from "@/services/fetch.service.js";
import useInitDataStore from "@/store/initDataStore.js";
import roleBasedSelectVisibility from "@/utils/roleBasedSelectVisibility.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function OperatorForm() {
  const { regions, roles, categories } = useInitDataStore();

  const navigate = useNavigate();
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    password: "",
    phone_number: "",
    region_id: null,
    deportament_id: null,
    role: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedPhoneNumber =
      formData.phone_number?.replace(/\D/g, "").replace(/^998/, "") || "";
    if (cleanedPhoneNumber.length != 9) {
      alert("Telefon to'liq emas");
      return;
    }
    const payload = {
      ...formData,
      phone_number: "998" + cleanedPhoneNumber, // 998 bilan boshlovchi format
    };

    setLoading(true);
    request("/operator", "POST", payload)
      .then(() => {
        showToast.success("Operator muvaffaqiyatli yaratildi!");
        navigate(`/operators`);
      })
      .catch((error) => {
        console.error("Error creating operator:", error);
        showToast.error(error?.response?.data?.message || "Xatolik yuz berdi");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["region_id", "deportament_id"].includes(name)
        ? Number(value)
        : value.trim(),
    }));
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 grid-cols-3 w-full gap-4">
        <CustomInput
          onChange={handleChange}
          label="Ism"
          placeholder="F.I.Sh"
          name="full_name"
        />
        <CustomInput
          onChange={handleChange}
          label="Login"
          placeholder="Login"
          name="username"
        />
        <CustomInput
          onChange={handleChange}
          type={isOpenPassword ? "text" : "password"}
          label="Parol"
          placeholder="Parol"
          name="password"
          onClick={() => setIsOpenPassword((prev) => !prev)}
          Icon={
            isOpenPassword ? (
              <Eye className="w-5" />
            ) : (
              <EyeOff className="w-5" />
            )
          }
        />
        <MaskedPhoneInput
          value={formData?.phone_number ?? ""}
          onChange={handleChange}
          label={"Telefon raqam"}
          name={"phone_number"}
          divClassname={"flex-col items-start"}
          required={true}
        />
        <SearchableSelect
          placeholder="Viloyat tanlang"
          labelText={"Viloyat"}
          endpoint="/regions"
          queryParam="name"
          value={formData?.region_id}
          defaultOptions={regions ?? []}
          className=""
          required
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              region_id: selected?.value || null,
            }));
          }}
        />
        <SearchableSelect
          placeholder="Bo‘limni tanlang"
          labelText={"Bo'lim"}
          endpoint="/departments"
          queryParam="name"
          className=""
          required
          value={formData?.deportament_id ?? ""}
          defaultOptions={categories ?? []}
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              deportament_id: selected?.value || null,
            }));
          }}
        />
        <SearchableSelect
          placeholder="Rolni tanlang"
          labelText={"Rol"}
          queryParam="name"
          className=""
          required
          value={formData?.role ?? ""}
          defaultOptions={roles ?? []}
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              role: selected?.value || null,
            }));
          }}
        />

        <UniversalBtn
          loading={loading}
          className="self-end justify-center"
          type="submit"
        >
          Yaratish
        </UniversalBtn>
      </div>
    </form>
  );
}

export default OperatorForm;
