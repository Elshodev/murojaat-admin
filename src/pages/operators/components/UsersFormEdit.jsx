import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import { useQueryClient } from "@tanstack/react-query";
import roleBasedSelectVisibility from "@/utils/roleBasedSelectVisibility.js";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import useInitDataStore from "@/store/initDataStore.js";

function UsersFormEdit({ data }) {
  const { branches, roles, fetchInitData } = useInitDataStore();
  useEffect(() => {
    fetchInitData();
  }, []);
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isError, setIsError] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`/users/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Пользователь успешно обновлена!");
        queryClient.invalidateQueries([`/users/${data.id}`]);
        navigate(`/users`);
      })
      .catch((error) => {
        console.error("Error editing user:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`/users/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Пользователь успешно удалена!");
        navigate(`/users`);
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
          editable={isOpenEdit}
          label="Имя"
          placeholder="Имя"
          name={"name"}
          required={false}
          value={formData?.name ?? data?.name ?? ""}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          label="Войти"
          editable={isOpenEdit}
          placeholder="Войти"
          name={"login"}
          required={false}
          value={formData?.login ?? data?.login ?? ""}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          type={isOpenPassword ? "text" : "password"}
          label="Пароль"
          editable={isOpenEdit}
          placeholder="Пароль"
          name={"password"}
          required={false}
          value={formData?.password ?? ""}
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
          setIsError={setIsError}
          isError={isError}
          value={formData?.role ?? data?.roleId ?? ""}
          onChange={handleChange}
          required
          editable={isOpenEdit}
          options={roles}
          placeholder="Выберите роль"
          className="border !text-[#929292] border-gray-300 rounded grow"
        />

        {roleBasedSelectVisibility(formData?.role ?? data?.roleId) && (
          <CustomSelect
            name={"branchId"}
            label={"Филиалы"}
            setIsError={setIsError}
            isError={isError}
            value={formData?.branchId ?? data?.branchId ?? ""}
            onChange={handleChange}
            required
            editable={isOpenEdit}
            options={branches}
            placeholder="Выберите филиал"
            className="border !text-[#929292] border-gray-300 rounded grow"
          />
        )}
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
              Отмена
            </UniversalBtn>
            <UniversalBtn loading={loading} type="submit">
              Сохранить
            </UniversalBtn>
          </>
        ) : (
          <UniversalBtn
            className="border border-[#dadeea] !text-[#333333] bg-transparent hover:bg-main-grey"
            onClick={() => {
              setIsOpenEdit(true);
            }}
          >
            Изменить
          </UniversalBtn>
        )}
        <UniversalBtn
          loading={loading}
          onClick={() => setShowPopUp(true)}
          className="!bg-[#ff353519] !text-[#ff3535] hover:!bg-[#ff353548]"
        >
          Удалить
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

export default UsersFormEdit;
