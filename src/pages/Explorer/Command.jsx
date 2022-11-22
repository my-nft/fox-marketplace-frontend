import { useState } from "react";

const Command = () => {



  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };
  
  return (
    <div id="command">
      <button id="openClose">
        <img src="./assets/images/marketplace/button_open_close.jpg" alt="" />
      </button>
      <div className="checkBox">
        <span>show Rarity</span>
        <label className={checked ? "onoffbtn active" : "onoffbtn"}>
          <input type="checkbox" checked={checked} onChange={handleChange}/>
        </label>
      </div>
    </div>
  );
};

export default Command;