import { Database, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

const iconMapping = {
  news: Database,
};

function StatisticCard({ item }) {
  const IconComponent = iconMapping["news"];

  return (
    <div className="group relative p-[20px_30px] shadow-[0_1px_3.5px_0_rgba(0,0,0,.25)]">
      <div className="relative z-[1]">
        <div className="flex items-center gap-[6px]">
          <IconComponent className="text-[18px] text-pushti" />
          <span className="text-[16px] font-medium first-letter:capitalize">
            {item.title}
          </span>
        </div>
        <div className="mt-[30px] flex justify-between">
          <h1 className="text-[36px] font-medium">{item.value}</h1>
          <Link
            to={item.link}
            className="flex items-center text-[18px] gap-2 hover:underline"
          >
            Batafsil <ExternalLink className="w-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default StatisticCard;
