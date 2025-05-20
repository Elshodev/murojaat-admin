import { ChevronLeft, ChevronRight } from "lucide-react";
import { ru } from "date-fns/locale";
import { endOfDay, format, startOfDay } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-date-range";

function TabsController({ shiftRange, formData, setFormData }) {
  const [show, setShow] = useState(false);

  const hasDates = formData.fromDate && formData.toDate;
  const formattedStart = hasDates
    ? format(formData.fromDate, "dd MMMM", { locale: ru })
    : null;
  const formattedEnd = hasDates
    ? format(formData.toDate, "dd MMMM", { locale: ru })
    : null;

  return (
    <div className="flex relative z-10 bg-white border border-gray-300 items-center rounded grow whitespace-nowrap">
      <button
        disabled={!formattedStart}
        onClick={() => shiftRange("prev")}
        className="border border-gray-300 cursor-pointer w-[38px] flex items-center justify-center h-[36px] rounded bg-white text-main-black"
      >
        <ChevronLeft />
      </button>

      <div
        onClick={() => setShow(true)}
        className="text-sm px-2 self-stretch flex items-center grow justify-center cursor-pointer font-normal text-main-black"
      >
        {hasDates ? `${formattedStart} – ${formattedEnd}` : "Vaqt tanlanmagan"}
      </div>

      <button
        disabled={!formattedStart}
        onClick={() => shiftRange("next")}
        className="border border-gray-300 cursor-pointer w-[38px] flex items-center justify-center h-[36px] rounded bg-white text-main-black"
      >
        <ChevronRight />
      </button>

      {show && (
        <>
          <div onClick={() => setShow(false)} className="fixed inset-0 z-[1]" />
          <div className="absolute bg-white z-[100] top-[120%] w-fit left-0">
            <DateRange
              locale={ru}
              onChange={(item) => {
                const { startDate, endDate } = item.selection;

                setFormData({
                  fromDate: startDate,
                  toDate: endDate,
                });
              }}
              moveRangeOnFirstSelection={false}
              ranges={[
                {
                  startDate: startOfDay(formData.fromDate || new Date()),
                  endDate: endOfDay(formData.toDate || new Date()),
                  key: "selection",
                },
              ]}
              className="rounded-lg bg-white top-full w-full border shadow"
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TabsController;
