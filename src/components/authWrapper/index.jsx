import { Children, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentWallet } from "../../redux/userReducer";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();

  const connectedWallet = useSelector(selectCurrentWallet);

  useEffect(() => {
    if (!connectedWallet) {
      navigate("/");
    }
  });

  return children;
};

export default AuthWrapper;
