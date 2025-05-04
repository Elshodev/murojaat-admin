import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import { useQueryClient } from "@tanstack/react-query";

function CategoryFormEdit({ data }) {
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`/products/template/category/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Шаблон категории успешно обновлена!");
        queryClient.invalidateQueries([
          `/products/template/category/${data.id}`,
        ]);
        navigate(`/templateCategories`);
      })
      .catch((error) => {
        console.error("Error editing category:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`/products/template/category/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Шаблон категории успешно удалена!");
        navigate(`/templateCategories`);
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

export default CategoryFormEdit;
