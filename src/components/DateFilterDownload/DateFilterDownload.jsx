import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import instance from "@/services/api.service";
import { CalendarIcon, FileDown } from "lucide-react";

function DateFilterDownload() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadReport = async () => {
    setIsDownloading(true);
    try {
      let queryParams = "";
      if (startDate && endDate) {
        queryParams = `?fromDate=${startDate}&toDate=${endDate}`;
      } else if (startDate) {
        queryParams = `?fromDate=${startDate}`;
      } else if (endDate) {
        queryParams = `?toDate=${endDate}`;
      }

      const response = await instance({
        method: "GET",
        url: `/operator/report${queryParams}`,
        responseType: "blob",
      });

      const blob = response.data;
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");

      let filename = "statistika";
      if (startDate && endDate) {
        filename = `statistika-${startDate}-to-${endDate}.xlsx`;
      } else if (startDate) {
        filename = `statistika-from-${startDate}.xlsx`;
      } else if (endDate) {
        filename = `statistika-to-${endDate}.xlsx`;
      } else {
        filename = `statistika-all-data.xlsx`;
      }

      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Yuklab olishda xatolik:", error);
      alert(
        "Yuklab olishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring."
      );
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full p-4 rounded-2xl shadow-md border bg-white mt-6 dark:bg-zinc-900 flex flex-col gap-6 md:flex-row md:items-end">
      <div className="flex flex-col gap-3 w-full md:w-1/3">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          Boshlanish sanasi (ixtiyoriy)
        </label>
        <Input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          disabled={isDownloading}
        />
      </div>
      <div className="flex flex-col gap-3 w-full md:w-1/3">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1">
          <CalendarIcon className="w-4 h-4" />
          Tugash sanasi (ixtiyoriy)
        </label>
        <Input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          disabled={isDownloading}
        />
      </div>
      <div className="w-full md:w-auto">
        <Button
          onClick={downloadReport}
          disabled={isDownloading}
          className="w-full md:w-auto cursor-pointer flex gap-2 items-center"
        >
          <FileDown className="w-4 h-4" />
          {isDownloading ? "Yuklanmoqda..." : "Excel yuklab olish"}
        </Button>
      </div>
    </div>
  );
}

export default DateFilterDownload;
