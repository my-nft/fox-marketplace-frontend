import { useState } from "react";
import { ReactComponent as Chevron } from "../assets/icons/arrow.svg";
import CustomSelect from "./Select";
import useOutsideClick from "./../utils/useOutsideClick";

const ChainSelect = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [chain, setChain] = useState("FX");

  const handleSelect = (value) => {
    setChain(value);
    setShowOptions(false);
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
        <p>{chain}</p>
        <Chevron />
      </div>
      <div className="chainOptions">
        <p
          className={`chainOption ${chain === "FX" && "chainSelected"}`}
          onClick={() => {
            handleSelect("FX");
          }}
        >
          FX
        </p>
        <p
          className={`chainOption ${chain === "WANN" && "chainSelected"}`}
          onClick={() => {
            handleSelect("WANN");
          }}
        >
          WANN
        </p>
        <p
          className={`chainOption ${chain === "Poly" && "chainSelected"}`}
          onClick={() => {
            handleSelect("Poly");
          }}
        >
          Poly
        </p>
      </div>
    </div>
  );
};

export default ChainSelect;
