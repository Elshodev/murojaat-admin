import MoreLink from "@/components/MoreLink.jsx";

function CategoryTbody({ datas, className }) {
  return (
    <div className="flex flex-col overflow-auto grow">
      {datas.map((item, index) => (
        <div
          key={index}
          className={`grid w-full text-center min-h-[36px] shrink-0 mt-1 rounded py-1 bg-white items-center text-sm text-main-blackish font-medium ${className}`}
        >
          <span>{index + 1}</span>
          <span>{item.name}</span>
          <MoreLink link={`${item.id}`} />
        </div>
      ))}
    </div>
  );
}

export default CategoryTbody;
