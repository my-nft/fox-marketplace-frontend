import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Web3Button } from "@web3modal/react";
import { Web3NetworkSwitch } from "@web3modal/react";

import {
  authProviderInstance,
  loadERC20Contract,
  web3Infura,
} from "../../utils/blockchainInteractor";
import ScrollToTop from "../scrollToTop";
import useOutsideClick from "./../../utils/useOutsideClick";
import SearchBar from "./../searchBar/searchBar";
import { selectCurrentWallet } from "../../redux/userReducer";
import { LOAD_USER } from "../../saga/actions";


import {
  useAccount,
} from 'wagmi'



const Header = () => {

  const dispatch = useDispatch();

  const [balance, setBalance] = useState({
    fx: 0,
    fxg: 0,
  });
  const [filters, setFilters] = useState({
    searchPrompt: "",
  });


  const { address, connector, isConnected } = useAccount(
    {
      onConnect({ address, connector, isReconnected }) {
        console.log('Connected', { address, connector, isReconnected })
        dispatch({
          type: LOAD_USER,
          payload: address,
        });
      },
      onDisconnect() {
        dispatch({
          type: "DESTROY_SESSION",
        });
      },
    }
  );

  console.log(address);


  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const userAddress = useSelector(selectCurrentWallet);



  const connectWA = async () => {
    const address = await authProviderInstance.login();
    authProviderInstance.addListners({
      clearSession: () =>
        dispatch({
          type: "DESTROY_SESSION",
        }),
    });
    dispatch({
      type: LOAD_USER,
      payload: address,
    });
  };

  const disconnect = async () => {
    await authProviderInstance.logout();
    dispatch({
      type: "DESTROY_SESSION",
    });
  };



  const initWalletData = async () => {
    const web3 = web3Infura;
    if (address && web3) {
      const contract = await loadERC20Contract(true);
      const fxg = await contract.methods.balanceOf(address).call();
      web3.eth.getBalance(address, (err, wei) => {
        if (!err) {
          const walletBalance = Number(
            web3.utils.fromWei(wei, "ether")
          ).toFixed(2);
          setBalance({
            ...balance,
            fx: walletBalance,
            fxg: Number(fxg / 10 ** 18).toFixed(0),
          });
        }
      });
    }
  };

  useEffect(() => {
    if (address) {
      initWalletData();
    }
  }, [address]);

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
            <ul className={`navbar-nav ${address ? "" : "mr-3"}`}>
              <li className="nav-item active">
                <Link className="nav-link" to="/explore">
                  Explore <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/creation">
                  Create
                </Link>
              </li>
            </ul>

            {address ? (
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


            <Web3NetworkSwitch/>
            <Web3Button/>
          </div>
        </nav>
      </header>
      <ToastContainer limit={1} />

      <Outlet />
    </>
  );
};

export default Header;
