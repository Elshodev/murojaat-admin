import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import { useQueryClient } from "@tanstack/react-query";

function TerminalFormEdit({ data, datas = [] }) {
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`terminal/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Терминал успешно обновлена!");
        queryClient.invalidateQueries([`terminal/${data.id}`]);
        navigate(`/terminal`);
      })
      .catch((error) => {
        console.error("Error editing terminal:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`terminal/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Терминал успешно удалена!");
        navigate(`/terminal`);
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
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return dateString.slice(0, 10);
  };
  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 grid-cols-3 w-full gap-4">
        <CustomInput
          onChange={handleChange}
          className=""
          editable={isOpenEdit}
          label="ID терминала"
          placeholder="ID терминала"
          name={"terminal_id"}
          required={false}
          value={formData?.terminal_id ?? data?.terminalId ?? ""}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          label="Истечение срока"
          placeholder="Истечение срока"
          type="date"
          editable={isOpenEdit}
          name={"expire"}
          required={false}
          value={formData?.expire ?? formatDate(data?.expire) ?? ""}
        />
        <SearchableSelect
          editable={!isOpenEdit}
          labelText="Филиал"
          placeholder="Выберите Филиал"
          endpoint="/branches"
          queryParam="name"
          value={formData?.branch_id ?? data?.branch_id ?? ""}
          defaultOptions={datas}
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              branch_id: selected?.value || "",
            }));
          }}
        />
        {data?.companyName && (
          <CustomInput
            label="Название компании"
            placeholder="Название компании"
            editable={false}
            name={"companyName"}
            required={false}
            value={data?.companyName ?? ""}
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

export default TerminalFormEdit;
