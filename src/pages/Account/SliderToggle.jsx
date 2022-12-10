import { useState } from "react";

const SliderToggle = ({
    title,
    action=()=>{},
    active
}) => {

  const [checked, setChecked] = useState(active);

  const handleChange = () => {
    setChecked(!checked);
    action(!active)
  };
  
  return (
 
      <div className="checkBox">
        <span>{title}</span>
        <label className={checked ? "onoffbtn active" : "onoffbtn"}>
          <input type="checkbox" checked={checked} onChange={handleChange}/>
        </label>
      </div>
   
  );
};

export default SliderToggle;