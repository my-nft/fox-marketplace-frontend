import { useState } from "react";

const style = "contIcon withGlow";

const CreationIcon = ({img}) => {
    
    const [isHover, setIsHover] = useState(false);
  
    
    return (
        <div
        className={isHover ? style + " active" : style}
        onMouseOver={() => setIsHover(true)}
        onMouseOut={() => setIsHover(false)}
      >
        <img
          src={img}
          className={isHover ? "withGlow active" : "withGlow"}
          alt=""
        />
      </div>
    )
}

export default CreationIcon;