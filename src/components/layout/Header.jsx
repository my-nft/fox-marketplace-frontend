import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../../interactors/blockchainInteractor";
import {
  selectConnectedUser,
  selectConnectedWallet,
  setCurrentWallet,
} from "../../redux/userReducer";
import { LOAD_USER } from "../../saga/actions";
import { optimizeWalletAddress } from "../../utils/walletUtils";
import useOutsideClick from './../../utils/useOutsideClick';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const connectedUser = useSelector(selectConnectedUser);
  const connectedWallet = useSelector(selectConnectedWallet);

  const clickRef = useOutsideClick(() => {
    document.querySelector(".navbar-collapse").classList.remove("show");
  })

  const handleSignIn = () => {
    connectWallet();
    const connectedWallet = getCurrentWalletConnected();
    dispatch(setCurrentWallet("0x3e772a1Aedd9Baf457b144d454092481c46acaBC"));
    dispatch({ type: LOAD_USER, payload: connectedWallet });
  };

  const addWalletListener = () => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      console.log(
        "{############################ account changed #######################}"
      );
      dispatch({ type: "DESTROY_SESSION" });

      navigate("/");
      handleSignIn();
    });
  };

  useEffect(() => {
    addWalletListener();
  }, []);

  useEffect(() => {
    console.log("USER SETTED", connectedUser);
  }, [connectedUser]);

  return (
    <>
      <header className="container-fluid">
        <nav className="navbar navbar-expand-xl" ref={clickRef}>
          <Link className="navbar-brand" to="/">
            <img src="/assets/images/Logo_foxchange.png" alt="" />
          </Link>
          <form className="form-inline my-2 my-lg-0 ">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search NFTs, collections, artist and genres..."
              aria-label="Search"
              id="formSearch"
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
      <ToastContainer />

      <Outlet />
    </>
  );
};

export default Header;
