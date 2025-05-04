import { memo } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";

const BackLink = memo(({ links }) => {
  return (
    <Link to={-1} className="flex items-center gap-x-4">
      <span className="grid h-[26px] w-[26px] place-items-center text-[20px]">
        <FaArrowLeftLong />
      </span>
      <h1 className="text-2xl font-semibold text-[#111]">{links.title}</h1>
    </Link>
  );
});

export default BackLink;
