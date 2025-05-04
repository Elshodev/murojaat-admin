import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import CustomSelect from "@/components/formElements/CustomSelect.jsx";
import useInitDataStore from "@/store/initDataStore.js";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "@/store/userStore.js";

function BranchFormEdit({ data }) {
  const { user } = useUserStore();
  const { companies, regions, fetchInitData } = useInitDataStore();
  useEffect(() => {
    fetchInitData();
  }, []);
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [isError, setIsError] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`/branches/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Филиал успешно обновлен!");
        queryClient.invalidateQueries([`/branches/${data.id}`]);
        navigate(`/branches`);
      })
      .catch((error) => {
        console.error("Error editing branch:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`/branches/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Филиал успешно удалена!");
        navigate(`/branches`);
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
          editable={isOpenEdit}
          label="Имя"
          placeholder="Имя"
          name={"name"}
          required={false}
          value={formData?.name ?? data?.name ?? ""}
        />
        {user?.role?.roleId != 3 && (
          <CustomSelect
            editable={isOpenEdit}
            name={"companyId"}
            label={"Компания"}
            setIsError={setIsError}
            isError={isError}
            value={formData?.companyId ?? data?.company?.id ?? ""}
            onChange={handleChange}
            required
            options={companies}
            placeholder="Выберите компанию"
            className="border !text-[#929292] border-gray-300 rounded grow"
          />
        )}

        <CustomSelect
          editable={isOpenEdit}
          label={"Регион"}
          name={"regionId"}
          setIsError={setIsError}
          isError={isError}
          value={formData?.regionId ?? data?.region?.id ?? ""}
          onChange={handleChange}
          required
          options={regions}
          placeholder="Выберите регион"
          className="border !text-[#929292] border-gray-300 rounded grow"
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

export default BranchFormEdit;
