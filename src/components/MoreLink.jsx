import { Link } from "react-router-dom";
const actionStyle =
  "text-[14px] text-main-blue mx-auto rounded-full cursor-pointer ";
function MoreLink({ link }) {
  return (
    <Link to={link} className={actionStyle}>
      Batafsil
    </Link>
  );
}

export default MoreLink;
