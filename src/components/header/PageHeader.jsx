import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PageHeader = ({ title, breadcrumbs = [], children }) => {
  return (
    <div className="bg-white px-8 py-4 flex shrink-0 items-center shadow justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">{title}</h1>
        <div className="flex items-center text-sm text-gray-500 mt-1">
          {breadcrumbs.map((crumb, idx) => (
            <span key={idx} className="flex items-center">
              {idx > 0 && <ChevronRight className="mx-1 w-4 h-4" />}
              {crumb.link ? (
                <Link to={crumb.link} className="hover:underline text-blue-600">
                  {crumb.label}
                </Link>
              ) : (
                <span>{crumb.label}</span>
              )}
            </span>
          ))}
        </div>
      </div>
      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;
