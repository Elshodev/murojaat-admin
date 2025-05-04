import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomLabel from "@/components/formElements/CustomLabel.jsx";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import { useQueryClient } from "@tanstack/react-query";

function CompanyFormEdit({ data }) {
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isOpenPassword, setIsOpenPassword] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`/company/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Компания успешно обновлена!");
        queryClient.invalidateQueries([`/company/${data.id}`]);
        navigate(`/company`);
      })
      .catch((error) => {
        console.error("Error editing company:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`/company/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Компания успешно удалена!");
        navigate(`/company`);
      })
      .catch((err) => showToast.error(err.response.data.message))
      .finally(() => {
        setLoading(false);
        setShowPopUp(false);
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
        <div className={`flex flex-col gap-2 grow`}>
          <CustomLabel labelText={"Филиалы"} />
          {data.branches.length > 0 ? (
            <Link
              className="bg-[#F8F8F8] cursor-pointer w-full rounded min-h-[38px] flex items-center px-2 text-sm font-normal select-none relative"
              to={`/branches?page=1&size=20&company=${data.name}`}
            >
              Посмотреть филиалы
            </Link>
          ) : (
            <span className="bg-[#F8F8F8] w-full rounded min-h-[38px] flex items-center px-2 text-sm font-normal select-none relative">
              Нет доступных филиалов
            </span>
          )}
        </div>
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
            <UniversalBtn type="submit">Сохранить</UniversalBtn>
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

export default CompanyFormEdit;
