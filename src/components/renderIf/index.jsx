import { getCurrentWalletConnected } from "../../utils/blockchainInteractor"

export const RenderIfOwner = async ({addressOwner, children}) => {
    const connectedWallet = await getCurrentWalletConnected();
    return (
        connectedWallet === addressOwner ? {children} : null
    )
}



export const RenderIfNotOwner = async ({addressOwner, children}) => {
    const connectedWallet = await getCurrentWalletConnected();
    return (
        connectedWallet !== addressOwner ? {children} : null
    )
}
