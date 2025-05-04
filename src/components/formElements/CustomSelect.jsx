import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import CustomLabel from "./CustomLabel.jsx";

const CustomSelect = ({
  value,
  options,
  placeholder,
  editable = true,
  onChange,
  className = `border-0`,
  required = false,
  isError = false,
  setIsError,
  label,
  divClass = "",
  name,
}) => {
  return (
    <div className={`flex flex-col overflow-hidden gap-2 grow ${divClass}`}>
      {label && <CustomLabel labelText={label} />}

      <Select
        value={value?.toString()}
        onValueChange={(val) => {
          if (editable) {
            const newValue = val === "0" ? "" : val;
            onChange({ target: { name, value: newValue } });
            if (setIsError) {
              setIsError(false);
            }
          }
        }}
      >
        <SelectTrigger
          className={`${className} !text-main-black w-full min-h-[37px] cursor-pointer text-sm pr-2 !ring-0 border-[rgb(116,120,141,0.35)] bg-[#F8F8F8] shadow-none ${
            required && isError ? "!border-red-500" : ""
          }  ${
            editable
              ? "border-[#c3c3c3]"
              : "border-transparent pointer-events-none"
          }  `}
        >
          <SelectValue placeholder={placeholder || "Выбрать"} />
        </SelectTrigger>

        <SelectContent className="shadow-none text-main-black bg-white border border-gray-200 focus:ring-0 focus:outline-none">
          {options.length > 0 && (
            <SelectItem value={"0"}>{placeholder ?? "Выбрать"}</SelectItem>
          )}
          {options?.map((option) => (
            <SelectItem
              className={`${
                editable ? "cursor-pointer" : "pointer-events-none"
              }`}
              value={option.id.toString()}
              key={option.id}
            >
              {option.name}
            </SelectItem>
          ))}
          {options.length > 0 ? (
            ""
          ) : (
            <SelectItem className={`pointer-events-none`} value={"asd"}>
              {label} не найдены
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomSelect;
