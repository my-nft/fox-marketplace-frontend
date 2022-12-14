import buttonImage from "../../assets/images/marketplace/button_open_close.jpg";

const OpenCloseButton = ({ clickAction }) => {
  return (
    <button id="openClose" onClick={clickAction}>
      <img src={buttonImage} alt="buttonImage" />
    </button>
  );
};

export default OpenCloseButton;
