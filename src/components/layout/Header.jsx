import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadERC20Contract } from "../../utils/blockchainInteractor";
import ScrollToTop from "../scrollToTop";
import useOutsideClick from "./../../utils/useOutsideClick";
import SearchBar from "./../searchBar/searchBar";

import { LOAD_USER } from "../../saga/actions";

import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { useAccount, useSigner } from "wagmi";
import Web3 from "web3";

import Ordinals from "./ordinals";

const Header = () => {
  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: signer } = useSigner();
  const [web3, setWeb3] = useState();

  const { address: connectedWallet } = useAccount({
    onConnect({ address, connector, isReconnected }) {
      console.log("Connected", { address, connector, isReconnected });
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
  });

  const [balance, setBalance] = useState({
    fx: 0,
    fxg: 0,
  });
  const [filters, setFilters] = useState({
    searchPrompt: "",
  });

  const initWalletData = async () => {
    if (web3) {
      const contract = await loadERC20Contract();
      const fxg = await contract.methods.balanceOf(connectedWallet).call();
      web3.eth.getBalance(connectedWallet, (err, wei) => {
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
    if (web3) {
      initWalletData();
    }
  }, [web3]);

  useEffect(() => {
    if (signer) {
      setWeb3(new Web3(signer?.provider?.provider));
    }
  }, [signer]);

  const handleClick = () => {
    document.querySelector(".navbar-collapse").classList.remove("show");
    document.querySelector("body").style.overflowY = "auto";
    document.querySelector("body").style.maxHeight = "auto";
  };

  useEffect(() => {
    if (document) {
      // add click event listeners to bootstrap links
      const links = document.querySelectorAll(".nav-item");
      links.forEach((link) => {
        link.addEventListener("click", handleClick);
      });
      document
        .querySelector(".navbar-brand")
        ?.addEventListener("click", handleClick);
      return () => {
        // remove click event listeners to bootstrap links
        links.forEach((link) => {
          link.removeEventListener("click", handleClick);
        });
        document
          .querySelector(".navbar-brand")
          ?.removeEventListener("click", handleClick);
      };
    }
  }, [document]);

  return (
    <>
      <ScrollToTop />
      <header className="container-fluid">
        <nav className="navbar navbar-expand-custom" ref={clickRef}>
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
            onClick={() => {
              let bodyHasOverflowHidden =
                document &&
                document.querySelector("body").style.overflowY === "hidden";
              if (bodyHasOverflowHidden) {
                document.querySelector("body").style.overflowY = "auto";
                document.querySelector("body").style.maxHeight = "auto";
              } else {
                document.querySelector("body").style.overflowY = "hidden";
                document.querySelector("body").style.maxHeight = "100vh";
              }
            }}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className={`navbar-nav ${connectedWallet ? "" : "mr-3"}`}>
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
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://genesis.foxchange.io/"
                >
                  Genesis
                </a>
              </li>

              <Ordinals>
                <a className="nav-link" href="https://www.foxchange.io/">
                  Explorer
                </a>
                <Link className="nav-link" to="/inscription">
                  Inscriptions
                </Link>
              </Ordinals>
            </ul>

            {connectedWallet ? (
              <ul id="buttonIcon">
                <li className="nav-item">
                  <Link className="nav-link" to="/account">
                    Account
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/profile"}>
                    <img src="/assets/icon-white-user.png" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
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

            <Web3NetworkSwitch />
            <div className="ml-3">
              <Web3Button balance="show" />
            </div>
          </div>
        </nav>
      </header>
      {/* <ToastContainer limit={0} /> */}

      <Outlet />
    </>
  );
};

export default Header;
