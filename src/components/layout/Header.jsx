import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadERC20Contract, web3 } from "../../utils/blockchainInteractor";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import ScrollToTop from "../scrollToTop";
import useOutsideClick from "./../../utils/useOutsideClick";
import SearchBar from "./../searchBar/searchBar";

import { providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { selectCurrentWallet, setCurrentWallet } from "../../redux/userReducer";

const Header = () => {
  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const [web3Modal, setWeb3Modal] = useState(null);
  const [connectedWallet, setConnectedWallet] = useState();
  const userAddress = useSelector(selectCurrentWallet);

  useEffect(() => {
    setConnectedWallet(userAddress);
  }, [userAddress]);

  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "9c7e70b4bf234955945ff87b8149926e",
        },
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: false, // very important
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal);
  }, []);

  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    console.log("BEFORE");
    if (web3Modal && web3Modal.cachedProvider) {
      reloadWallet();
    }
  }, [web3Modal]);

  const reloadWallet = async () => {
    await connectWallet();
  };

  const addListeners = async (web3ModalProvider) => {
    console.log(web3ModalProvider);
    web3ModalProvider.on("accountsChanged", (accounts) => {
      console.log("accountsChanged");
      cleanSession();
    });

    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      console.log("chainChanged");

      if (parseInt(chainId, 16) !== 90001) {
        alert("Not connected to the chainId");
        cleanSession();
      }
    });

    web3ModalProvider.on("disconnect", () => {
      console.log("disconnect");
      cleanSession();
    });
  };

  async function connectWallet() {
    if(!connectedWallet) {
      console.log("CONNECT_WALLET");
      const provider = await web3Modal.connect();
      addListeners(provider);
      const ethersProvider = new providers.Web3Provider(provider);
      dispatch(setCurrentWallet(await ethersProvider.getSigner().getAddress()));
    }
  }

  const dispatch = useDispatch();
  const [balance, setBalance] = useState({
    fx: 0,
    fxg: 0,
  });
  const [filters, setFilters] = useState({
    searchPrompt: "",
  });

  const cleanSession = async () => {
    await web3Modal.clearCachedProvider();

    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }

    dispatch({ type: "DESTROY_SESSION" });
  };

  const initWalletData = async () => {
    if (connectedWallet && web3) {
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
    if (connectedWallet) {
      initWalletData();
    }
  }, [connectedWallet]);

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

            <button id="signUpButton" onClick={connectWallet}>
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
