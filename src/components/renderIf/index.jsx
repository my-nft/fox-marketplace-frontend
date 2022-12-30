import { getCurrentWalletConnected } from "../../utils/blockchainInteractor"
import { useEffect, useState } from "react"

export const RenderIfOwner = async ({addressOwner, children}) => {
    const [connectedWallet, setConnectedUser] = useState();
    const init = async () => {
        setConnectedUser(await getCurrentWalletConnected())
    }
    useEffect(() => {
        init();
    }, [])
    
    return (
        connectedWallet === addressOwner ? {children} : null
    )
}



export const RenderIfNotOwner = async ({addressOwner, children}) => {
    const [connectedWallet, setConnectedUser] = useState();
    const init = async () => {
        setConnectedUser(await getCurrentWalletConnected())
    }
    useEffect(() => {
        init();
    }, [])
    return (
        connectedWallet !== addressOwner ? {children} : null
    )
}
