import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../../interactors/blockchainInteractor";
import { selectConnectedUser } from "../../redux/userReducer";
import { LOAD_USER } from "../../saga/actions";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import ScrollToTop from "../scrollToTop";
import useOutsideClick from "./../../utils/useOutsideClick";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connectedUser = useSelector(selectConnectedUser);
  const connectedWallet = getCurrentWalletConnected();

  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const handleSignIn = () => {
    connectWallet();
    const connectedWallet = getCurrentWalletConnected();
    dispatch({ type: LOAD_USER, payload: connectedWallet });
  };

  const cleanSession = () => {
    dispatch({ type: "DESTROY_SESSION" });
    navigate("/");
  };

  const addWalletListener = () => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      cleanSession();
      handleSignIn();
    });

    window.ethereum.on("disconnect", async (accounts) => {
      cleanSession();
    });

    window.ethereum.on("chainChanged", async (chainId) => {
      if (parseInt(chainId, 16) !== 90001) {
        alert("Not connected to the chainId");
        cleanSession();
      }
    });
  };

  useEffect(() => {
    // only if metamask is installed
    if (window.ethereum) {
      addWalletListener();
    }
  }, []);

  useEffect(() => {
    console.log("USER SETTED", connectedUser);
  }, [connectedUser]);

  return (
    <>
      <ScrollToTop />

      <header className="container-fluid">
        <nav className="navbar navbar-expand-xl" ref={clickRef}>
          <Link className="navbar-brand" to="/">
            <img src="/assets/images/Logo_foxchange.png" alt="" />
          </Link>
          <form className="form-inline my-2 my-lg-0 ">
            <div className="form-control-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 24 24"
              >
                <g fill="none" fill-rule="evenodd">
                  <path d="M24 0v24H0V0h24ZM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018Zm.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022Zm-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01l-.184-.092Z" />
                  <path
                    fill="currentColor"
                    d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2ZM4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0Z"
                  />
                </g>
              </svg>

              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search NFTs, collections, artist and genres..."
                aria-label="Search"
                id="formSearch"
              />
            </div>
          </form>
          <button
            className="navbar-toggler navbar-dark"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/explorer">
                  Explorer <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/creation">
                  Create
                </Link>
              </li>
            </ul>
            <ul id="buttonIcon">
              {connectedWallet ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/account">
                      Account
                    </Link>
                  </li>
                  <li>
                    <Link to={"/profile"}>
                      <img src="/assets/icon-white-user.png" alt="" />
                    </Link>
                  </li>
                </>
              ) : null}
              <li>
                <Link to="#">
                  <img src="/assets/icon-white-settings.png" alt="" />
                </Link>
              </li>
              <li>
                <img src="/assets/icon-white-wallet.png" alt="" />
              </li>
            </ul>
            <button id="signUpButton" onClick={handleSignIn}>
              {connectedWallet
                ? optimizeWalletAddress(connectedWallet)
                : "Connect Wallect"}{" "}
            </button>
          </div>
        </nav>
      </header>
      <ToastContainer limit={1} />

      <Outlet />
    </>
  );
};

export default Header;
