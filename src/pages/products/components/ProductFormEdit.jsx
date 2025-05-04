import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import request from "@/services/fetch.service.js";
import { showToast } from "@/utils/toastHelper.js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import UniversalDeleteModal from "@/components/PopUps/UniversalDeleteModal.jsx";
import { useQueryClient } from "@tanstack/react-query";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import { useUserStore } from "@/store/userStore";

function ProductFormEdit({ data, datas = [], branches = [] }) {
  const navigate = useNavigate();
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isShtrixCodeExists, setIsShtrixCodeExists] = useState(null);
  const { user } = useUserStore();

  const debounceTimeout = useRef(null);

  const checkShtrixCode = (shtrixCode) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(async () => {
      if (shtrixCode) {
        try {
          setIsLoading(true);
          const response = await request(
            `/products/shcode/${shtrixCode}`,
            "GET"
          );

          if (response.result) {
            setIsShtrixCodeExists(response.result);
            setFormData((prev) => ({
              ...prev,
              name: response.result.attributeName,
              unity: response.result.package?.unitName || prev.unity,
              image: response.result.image || prev.image,
            }));
          } else {
            setIsShtrixCodeExists(null);
          }
        } catch (error) {
          console.error("Error checking shtrix code:", error);
          showToast.error("Error checking shtrix code");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsShtrixCodeExists(null);
      }
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: ["category_id", "quantity", "nds", "price"].includes(name)
        ? Number(value)
        : value,
    }));
    if (name === "shtrix_code") {
      checkShtrixCode(value);
    }
  };
  const queryClient = useQueryClient();
  const handleSubmit = (e) => {
    e.preventDefault();
    request(`/products/${data.id}`, "PUT", formData)
      .then(() => {
        showToast.success("Продукт успешно обновлена!");
        queryClient.invalidateQueries([`/products${data.id}`]);
        navigate(`/products`);
      })
      .catch((error) => {
        console.error("Error editing product:", error);
        showToast.error(error.response.data.message);
      });
  };
  const handleDelete = () => {
    setLoading(true);
    request(`/products/${data.id}`, "DELETE")
      .then(() => {
        showToast.success("Продукт успешно удалена!");
        navigate(`/products`);
      })
      .catch((err) => showToast.error(err.response.data.message))
      .finally(() => {
        setLoading(false);
        setShowPopUp(false);
      });
  };

  return (
    <form className="flex flex-col gap-4 w-full" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 grid-cols-3 w-full gap-4">
        <CustomInput
          onChange={handleChange}
          editable={isOpenEdit}
          label="Штрих-код"
          placeholder="Введите штрих-код"
          name="shtrix_code"
          type="number"
          loading={isLoading}
          required={false}
          value={formData?.shtrix_code ?? data?.shtrix_code ?? ""}
        />
        <CustomInput
          onChange={handleChange}
          label="Название"
          editable={isOpenEdit}
          placeholder="Название продукта"
          name="name"
          required={false}
          value={
            isShtrixCodeExists?.attributeName ??
            formData?.name ??
            data?.name ??
            ""
          }
        />
        <SearchableSelect
          labelText="Категория"
          placeholder="Выберите категорию"
          endpoint="/products/category"
          queryParam="name"
          value={formData?.category_id ?? data?.category_id ?? ""}
          defaultOptions={datas}
          editable={!isOpenEdit}
          onChange={(selected) => {
            setFormData((prev) => ({
              ...prev,
              category_id: selected?.value || "",
            }));
          }}
        />
        <CustomInput
          onChange={handleChange}
          label="Количество"
          required={false}
          placeholder="Введите количество"
          name="quantity"
          value={formData?.quantity ?? data?.quantity ?? ""}
          type="number"
          editable={isOpenEdit}
        />

        {user.role.roleId == 3 && (
          <SearchableSelect
            editable={!isOpenEdit}
            labelText="Филиал"
            placeholder="Выберите филиал"
            endpoint="/branches"
            queryParam="name"
            required={false}
            value={formData?.branch_id ?? data?.branch_id ?? ""}
            defaultOptions={branches}
            onChange={(selected) => {
              setFormData((prev) => ({
                ...prev,
                branch_id: selected?.value || "",
              }));
            }}
          />
        )}
        <CustomInput
          editable={isOpenEdit}
          onChange={handleChange}
          label="НДС (%)"
          placeholder="Введите НДС"
          name="nds"
          required={false}
          value={formData?.nds ?? data?.nds ?? ""}
          type="number"
        />
        <CustomInput
          editable={isOpenEdit}
          onChange={handleChange}
          label="Цена"
          placeholder="Введите цену"
          name="price"
          value={formData?.price ?? data?.price ?? ""}
          type="number"
          required={false}
        />
        <CustomInput
          editable={isOpenEdit}
          onChange={handleChange}
          label="Единица измерения"
          placeholder="например: кг, шт"
          name="unity"
          required={false}
          value={
            isShtrixCodeExists?.package?.unitName ??
            formData?.unity ??
            data?.unity ??
            ""
          }
        />
        <div className="h-[150px]">
          <img
            className="h-full"
            src={isShtrixCodeExists?.image ?? formData?.image ?? data?.image}
          />
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

export default ProductFormEdit;
