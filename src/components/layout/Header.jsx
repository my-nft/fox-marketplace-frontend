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
import Web3Modal from 'web3modal'
import WalletConnectProvider from '@walletconnect/web3-provider'
import { selectCurrentWallet, setCurrentWallet } from "../../redux/userReducer";
import Web3 from "web3";


const Header = () => {
  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const [web3Modal, setWeb3Modal] = useState(null);
  const userAddress = useSelector(selectCurrentWallet);


  useEffect(() => {
    // initiate web3modal
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: '9c7e70b4bf234955945ff87b8149926e',
        }
      },
    };

    const newWeb3Modal = new Web3Modal({
      cacheProvider: false, // very important
      providerOptions,
    });

    setWeb3Modal(newWeb3Modal)
  }, []);


  useEffect(() => {
    // connect automatically and without a popup if user is already connected
    if(web3Modal && web3Modal.cachedProvider){
      reloadWallet()
    }
  }, [web3Modal]);

  const reloadWallet = async () => {
    await connectWallet();
  }

  const addListeners = async (web3ModalProvider) => {

    web3ModalProvider.on("accountsChanged", (accounts) => {
      cleanSession();
    });
    
    // Subscribe to chainId change
    web3ModalProvider.on("chainChanged", (chainId) => {
      if (parseInt(chainId, 16) !== 90001) {
        alert("Not connected to the chainId");
        cleanSession();
      }
    });
  }

  async function connectWallet() {
    console.log("##########connecting wallet#################");
    await web3Modal.clearCachedProvider();
    const provider = await web3Modal.connect();
    addListeners(provider);
    const ethersProvider = new providers.Web3Provider(provider);
    dispatch(setCurrentWallet(await ethersProvider.getSigner().getAddress()));
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [balance, setBalance] = useState({
    fx: 0,
    fxg: 0,
  });
  const [filters, setFilters] = useState({
    searchPrompt: "",
  });

  const cleanSession = () => {
    dispatch({ type: "DESTROY_SESSION" });
  };


  const initWalletData = async () => {
    if (userAddress && web3) {
      const fxg = await loadERC20Contract()
        .methods.balanceOf(userAddress)
        .call();
      web3.eth.getBalance(userAddress, (err, wei) => {
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
    if(userAddress) {
      initWalletData();
    }
  }, [userAddress])



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
            <ul className={`navbar-nav ${userAddress ? "" : "mr-3"}`}>
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

            {userAddress ? (
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
              {userAddress
                ? optimizeWalletAddress(userAddress)
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
