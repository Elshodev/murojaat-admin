import { Loader2 } from "lucide-react";
import CustomLabel from "./CustomLabel.jsx";

function CustomInput({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name,
  editable = true,
  required = true,
  defaultValue,
  className = "",
  label,
  error,
  Icon = null,
  onClick,
  autoComplete = "new-password",
  divClass = "",
  loading = false,
  ...rest
}) {
  return (
    <div className={`flex flex-col gap-1 grow ${divClass}`}>
      {label && <CustomLabel labelText={label} />}
      <div
        className={`border w-full relative pr-5 outline-none border-[rgb(116,120,141,0.35)] bg-[#F8F8F8] rounded text-sm ${
          error && "border-red-500"
        }  ${editable ? "border-[#c3c3c3]" : "border-transparent"} ${
          Icon ? "pr-8" : ""
        }
          ${className}
          `}
      >
        <input
          className="w-full px-2 min-h-[36px] bg-transparent"
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          defaultValue={defaultValue}
          readOnly={!editable}
          disabled={!editable}
          autoComplete={autoComplete}
          required={required}
          {...rest}
        />
        {Icon && editable && (
          <button
            onClick={onClick}
            type="button"
            className="absolute cursor-pointer inset-y-0 right-2 flex items-center text-gray-600"
          >
            {Icon}
          </button>
        )}
        {loading && (
          <Loader2 className="animate-spin w-4 h-4 absolute right-[4px] top-[50%] translate-y-[-50%]" />
        )}
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

export default CustomInput;
