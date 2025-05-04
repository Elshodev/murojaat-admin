import MoreLink from "@/components/MoreLink.jsx";
import { formatDate } from "../../../utils/dateFormatter.js";
import RenderCell from "@/components/tables/RenderCell.jsx";

function UserTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item) => (
        <div
          key={item.id}
          className={`grid w-full min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center gap-4 px-4 text-sm text-main-blackish font-medium ${className}`}
        >
          <RenderCell value={item.name} />
          <RenderCell value={item.login} />
          <RenderCell id={item?.roleId} value={item?.role} />
          <RenderCell value={item.company} />
          <RenderCell value={item.branch} />
          <span>{formatDate(item?.createdAt)}</span>
          {item?.roleId == 3 ? (
            <MoreLink link={`/company/companyInfo/${item.id}`} />
          ) : (
            <MoreLink link={`userInfo/${item.id}`} />
          )}
        </div>
      ))}
    </div>
  );
}
export default UserTbody;
