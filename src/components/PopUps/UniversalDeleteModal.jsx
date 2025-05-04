import { IoIosWarning } from "react-icons/io";
import UniversalBtn from "../buttons/UniversalBtn.jsx";

function UniversalDeleteModal({
  selectedData,
  handleDelete,
  loading = false,
  onClose,
}) {
  return (
    <div className="fixed inset-0 z-[11111] grid place-content-center ">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[rgba(0,0,0,.5)]"
      ></div>
      <div className="p-[60px] z-[1] bg-white max-w-[650px] rounded flex flex-col items-center shadow-[4px_8px_30px_0_rgba(0,0,0,20%)]">
        <h3 className="text-[30px] font-bold">Ma'lumotni o'chirish?</h3>
        <p className="text-[20px] my-[15px]">
          Haqiqatan ham{" "}
          <span className="font-bold">
            {selectedData?.name ?? selectedData.terminalId ?? "данные"}
          </span>{" "}
          ni oʻchirib tashlamoqchimisiz?{" "}
        </p>

        <div className="border-l-[10px] border-main-blue bg-[#589bff1a] gap-2 p-[12px] flex flex-col">
          <span className="flex items-center gap-1 font-semibold text-[18px] text-red-500">
            <IoIosWarning className="text-[20px]" /> Ogohlantirish
          </span>
          <p className="text-main-blue leading-[1.3] text-[18px] font-medium">
            Ushbu element o'chirilgandan keyin uni qayta tiklab bo'lmaydi.
          </p>
        </div>
        <div className="flex mt-[34px] justify-between w-full gap-6">
          <UniversalBtn
            onClick={onClose}
            className="!bg-[rgb(116,120,141,10%)] !text-main-blackish"
          >
            Yo'q, bekor qilish
          </UniversalBtn>
          <UniversalBtn type="button" onClick={handleDelete} loading={loading}>
            Ha, o'chirish
          </UniversalBtn>
        </div>
      </div>
    </div>
  );
}

export default UniversalDeleteModal;
