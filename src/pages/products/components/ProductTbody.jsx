import MoreLink from "@/components/MoreLink.jsx";
import { formatCurrency } from "@/utils/formatCurrency";

function ProductTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={index}
          className={`grid w-full min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center gap-4 text-sm text-main-blackish font-medium ${className}`}
        >
          <span className="line-clamp-2" title={item.name}>
            {item.name}
          </span>
          <span>{item.category_name}</span>
          <span>{item?.quantity || 0}</span>
          <span>{formatCurrency(item.price)}</span>
          <span>{item?.unity || "Пустой"}</span>
          <img className="h-[60px]" src={item.image} />
          <MoreLink link={`productInfo/${item.id}`} />
        </div>
      ))}
    </div>
  );
}

export default ProductTbody;
