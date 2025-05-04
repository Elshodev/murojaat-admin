import CustomLabel from "./CustomLabel";
import AsyncSelect from "react-select/async";
import request from "@/services/fetch.service";
import { showToast } from "@/utils/toastHelper";

function SearchableSelect({
  labelText,
  placeholder = "Поиск...",
  endpoint = "",
  defaultOptions = [],
  queryParam = "name",
  value,
  required = false,
  onChange = () => {},
  editable = false,
}) {
  const fetchOptions = async (inputValue) => {
    try {
      const response = await request(
        `${endpoint}?${queryParam}=${inputValue}`,
        "GET"
      );
      return response.data
        .map((item) => ({
          value: item.id,
          label: item.name,
        }))
        .filter((item) =>
          item.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    } catch (error) {
      console.error("API Error:", error);
      showToast.error("Xatolik yuz berdi");
      return [];
    }
  };

  const loadOptions = (inputValue, callback) => {
    if (inputValue) {
      fetchOptions(inputValue).then(callback);
    } else {
      callback([]);
    }
  };

  const mappedOptions = defaultOptions.map((item) => ({
    value: item.id,
    label: item.name,
  }));

  // 💡 Hozirgi value asosida objectni topib olamiz
  const selectedOption =
    mappedOptions.find((option) => option.value == value) || null;

  return (
    <div className="flex flex-col gap-2 grow">
      {labelText && <CustomLabel labelText={labelText} />}
      <AsyncSelect
        required={required}
        cacheOptions
        classNames={{
          control: ({ isFocused }) =>
            `border !border-main-blue !min-h-[36px] !shadow-none whitespace-nowrap`,
        }}
        placeholder={placeholder}
        loadOptions={loadOptions}
        isClearable
        defaultOptions={mappedOptions}
        isSearchable={true}
        value={selectedOption}
        onChange={onChange}
        isDisabled={editable}
      />
    </div>
  );
}

export default SearchableSelect;
