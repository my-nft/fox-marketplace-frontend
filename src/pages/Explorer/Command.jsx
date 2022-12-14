import OpenCloseButton from "../../components/buttons/openClose";

const Command = ({ filters, changeFilterValue, toggleFilters }) => {
  return (
    <div id="command">
      <OpenCloseButton clickAction={toggleFilters} />
      <div className="checkBox">
        <span>show Rarity</span>
        <label className={filters.showRarity ? "onoffbtn active" : "onoffbtn"}>
          <input
            type="checkbox"
            checked={filters.showRarity}
            onChange={() => {
              changeFilterValue({
                ...filters,
                showRarity: !filters.showRarity,
              });
            }}
          />
        </label>
      </div>
    </div>
  );
};

export default Command;
