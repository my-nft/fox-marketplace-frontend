import { useState } from "react";

const SliderToggle = ({
    title,
    action=()=>{},
}) => {

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
    action()
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