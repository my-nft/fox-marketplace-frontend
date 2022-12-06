import FilterInput from "./Filters"
import ListNfts from './NFTs';
import { useState } from "react";
import AccountHeader from "./AccountHeader";
import { useEffect } from "react";
import { getNfts } from '../../api/nftApi'
import { useDispatch, useSelector } from "react-redux";
import { selectConnectedUser } from "../../redux/userReducer";
import { selectAccountOwner, selectCollected, selectCollections, selectCreated, selectIsLoadingAccount, selectNfts } from "../../redux/accountReducer";
import Spinner from "../../components/Spinner";
import { LOAD_ACCOUNT_DATA, LOAD_USER } from "../../saga/actions";

const AccountPage = () => {

    const [visible, setVisible] = useState(false);
    const [viewType, setViewType] = useState("CHANGE_FOR_MIN");
    const [activeSection, setActiveSection] = useState("COLLECTIONS")

    const dispatch = useDispatch()
    const collectionAddress = useSelector(selectConnectedUser);
    const isLoading = useSelector(selectIsLoadingAccount);
    
    const accountOwner = useSelector(selectAccountOwner);

    const data = {
        COLLECTIONS: useSelector(selectCollections),
        NFTS: useSelector(selectNfts),
        CREATED: useSelector(selectCreated),
        COLLECTED: useSelector(selectCollected)
        
    }
  


    useEffect(() => {
        if(collectionAddress){
            dispatch({
                type: LOAD_ACCOUNT_DATA,
                payload: {
                    collectionAddress: collectionAddress?.address,
                    page: 1,
                    numberElements: 10,
                    filter: false
                }
            })
        }
       
       
    }, [collectionAddress])
   

    return(
        <div>
           
            {
                isLoading
                ? <Spinner />
                :
                <> 
                        <AccountHeader user={accountOwner} />
                        <FilterInput
                            onOpenClose={() => setVisible(!visible)}
                            onChangeSelectedView={setViewType}
                            onChangeActiveSection={setActiveSection}
                        />
                        <ListNfts activeSection={activeSection} isVisible={visible} viewType={viewType} collectionNFTs={data} />

                </>

            }
            <span className="d-block mt-4 mb-5"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     ></span>
           
        </div>
    )
}

export default AccountPage