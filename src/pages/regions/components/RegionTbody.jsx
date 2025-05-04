import MoreLink from "@/components/MoreLink.jsx";
import { formatDate } from "../../../utils/dateFormatter.js";

function RegionTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item) => (
        <div
          key={item.id}
          className={`grid w-full min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center gap-4 text-sm text-main-blackish font-medium ${className}`}
        >
          <span>{item.name}</span>
          <span>{formatDate(item?.createdAt)}</span>
          <MoreLink link={`regionInfo/${item.id}`} />
        </div>
      ))}
    </div>
  );
}

export default RegionTbody;
