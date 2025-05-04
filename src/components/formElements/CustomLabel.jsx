function CustomLabel({ labelText, className }) {
  return (
    <label className={`text-main-black font-normal text-base ${className}`}>
      {labelText}
    </label>
  );
}

export default CustomLabel;
