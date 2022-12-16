import { useEffect, useState } from "react";
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
import SearchBar from "./../searchBar/searchBar";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    searchPrompt: "",
  });

  const connectedUser = useSelector(selectConnectedUser);
  const connectedWallet = getCurrentWalletConnected();

  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const handleSignIn = () => {
    connectWallet();
    dispatch({
      type: LOAD_USER,
      payload: connectedWallet,
    });
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
            <SearchBar
              filters={filters}
              setFilters={setFilters}
              id="formSearch"
              placeholder={"Search NFTs, collections, artist and genres..."}
            />
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
