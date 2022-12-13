const HeaderAccount = ({collectionData}) => {


  return (
    <section id="headerAccount" className="container-fluid">
      <div className="row p-4" id="infoProfile">
        <img
          src="./assets/images/account/img_account_default.jpg"
          id="iconProfile"
          alt=""
        />
        <img
          src={collectionData.imageBanner}
          id="bannerProfile"
          alt="profile banner"
        />
      </div>
      <div className="row p-4 mt-5" id="infoHeader">
        <div id="accountName">
          <p>{collectionData.name}</p>
          <span id="accountWallet">Wallet Address </span> -{collectionData.address}
          <span className="dataLastVisit">Joined {
            new Date(collectionData.creationDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
            })
          }</span>
          <p className="description">
            {
              collectionData.description
            }
          </p>
          <ul id="totalItemsInfo">
            <li>
              <span>Items</span>
              <p>{collectionData.items}</p>
            </li>
            <li>
              <span>Created</span>
              <p>{new Date(collectionData.creationDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })}</p>
            </li>
            <li>
              <span>Creator fee</span>
              <p>{collectionData.creatorEarnings}%</p>
            </li>
            <li>
              <span>Chain</span>
              <p>{collectionData.chain}</p>
            </li>
          </ul>
          <ul id="totalItemsPrice">
            <li>
              <p>{collectionData.totalVolume} {collectionData.chain}</p>
              <span>total Volume</span>
            </li>
            <li>
              <p>{collectionData.floorPrice} {collectionData.chain}</p>
              <span>floor price</span>
            </li>
            <li>
              <p>{collectionData.bestOffer} {collectionData.chain}</p>
              <span>best offer</span>
            </li>
            <li>
              <p>{collectionData.listed}</p>
              <span>Listed</span>
            </li>
            <li>
              <p>{collectionData.owners}</p>
              <span>owners</span>
            </li>
            <li>
              <p>{collectionData.uniqueOwner}</p>
              <span>unique owners</span>
            </li>
          </ul>
        </div>
        {/* <div id="accountButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-share"
            viewBox="0 0 16 16"
          >
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z" />
          </svg>

          <div className="dropdown">
            <button type="button" data-toggle="dropdown" aria-expanded="false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                data-toggle="popover"
                data-content="Disabled popover"
                className="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <div className="dropdown-menu">
              <ul>
                <li className="head">ADDRESES</li>
                <li>
                  WALLET NUMBER{" "}
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z" />
                    </svg>
                  </span>
                </li>
                <li className="head">MORE</li>
                <li>REPORT</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default HeaderAccount;
