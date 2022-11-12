const ItemMint = (props) => {
  return (
    <div className="itemMints col-md-6 col-sm-12 col-lg-4">
      <div className="maskContainer">
        <img src="/assets/images/Element10.png" alt="" />
      </div>
      <div className="itemData">
        <button className="buttonUP previousDrop">Previus drop</button>
        <p className="descriptionData">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit.{" "}
        </p>
        <button className="subscribe">Subscribe</button>
      </div>
    </div>
  );
};

export default ItemMint;
