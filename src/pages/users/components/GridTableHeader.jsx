const GridTableHeader = ({ config = [] }) => {
  return (
    <div
      className={`grid w-full shrink-0 text-center text-main-grey rounded bg-transparent gap-[2px] text-sm font-medium ${config.gridTemplate}`}
    >
      {config.headers.map((item, idx) => {
        if (item.type === "group") {
          return (
            <div key={idx} className="flex flex-col items-center gap-[2px]">
              <span className="min-h-[35px] text-base p-1 bg-main-blue w-full justify-center flex items-center">
                {item.label}
              </span>
              <div
                className={`grid ${item.columns} min-h-[35px] gap-[2px] items-center h-full w-full`}
              >
                {item.children.map((child, i) => (
                  <span
                    key={i}
                    className="bg-main-blue p-1 h-full flex items-center justify-center"
                  >
                    {child.label}
                  </span>
                ))}
              </div>
            </div>
          );
        }

        return (
          <span
            key={idx}
            className={`bg-main-blue p-1 text-base flex items-center justify-center ${
              item.type !== "group" ? "min-h-[35px]" : "min-h-[70px]"
            }`}
          >
            {item.label}
          </span>
        );
      })}
    </div>
  );
};

export default GridTableHeader;
