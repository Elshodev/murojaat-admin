import MoreLink from "@/components/MoreLink.jsx";
import RenderCell from "@/components/tables/RenderCell.jsx";
// import { formatPhoneNumber } from "@/utils/formatPhoneNumber .js";

const translateRole = (role) => {
  switch (role) {
    case "ADMIN":
      return "Administrator";
    case "EMPLOYEE":
      return "Arizaga javob beruvchi xodim";
    case "OPERATOR":
      return "Operator";
    default:
      return role;
  }
};
function OperatorsTbody({ datas, className }) {
  console.log(datas);

  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={item.id}
          className={`grid w-full text-center min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center text-sm text-main-blackish font-medium ${className}`}
        >
          <RenderCell value={index + 1} />
          <RenderCell value={item.fullName} />
          <RenderCell value={translateRole(item.role)} />
          {/* <span>{formatPhoneNumber(item?.phone)}</span> */}
          <RenderCell value={item.region} />
          <RenderCell value={item.deportament} />
          <div className="grid grid-cols-3 w-full place-items-center">
            <RenderCell value={item.appeals.new} />
            <RenderCell value={item.appeals.inProgress} />
            <RenderCell
              value={`${item.appeals.positive} / ${item.appeals.negative}`}
            />
          </div>
          <MoreLink link={`${item.id}`} />
        </div>
      ))}
    </div>
  );
}
export default OperatorsTbody;
