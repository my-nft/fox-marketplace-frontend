import { Children, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentWalletConnected } from "../../interactors/blockchainInteractor";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  const connectedWallet = useSelector(getCurrentWalletConnected);

  useEffect(() => {
    if (!connectedWallet) {
      navigate("/");
    }
  });

  return children;
};

export default AuthWrapper;
