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
import { loadERC20Contract, web3 } from "../../utils/blockchainInteractor";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import ScrollToTop from "../scrollToTop";
import useOutsideClick from "./../../utils/useOutsideClick";
import SearchBar from "./../searchBar/searchBar";

const Header = () => {
  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [connectedWallet, setConnectedWallet] = useState();
  const [balance, setBalance] = useState({
    fx: 0,
    fxg: 0,
  });
  const [filters, setFilters] = useState({
    searchPrompt: "",
  });

  const handleSignIn = async () => {
    await connectWallet();
    setConnectedWallet(getCurrentWalletConnected());
  };

  useEffect(() => {
    if (connectedWallet) {
      dispatch({
        type: LOAD_USER,
        payload: connectedWallet,
      });
    } else {
      connectWallet();
      setConnectedWallet(getCurrentWalletConnected());
    }
  }, [connectedWallet]);

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
      setConnectedWallet(getCurrentWalletConnected());
    }
  }, []);

  const initWalletData = async () => {
    if (connectedWallet) {
      const fxg = await loadERC20Contract()
        .methods.balanceOf(connectedWallet)
        .call();
      web3.eth.getBalance(connectedWallet, (err, wei) => {
        if (!err) {
          const walletBalance = Number(
            web3.utils.fromWei(wei, "ether")
          ).toFixed(2);
          setBalance({
            ...balance,
            fx: walletBalance,
            fxg: fxg / 10 ** 18,
          });
        }
      });
    }
  };

  useEffect(() => {
    initWalletData();
  }, [connectedWallet]);

  useEffect(() => {
    handleSignIn();
  }, [])

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
            <ul className={`navbar-nav ${connectedWallet ? "" : "mr-3"}`}>
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

            {connectedWallet ? (
              <ul id="buttonIcon">
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
                <li>
                  <Link to="#">
                    <img src="/assets/icon-white-settings.png" alt="" />
                  </Link>
                </li>

                <li className="walletIcon">
                  <div className="walletInfo">
                    <div>
                      <h2>FX</h2>
                      <p>{balance.fx}</p>
                    </div>
                    <div>
                      <h2>FXG</h2>
                      <p>{balance.fxg}</p>
                    </div>
                  </div>
                  <img src="/assets/icon-white-wallet.png" alt="" />
                </li>
              </ul>
            ) : null}

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
