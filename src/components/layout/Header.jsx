import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  connectWallet,
  getCurrentWalletConnected,
} from "../../interactors/blockchainInteractor";
import { selectConnectedUser, setCurrentWallet } from "../../redux/userReducer";
import { LOAD_USER } from "../../saga/actions";
import { optimizeWalletAddress } from "../../utils/walletUtils";

const Header = () => {
  const dispatch = useDispatch();

  const [connectedWallet, setConnectedWallet] = useState(undefined);
  const connectedUser = useSelector(selectConnectedUser);

  const handleSignIn = () => {
    console.log("HETRE");
    connectWallet();
    const connectedWallet = getCurrentWalletConnected();
    if (connectWallet) {
      setConnectedWallet(connectedWallet);
      dispatch(setCurrentWallet(connectedWallet));

      dispatch({ type: LOAD_USER, payload: connectedWallet });
    }
  };

  const addWalletListener = () => {
    window.ethereum.on("accountsChanged", async (accounts) => {
      dispatch({ type: "DESTROY_SESSION" });
      setConnectedWallet(undefined);
      handleSignIn();
    });
  };

  useEffect(() => {
    addWalletListener();
    handleSignIn();
  }, []);

  useEffect(() => {
    console.log("USER SETTED", connectedUser);
  }, [connectedUser]);

  return (
    <>
      <header className="container-fluid">
        <nav className="navbar navbar-expand-lg">
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
                <Link className="nav-link" to="/">
                  Stats
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Resource
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/creation">
                  Create
                </Link>
              </li>
            </ul>
          </div>

          <ul id="buttonIcon">
            {connectedWallet ? (
              <li>
                <Link to={"/profile"}>
                  <img src="/assets/icon-white-user.png" alt="" />
                </Link>
              </li>
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
        </nav>
      </header>
      <ToastContainer />

      <Outlet />
    </>
  );
};

export default Header;
