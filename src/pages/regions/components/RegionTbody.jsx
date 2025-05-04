import MoreLink from "@/components/MoreLink.jsx";
import { formatDate } from "../../../utils/dateFormatter.js";
import RenderCell from "@/components/tables/RenderCell.jsx";

function RegionTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={item.id}
          className={`grid w-full text-center min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center text-sm text-main-blackish font-medium ${className}`}
        >
          <RenderCell value={index + 1} />
          <RenderCell value={item.name} />
          <span>{formatDate(item?.createdAt)}</span>
          <MoreLink link={`regionInfo/${item.id}`} />
        </div>
      ))}
    </div>
  );
}

export default RegionTbody;
