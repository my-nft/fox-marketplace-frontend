import { getCurrentWalletConnected } from "../../utils/blockchainInteractor"

export const RenderIfOwner = ({addressOwner, children}) => {
    const connectedWallet = getCurrentWalletConnected();
    return (
        connectedWallet === addressOwner ? {children} : null
    )
}



export const RenderIfNotOwner = ({addressOwner, children}) => {
    const connectedWallet = getCurrentWalletConnected();
    return (
        connectedWallet !== addressOwner ? {children} : null
    )
}
