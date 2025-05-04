import { Link } from "react-router-dom";
import { Database, ExternalLink } from "lucide-react";

const iconMapping = {
  news: Database,
};

function StatisticCard({ value, title, link }) {
  const IconComponent = iconMapping["news"];

  return (
    <div className="group relative cursor-pointer p-[20px_30px] shadow-[0_1px_3.5px_0_rgba(0,0,0,.25)]">
      <div className="bg-gradient absolute inset-0 border-[red] bg-[#fbfbfb] opacity-0 transition-opacity duration-300 group-hover:opacity-[1]"></div>
      <div className="relative z-[1]">
        <div className="flex items-center gap-[6px]">
          <IconComponent className="text-[18px] text-pushti" />
          <span className="text-[16px] font-medium first-letter:capitalize">
            {title}
          </span>
        </div>
        <div className="mt-[30px] flex justify-between">
          <h1 className="text-[36px] font-medium">{value}</h1>
          <Link
            to={link}
            className="flex items-center text-[18px] gap-2 hover:underline"
          >
            Подробнее <ExternalLink className="w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StatisticCard;
