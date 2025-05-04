import { Search } from "lucide-react";

function EmptySearchResult() {
  return (
    <div className="flex flex-col absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] items-center justify-center py-10 text-center">
      <Search className="text-main-blackish w-[80px] h-[80px]" />
      <h2 className="text-xl font-semibold text-gray-700 my-2">
        So‘rovingizga mos keladigan hech narsa topilmadi
      </h2>
      <p className="text-gray-500 mb-4">
        Qidirayotgan so'zlaringizni noto'g'ri yozgan bo'lishingiz mumkin.
        Iltimos, soʻrovingizni oʻzgartirib koʻring.
      </p>
    </div>
  );
}

export default EmptySearchResult;
