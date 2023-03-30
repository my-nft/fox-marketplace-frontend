import { useState } from "react";
import { ReactComponent as Chevron } from "../../assets/icons/arrow.svg";
import useOutsideClick from "../../utils/useOutsideClick";

const Ordinals = ({ children }) => {
  const [collapse, setCollapse] = useState(false);
  const outsideClick = useOutsideClick(() => setCollapse(false));

  return (
    <div
      className={`ordinals ml-2 ${collapse && "ordinals__show"}`}
      ref={outsideClick}
    >
      <div className="ordinals__header" onClick={() => setCollapse(!collapse)}>
        <p>Ordinals</p>
        <Chevron />
      </div>
      <div className="ordinals__body">{children}</div>
    </div>
  );
};

export default Ordinals;
