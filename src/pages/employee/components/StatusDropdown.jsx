import React, { useState } from "react";

const statuses = [
  { value: "", label: "Status tanlang", color: "#ccc" }, // green
  { value: "POSITIVE", label: "Ijobiy", color: "#28a745" }, // green
  { value: "NEGATIVE", label: "Salbiy", color: "#dc3545" }, // red
];

const StatusDropdown = ({ formValues, setFormValues }) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedStatus = statuses.find((s) => s.value === formValues.status);
  return (
    <div className="font-sans relative w-48">
      {/* Trigger */}
      <div
        className="bg-white rounded-md border border-gray-300 cursor-pointer p-2 flex items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className="w-3 h-3 rounded-full mr-2"
          style={{
            backgroundColor: selectedStatus?.color || "#ccc",
          }}
        />
        {selectedStatus ? selectedStatus.label : "Choose status"}
        <span className="ml-auto">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute bottom-full left-0 bg-white rounded-md border border-gray-300 w-full mt-1 z-10">
          {statuses.map((status) => (
            <div
              key={status.value}
              className={`flex items-center p-2 cursor-pointer ${
                formValues.status === status.value
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-200 hover:text-black"
              }`}
              onClick={() => {
                setFormValues({ ...formValues, status: status.value });
                setIsOpen(false);
              }}
            >
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: status.color }}
              />
              {status.label}
              {formValues.status === status.value && (
                <span className="ml-auto font-bold">✓</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
