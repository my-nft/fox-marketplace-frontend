import { ReactComponent as Confirm } from "../../assets/icons/confirm.svg";
import { ReactComponent as Deny } from "../../assets/icons/cancel.svg";

import logo from "../../assets/images/Logo_fox.png";
import { useState } from "react";

const ConfirmationPopup = ({
  title,
  message,
  onConfirm = () => {},
  onCancel = () => {},
}) => {
  const [show, setShow] = useState(true);

  const handleConfirm = () => {
    onConfirm();
    setShow(false);
  };

  const handleCancel = () => {
    onCancel();
    setShow(false);
  };

  return (
    <div className={`confirmation-popup ${show ? "confirmation-show" : null}`}>
      <img src={logo} alt="" />
      <div>
        <h3>{title}</h3>
        <p>{message}</p>
      </div>
      <div className="confirmation-buttons">
        <div className="confirm" onClick={() => handleConfirm()}>
          <Confirm />
        </div>
        <div className="deny" onClick={() => handleCancel()}>
          <Deny />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
