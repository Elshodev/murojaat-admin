import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TerminalForm({ datas = [] }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    request("terminal", "POST", formData)
      .then(() => {
        showToast.success("Терминал успешно создана!");
        navigate(`/terminal`);
      })
      .catch((error) => {
        console.error("Error creating terminal:", error);
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
          label="ID терминала"
          placeholder="ID терминала"
          name={"terminal_id"}
          value={formData?.terminal_id || ""}
        />
        <CustomInput
          onChange={handleChange}
          className=""
          label="Истечение срока"
          placeholder="Истечение срока"
          type="date"
          name={"expire"}
          value={formData?.expire || ""}
        />
        <SearchableSelect
          labelText="Филиал"
          placeholder="Выберите Филиал"
          endpoint="/branches"
          queryParam="name"
          required={true}
          value={formData?.branch_id}
          defaultOptions={datas}
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              branch_id: selected?.value || "",
            }));
          }}
        />
        <UniversalBtn className="self-end justify-center" type="submit">
          Создавать
        </UniversalBtn>
      </div>
    </form>
  );
}

export default TerminalForm;
