import Select from "react-select";

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(254, 254, 254, 0.8)",
    borderRadius: "0",
    boxShadow: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#000000",
    border: "1px solid #f58103",
    borderRadius: "8px",
    boxShadow: "0px 4px 4px #f5800373",
    boxShadow: "none",
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "transparent",
    color: "#FFFFFF",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#f58103",
      color: "#fff",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#FFFFFF",
    padding: "8px 8px",
    height: "46px",
  }),
};

const CustomSelect = (props) => <Select {...props} styles={selectStyles} />;

export default CustomSelect;
