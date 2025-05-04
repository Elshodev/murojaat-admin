import PaginationComp from "../Paginations/PaginationComp.jsx";
import EmptySearchResult from "../EmptyText/EmptySearchResult.jsx";

function UniversalTable({ children, tableHeadItems, className, datas }) {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden grow flex flex-col">
      <div className="min-w-[1000px] grow relative flex flex-col h-full text-left w-full">
        <div
          className={`grid w-full shrink-0 min-h-[36px] text-main-grey rounded bg-main-blue px-4 text-sm gap-4 font-medium ${className}`}
        >
          {tableHeadItems.map((item, i) => {
            return <span key={i}>{item}</span>;
          })}
        </div>
        <div
          className={`mt-2 flex flex-col overflow-hidden grow ${
            datas?.data?.length > 0 ? "grow" : ""
          }`}
        >
          {children}
        </div>
        {datas?.data?.length > 0 ? "" : <EmptySearchResult />}
        <PaginationComp
          current={datas?.currentPage}
          totalPages={datas?.totalPage}
          total={datas?.totalItems}
        />
      </div>
    </div>
  );
}

export default UniversalTable;
