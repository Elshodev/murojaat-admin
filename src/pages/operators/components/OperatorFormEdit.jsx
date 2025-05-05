import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import { useQueryClient } from "@tanstack/react-query";
import useInitDataStore from "@/store/initDataStore.js";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import MaskedPhoneInput from "@/components/formElements/MaskedPhoneInput";

function OperatorFormEdit({ data }) {
  const { regions, roles, categories } = useInitDataStore();

  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`/operator/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Operator muvaffaqiyatli yaratildi!");
        queryClient.invalidateQueries([`/operator/${data.id}`]);
        setIsOpenEdit(false);
      })
      .catch((error) => {
        console.error("Error editing user:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`/operator/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Operator muvaffaqiyatli o'chirildi!");
        navigate(`/operators`);
      })
      .catch((err) => showToast.error(err.response.data.message))
      .finally(() => {
        setLoading(false);
        setShowPopUp(false);
      });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["branchId", "role"].includes(name) ? Number(value) : value,
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
          required={false}
          editable={isOpenEdit}
          value={formData?.full_name ?? data?.full_name ?? ""}
        />
        <CustomInput
          onChange={handleChange}
          label="Login"
          placeholder="Login"
          name="username"
          value={formData?.username ?? data?.username ?? ""}
          required={false}
          editable={isOpenEdit}
        />
        <CustomInput
          onChange={handleChange}
          type={isOpenPassword ? "text" : "password"}
          label="Parol"
          required={false}
          editable={isOpenEdit}
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
          editable={isOpenEdit}
          name={"phone_number"}
          divClassname={"flex-col items-start"}
        />
        <SearchableSelect
          placeholder="Viloyat tanlang"
          labelText={"Viloyat"}
          endpoint="/regions"
          queryParam="name"
          editable={!isOpenEdit}
          value={formData?.region_id ?? data?.region?.id ?? ""}
          defaultOptions={regions ?? []}
          className=""
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
          editable={!isOpenEdit}
          value={formData?.deportament_id ?? data?.deportament?.id ?? ""}
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
          editable={!isOpenEdit}
          value={formData?.role ?? data?.role ?? ""}
          defaultOptions={roles ?? []}
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              role: selected?.value || null,
            }));
          }}
        />
      </div>
      <div className="flex gap-4 flex-wrap">
        {isOpenEdit ? (
          <>
            <UniversalBtn
              className="border border-[#dadeea] !text-[#333333] bg-transparent hover:bg-main-grey"
              onClick={() => {
                setIsOpenEdit(false);
              }}
            >
              Bekor qilish
            </UniversalBtn>
            <UniversalBtn loading={loading} type="submit">
              Saqlash
            </UniversalBtn>
          </>
        ) : (
          <UniversalBtn
            className="border border-[#dadeea] !text-[#333333] bg-transparent hover:bg-main-grey"
            onClick={() => {
              setIsOpenEdit(true);
            }}
          >
            O'zgartirish
          </UniversalBtn>
        )}
        <UniversalBtn
          loading={loading}
          onClick={() => setShowPopUp(true)}
          className="!bg-[#ff353519] !text-[#ff3535] hover:!bg-[#ff353548]"
        >
          O'chirish
        </UniversalBtn>
      </div>
      {showPopUp && (
        <UniversalDeleteModal
          onClose={() => {
            setShowPopUp(false);
          }}
          handleDelete={handleDelete}
          selectedData={data}
          loading={loading}
        />
      )}
    </form>
  );
}

export default OperatorFormEdit;
