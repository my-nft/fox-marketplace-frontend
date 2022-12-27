import { optimizeWalletAddress } from "../../utils/walletUtils";
import placeholderBanner from "../../assets/images/account/profile_img_banner.jpg";
import placeholderImage from "../../assets/images/account/img_account_default.jpg";
import { useState } from "react";

const AccountHeader = ({ user }) => {

  const [image, setImage] = useState(placeholderImage);
  const [banner, setBanner] = useState(placeholderBanner);

  useState(() => {
    setImage(user?.image ? user.image : placeholderImage);
    setBanner(user?.banner ? user.banner : placeholderBanner);
  }, []);

  return (
    <section id="headerAccount" className="container-fluid">
      <div className="row p-4" id="infoProfile">
        <img src={image} id="iconProfile" />
        <img src={banner} alt="" />
      </div>
      <div className="row p-4 mt-5" id="infoHeader">
        <div id="accountName">
          <p>{user?.username ? user.username : "-"}</p>
          <span id="accountWallet">
            Wallet Address{" "}
            {user?.address ? (
              optimizeWalletAddress(user.address)
            ) : (
              <i>Missing</i>
            )}
          </span>{" "}
          - <span className="dataLastVisit">Joined June 2022</span>
        </div>
        {/* <div id="accountButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-share"
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

export default AccountHeader;
