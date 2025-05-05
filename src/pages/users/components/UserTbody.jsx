import { formatDate } from "../../../utils/dateFormatter.js";
import RenderCell from "@/components/tables/RenderCell.jsx";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber .js";

function UserTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={item.id}
          className={`grid w-full text-center min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center text-sm text-main-blackish font-medium ${className}`}
        >
          <RenderCell value={index + 1} />
          <RenderCell value={item.fullName} />
          <RenderCell value={item.region} />
          <span>{formatPhoneNumber(item?.phone)}</span>
          <span>{formatDate(item?.created_at)}</span>
          <div className="grid grid-cols-4 w-full place-items-center">
            <RenderCell value={item.appeals.new} />
            <RenderCell value={item.appeals.inProgress} />
            <RenderCell value={item.appeals.answered} />
            <RenderCell value={item.appeals.total} />
          </div>
        </div>
      ))}
    </div>
  );
}
export default UserTbody;
