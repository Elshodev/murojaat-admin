import UniversalBtn from "@/components/buttons/UniversalBtn";
import CustomInput from "@/components/formElements/CustomInput";
import { showToast } from "@/utils/toastHelper";
import { CircleX, File, Paperclip, Send } from "lucide-react";
import React from "react";
import StatusDropdown from "./StatusDropdown";

function MessageFooter({
  loading,
  fileInputRef,
  handleCompleteAppeal,
  formValues,
  setFormValues,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const incomingFiles = Array.from(files);
    const validFiles = incomingFiles.filter(
      (file) => file.size <= 20 * 1024 * 1024
    );

    if (validFiles.length !== incomingFiles.length) {
      showToast.error("Ba'zi fayllar 20MB dan katta, ular qo‘shilmadi.");
    }

    setFormValues((prev) => ({
      ...prev,
      [name]: [...(prev[name] || []), ...validFiles],
    }));
  };

  const handleRemoveFile = (indexToRemove) => {
    setFormValues((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== indexToRemove),
    }));
  };

  return (
    <footer className="p-4 mt-auto border-t flex flex-col items-start gap-2">
      {formValues?.files?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {formValues.files.map((file, index) => (
            <div
              key={index}
              className="text-sm text-gray-600 relative flex items-center gap-1 border rounded-[6px] bg-white p-2"
            >
              <File /> {file.name}
              <CircleX
                className="absolute right-[-8px] top-[-8px] w-[16px] cursor-pointer"
                onClick={() => handleRemoveFile(index)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex w-full items-center gap-2">
        <div className="flex-1 flex gap-2">
          <CustomInput
            placeholder="Xabar yozing..."
            value={formValues?.message ?? ""}
            onChange={handleInputChange}
            className="flex-1"
            name="message"
          />
          <StatusDropdown
            formValues={formValues}
            setFormValues={setFormValues}
          />
        </div>

        <input
          type="file"
          name="files"
          multiple
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />

        <UniversalBtn
          onClick={() => fileInputRef.current?.click()}
          loading={false}
        >
          <Paperclip size={18} />
        </UniversalBtn>
        <UniversalBtn
          icon={Send}
          iconPosition="right"
          onClick={handleCompleteAppeal}
          loading={loading}
        >
          Jo'natish
        </UniversalBtn>
      </div>
    </footer>
  );
}

export default MessageFooter;
