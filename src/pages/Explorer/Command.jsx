const Command = ({filters, changeFilterValue, toggleFilters}) => {

  return (
    <div id="command">
      <button id="openClose" onClick={toggleFilters}>
        <img src="./assets/images/marketplace/button_open_close.jpg" alt="" />
      </button>
      <div className="checkBox">
        <span>show Rarity</span>
        <label className={filters.showRarity ? "onoffbtn active" : "onoffbtn"}>
          <input type="checkbox" checked={filters.showRarity} onChange={() => {
            changeFilterValue({...filters, showRarity: !filters.showRarity})
       
          }}/>
        </label>
      </div>
    </div>
  );
};

export default Command;