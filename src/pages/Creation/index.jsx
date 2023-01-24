import CreationItem from "../../components/CreationItem";

const Creation = () => {
  return (
    <section id="createItem" className="my-5">
      <img src="/assets/images/Background.jpg" id="layer" alt="" />
      <h3 className="text-center mb-5">Create Item</h3>
      <div className="container">
        <div className="row text-center">
          <CreationItem
            img="/assets/images/create_icon_1.png"
            label="Create a single NFT"
            link="/single-nft"
          />
          <CreationItem
            img="/assets/images/create_icon_2.png"
            label="Create collection"
            link="/create-collection"
          />
          <CreationItem
            img="/assets/images/create_icon_3.png"
            label="Import collection"
            link="/import-collection"
          />
        </div>
        <div className="row">
          <div className="col text-center">
            <ul>
              <li>
                Choose mint <b>“Single NFT”</b> if you want your collectible to
                be one of a kind
              </li>
              <li>
                Choose <b>“Create Collection”</b> if you want to sell different
                collectibles multiple times
              </li>
              <li>
                Choose <b>“Import Collection”</b> if you want to import an
                existing collection into FOXCHANGE
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Creation;
