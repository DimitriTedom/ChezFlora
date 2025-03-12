import { Link } from "react-router-dom";

interface SubTitleProps {
  Subtitle?: string;
  to?: string;
}

const SubTitleComponent = ({ Subtitle, to }: SubTitleProps) => {
  return (
    <Link to={to || "#"}>
      <h6 className="font-normal hover:text-black text-gray-400">
        {Subtitle}
      </h6>
    </Link>
  );
};

export default SubTitleComponent;
