import UniversalBtn from "@/components/buttons/UniversalBtn.jsx";
import CustomInput from "@/components/formElements/CustomInput.jsx";
import SearchableSelect from "@/components/formElements/SearchableSelect";
import request from "@/services/fetch.service.js";
import { useUserStore } from "@/store/userStore";
import { showToast } from "@/utils/toastHelper.js";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductForm({ datas = [], branches = [] }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
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
      [name]: ["category_id", "branch_id", "quantity", "nds", "price"].includes(
        name
      )
        ? Number(value)
        : value,
    }));
    if (name === "shtrix_code") {
      checkShtrixCode(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    request("/products/template", "POST", formData)
      .then(() => {
        showToast.success("Шаблонные продукт успешно создан!");
        navigate(`/templateProducts`);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        showToast.error(
          error?.response?.data?.message || "Ошибка при создании продукта."
        );
      });
  };

  return (
    <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
        <CustomInput
          onChange={handleChange}
          label="Штрих-код"
          placeholder="Введите штрих-код"
          name="shtrix_code"
          type="number"
          loading={isLoading}
          value={formData?.shtrix_code || ""}
        />

        <CustomInput
          onChange={handleChange}
          label="Название"
          placeholder="Название продукта"
          name="name"
          value={formData?.name ?? isShtrixCodeExists?.attributeName ?? ""}
        />
        <SearchableSelect
          labelText="Категория"
          placeholder="Выберите категорию"
          endpoint="/products/category"
          queryParam="name"
          required={true}
          value={formData?.category_id}
          defaultOptions={datas}
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
          placeholder="Введите количество"
          name="quantity"
          value={formData?.quantity || ""}
          type="number"
        />

        {user.role.roleId == 3 && (
          <SearchableSelect
            labelText="Филиал"
            placeholder="Выберите филиал"
            endpoint="/branches"
            queryParam="name"
            required={true}
            value={formData?.branch_id}
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
          onChange={handleChange}
          label="НДС (%)"
          placeholder="Введите НДС"
          name="nds"
          value={formData?.nds || ""}
          type="number"
        />

        <CustomInput
          onChange={handleChange}
          label="Цена"
          placeholder="Введите цену"
          name="price"
          value={formData?.price || ""}
          type="number"
        />

        <CustomInput
          onChange={handleChange}
          label="Единица измерения"
          placeholder="например: кг, шт"
          name="unity"
          value={isShtrixCodeExists?.package?.unitName ?? formData?.unity ?? ""}
        />
        <div className="h-[150px]">
          <img
            className="h-full"
            src={isShtrixCodeExists?.image ?? formData?.image}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <UniversalBtn className="justify-center" type="submit">
          Создавать
        </UniversalBtn>
      </div>
    </form>
  );
}

export default ProductForm;
