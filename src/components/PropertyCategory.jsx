import useOutsideClick from "./../utils/useOutsideClick";

import { ReactComponent as Chevron } from "../assets/icons/arrow.svg";
import { useState } from "react";
import SliderToggle from "../pages/Account/SliderToggle";

const Property = ({ property, handleFilterChange = () => {} }) => {
  const [checked, setChecked] = useState(property.active);

  return (
    <div className="propertyItem">
      <p>{property.title}</p>
      <div className="propertyCheck">
        <SliderToggle
          active={checked}
          action={(boolean) => {
            setChecked(boolean);
            handleFilterChange(property, boolean);
          }}
        />
      </div>
    </div>
  );
};

const PropertyCategory = ({
  propertyTitle = "",
  properties = [],
  handleFilterChange = () => {},
}) => {
  const [collapsed, setCollapsed] = useState(true);

  const clickRef = useOutsideClick(() => {
    setCollapsed(true);
  });

  return (
    <div
      ref={clickRef}
      className={`${!collapsed ? "propertyCollapsed" : null}`}
    >
      <div
        className="propertyHeader"
        onClick={() => {
          setCollapsed(!collapsed);
        }}
      >
        <p>{propertyTitle}</p>
        <div className="propertyStatus">
          <p>
            <span>
              {properties.reduce((acc, curr) => {
                if (curr.active) acc++;
                return acc;
              }, 0)}
            </span>
            /<span>{properties.length}</span>
          </p>
          <Chevron />
        </div>
      </div>
      <div className="propertyItems">
        {properties.map((property) => {
          return (
            <Property
              property={property}
              handleFilterChange={handleFilterChange}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PropertyCategory;
