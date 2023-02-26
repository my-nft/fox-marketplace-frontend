import { useSigner } from "wagmi";
import Spinner from "./components/Spinner";
const AppWrapper = ({children}) => {
    
  const { isLoading } = useSigner();

    return isLoading ? <Spinner /> : <>{children}</>;
  }


export default AppWrapper;