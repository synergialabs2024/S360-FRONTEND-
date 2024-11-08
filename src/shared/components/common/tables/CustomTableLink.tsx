import { Link } from 'react-router-dom';

export type CustomTableLinkProps = {
  url: string;
  text: string;
};

const CustomTableLink: React.FC<CustomTableLinkProps> = ({ url, text }) => {
  if (!text) return 'N/A';

  return (
    <Link to={url} className="table__link">
      {text}
    </Link>
  );
};

export default CustomTableLink;
