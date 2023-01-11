import { useState } from "react";
import useOutsideClick from "../../utils/useOutsideClick";
import { ReactComponent as Chevron } from "./../../assets/icons/arrow.svg";

const InfoBoxWrapper = ({ children, title }) => {
  const [collapse, setCollapse] = useState(true);

  return (
    <div className={` infoBoxContainer ${collapse && "itemInfoShow"}`}>
      <div className="itemInfoHeader" onClick={() => setCollapse(!collapse)}>
        <div>
          <p>{title}</p>
        </div>
        <Chevron />
      </div>
      <div className={`itemInfoBox ${collapse && "infoBoxShow"}`}>
        {children}
      </div>
    </div>
  );
};

export default InfoBoxWrapper;
