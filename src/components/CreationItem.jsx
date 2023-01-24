import { useNavigate } from 'react-router-dom';
import CreationIcon from "./CreationIcon";



const CreationItem = ({ img, label, link }) => {
  const navigate = useNavigate();

  return (
    <div className="col mb-5" onClick={() => navigate(link)}>
      <CreationIcon img={img} />

      <button className="mt-5">{label}</button>
    </div>
  );
};

export default CreationItem;
