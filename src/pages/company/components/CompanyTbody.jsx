import MoreLink from "@/components/MoreLink.jsx";
import { formatDate } from "../../../utils/dateFormatter.js";

function CompanyTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={index}
          className={`grid w-full shrink-0 min-h-[36px] mt-1 rounded py-1 bg-white items-center gap-4 text-sm text-main-blackish font-medium ${className}`}
        >
          <span>{item.name}</span>
          <span>{item.login}</span>
          <span>{item.branches.length}</span>
          <span>{formatDate(item?.createdAt)}</span>
          <MoreLink link={`companyInfo/${item.id}`} />
        </div>
      ))}
    </div>
  );
}

export default CompanyTbody;
