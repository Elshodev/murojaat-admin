import PaginationComp from "../Paginations/PaginationComp.jsx";
import EmptySearchResult from "../EmptyText/EmptySearchResult.jsx";

function UniversalTable({ children, datas }) {
  return (
    <div className="w-full overflow-x-auto overflow-y-hidden grow flex flex-col">
      <div className="min-w-[1000px] grow relative flex flex-col h-full text-left w-full">
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
