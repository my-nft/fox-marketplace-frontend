import { useEffect, useState } from "react";
import { ReactComponent as Chevron } from "../assets/icons/arrow.svg";
import CustomSelect from "./Select";
import useOutsideClick from "./../utils/useOutsideClick";
import { useLocation, useNavigate } from "react-router-dom";

const ChainSelect = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [chain, setChain] = useState({
    label: "FX",
    id: 90001,
  });
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage.getItem("chainId")) {
      setChain(JSON.parse(localStorage.getItem("chainId")));
      navigate("/explore");
    }
  }, []);

  const handleSelect = (value) => {
    setChain(value);
    localStorage.setItem("chainId", JSON.stringify(value));
    setShowOptions(false);
    navigate("/explore");
    window.location.reload();
  };

  const clickRef = useOutsideClick(() => {
    setShowOptions(false);
  });

  return (
    <div
      className={`chainSelect ${showOptions && "chainToggled"}`}
      ref={clickRef}
    >
      <div
        className="chainSelectHead"
        onClick={() => setShowOptions(!showOptions)}
      >
        <p>{chain.label}</p>
        <Chevron />
      </div>
      <div className="chainOptions">
        <p
          className={`chainOption ${chain.label === "FX" && "chainSelected"}`}
          onClick={() => {
            handleSelect({
              label: "FX",
              id: 90001,
            });
          }}
        >
          FX
        </p>
        {/* <p
          className={`chainOption ${chain.label === "WANN" && "chainSelected"}`}
          onClick={() => {
            handleSelect({
              label: "WANN",
              id: 80001,
            });
          }}
        >
          WANN
        </p> */}
        <p
          className={`chainOption ${chain.label === "Poly" && "chainSelected"}`}
          onClick={() => {
            handleSelect({
              label: "Poly",
              id: 80001,
            });
          }}
        >
          Poly
        </p>
      </div>
    </div>
  );
};

export default ChainSelect;
