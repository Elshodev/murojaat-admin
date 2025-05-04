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
        className={`border w-full outline-none px-4 min-h-[37px]  border-[rgb(116,120,141,0.35)] rounded text-sm 
          ${className}
          `}
      />
    </div>
  );
};

export default MaskedPhoneInput;
