const HeaderAccount = () => {
  return (
    <section id="headerAccount" class="container-fluid">
      <div class="row p-4" id="infoProfile">
        <img
          src="./assets/images/account/img_account_default.jpg"
          id="iconProfile"
          alt=""
        />
      </div>
      <div class="row p-4 mt-5" id="infoHeader">
        <div id="accountName">
          <p>NAME</p>
          <span id="accountWallet">Wallet Address </span> -{" "}
          <span class="dataLastVisit">Joined June 2022</span>
          <p class="description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum
            asperiores dolore ex harum placeat quae,{" "}
          </p>
          <ul id="totalItemsInfo">
            <li>
              <span>Items</span>
              <p>777</p>
            </li>
            <li>
              <span>Created</span>
              <p>Nov 2022</p>
            </li>
            <li>
              <span>Creator fee</span>
              <p>7.5%</p>
            </li>
            <li>
              <span>Chain</span>
              <p>ETHW</p>
            </li>
          </ul>
          <ul id="totalItemsPrice">
            <li>
              <p>10 ETHW</p>
              <span>total Volume</span>
            </li>
            <li>
              <p>0.022 ETHW</p>
              <span>floor price</span>
            </li>
            <li>
              <p>0.008 ETHW</p>
              <span>best offer</span>
            </li>
            <li>
              <p>20%</p>
              <span>Listed</span>
            </li>
            <li>
              <p>411</p>
              <span>owners</span>
            </li>
            <li>
              <p>53%</p>
              <span>unique owners</span>
            </li>
          </ul>
        </div>
        <div id="accountButton">
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

          <div class="dropdown">
            <button type="button" data-toggle="dropdown" aria-expanded="false">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                data-toggle="popover"
                data-content="Disabled popover"
                class="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <div class="dropdown-menu">
              <ul>
                <li class="head">ADDRESES</li>
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
                <li class="head">MORE</li>
                <li>REPORT</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderAccount;
