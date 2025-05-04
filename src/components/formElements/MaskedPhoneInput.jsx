import { useMask } from "@react-input/mask";
import CustomLabel from "./CustomLabel.jsx";

const MaskedPhoneInput = ({
  value,
  onChange,
  name,
  placeholder = "+998 __ ___ __ __",
  label,
  className,
  required,
  divClassname,
  editable = true,
}) => {
  const inputRef = useMask({
    mask: "+998 __ ___ __ __",
    replacement: { _: /\d/ },
    showMask: true,
  });

  return (
    <div className={`flex items-center justify-between gap-2 ${divClassname}`}>
      {label && <CustomLabel labelText={label} />}
      <input
        ref={inputRef}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        required={required}
        onChange={onChange}
        className={`border w-full outline-none px-4 min-h-[37px] border-[rgb(116,120,141,0.35)] bg-[#F8F8F8] rounded text-sm 
          ${className} ${editable ? "border-[#c3c3c3]" : "border-transparent"}
          `}
      />
    </div>
  );
};

export default MaskedPhoneInput;
