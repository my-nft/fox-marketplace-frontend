import { useEffect, useState } from "react";
import Select from "react-select";
import { ReactComponent as Clipboard } from "../../assets/icons/clipboard.svg";
import { ReactComponent as WebIcon } from "../../assets/icons/web.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons/medium.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegram.svg";

import uploadIcon from "../../assets/images/create_icon_3.png";
import SettingsImages from "./settingsImages";
import Socials from "./socials";
import { useNavigate, useNavigation, useParams } from "react-router-dom";
import { getCollectionByAddress } from "../../api/collectionApi";
import Spinner from "../../components/Spinner";
import { useDispatch } from 'react-redux';
import { UPDATE_COLLECTION } from "../../saga/actions";

const selectStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(254, 254, 254, 0.8)",
    borderRadius: "0",
    boxShadow: "none",
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: "#000000",
    border: "1px solid #f58103",
    borderRadius: "8px",
    boxShadow: "0px 4px 4px #f5800373",
    boxShadow: "none",
  }),
  option: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: "transparent",
    color: "#FFFFFF",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "#f58103",
      color: "#fff",
    },
  }),
  singleValue: (styles) => ({
    ...styles,
    color: "#FFFFFF",
    padding: "8px 8px",
    height: "46px",
  }),
};

const CollectionSettings = () => {
  const { collectionAddress } = useParams();
  const [isLoadingCollection, setIsLoadingCollection] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState();

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const init = async () => {
    setIsLoadingCollection(true);
    const collection = await getCollectionByAddress(collectionAddress);
    setCollectionDetails(collection.data);
    setIsLoadingCollection(false);
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmitData = (e) => {
    e.preventDefault();

    dispatch({
      type: UPDATE_COLLECTION,
      payload: {
        collectionAddress,
        image: collectionDetails.image,
        banner: collectionDetails.banner,
        data: {
          category: collectionDetails.category,
          collectionAddress: collectionDetails.collectionAddress,
          createdAt: collectionDetails.createdAt,
          description: collectionDetails.description,
          importProcessing: false,
          linkMedium: collectionDetails.linkMedium,
          linkTelegram: collectionDetails.linkTelegram,
          linkWebsite: collectionDetails.linkWebsite,
          modificationDate: new Date().toISOString(),
          name: collectionDetails.name,
          ownerAddress: collectionDetails.ownerAddress,
          royaltyAddress: collectionDetails.royaltyAddress,
          royaltyPercent: collectionDetails.royaltyPercent,
          symbol: collectionDetails.symbol,
          tags: collectionDetails.tags,
          totalSupply: collectionDetails.totalSupply,
        }
      },
      
      onSuccess: () => {
        navigate(`/collections/${collectionAddress}`)
      }
    })



    // navigate("/")
  };

  const clipboardCopy = (value) => {
    navigator.clipboard.writeText(value);
  };
  console.log(collectionDetails)


  return isLoadingCollection ? (
    <Spinner />
  ) : (
    <div id="createCollection">
      <h2 className="collectionSettingsTitle">Collection Settings</h2>
      <div className="collectionUpdateSettings">
        <SettingsImages
          collectionDetails={collectionDetails}
          setCollectionDetails={setCollectionDetails}
          image={collectionDetails.image}
          banner={collectionDetails.banner}
        />
        <form onSubmit={handleSubmitData} className="collectionSettingsData">
          <div className="settingsGroup">
            <h2>Collection Info</h2>
            <div className="settingGroup settingsWidthFull">
              <label htmlFor="name">Url</label>
              <div className="inputWrapper">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Collection url"
                  value={collectionDetails.url}
                  onChange={(e) =>
                    setCollectionDetails({
                      ...collectionDetails,
                      url: e.target.value,
                    })
                  }
                />
                <Clipboard onClick={() => clipboardCopy(collectionDetails.url)} />
              </div>
            </div>
            <div className="settingGroup settingsWidthFull">
              <label htmlFor="name">Item Description</label>
              <div className="inputWrapper">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Item Description"
                  value={collectionDetails.description}
                  onChange={(e) =>
                    setCollectionDetails({
                      ...collectionDetails,
                      description: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="settingGroup settingsWidthHalf">
              <label htmlFor="name">Category</label>

              <Select
                className="settingsWidthFull"
                name="category"
                id="category"
                value={{
                  value: collectionDetails.category,
                  label: collectionDetails.category,
                }}
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    category: e.value,
                  })
                }
                options={[
                  { value: "Art", label: "Art" },
                  { value: "Collectibles", label: "Collectibles" },
                  { value: "Music NFTs", label: "Music NFTs" },
                  { value: "Photography", label: "Photography" },
                  { value: "Sports NFTs", label: "Sports NFTs" },
                  { value: "Trading Cards NFTs", label: "Trading Cards NFTs" },
                  { value: "Utility NFTs", label: "Utility NFTs" },
                ]}
                styles={selectStyles}
              />
            </div>
          </div>
          <Socials
            collectionDetails={collectionDetails}
            setCollectionDetails={setCollectionDetails}
          />
          <div className="settingsSplitGrouping">
            <div className="settingGroup">
              <label htmlFor="royaltyAddress">Royalty Address</label>
              <div className="inputWrapper">
                <input
                  type="text"
                  name="royaltyAddress"
                  id="royaltyAddress"
                  placeholder="Royalty Address"
                  value={collectionDetails.royaltyAddress}
                  onChange={(e) =>
                    setCollectionDetails({
                      ...collectionDetails,
                      royaltyAddress: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="settingGroup">
              <label htmlFor="royaltyPercent">Rights Amount</label>
              <Select
                className="settingsWidthFull"
                name="royaltyPercent"
                id="royaltyPercent"
                value={{
                  value: collectionDetails.royaltyPercent,
                  label: collectionDetails.royaltyPercent
                }}
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    royaltyPercent: e.value,
                  })
                }
                options={[
                  { value: "10%", label: "10%" },
                  { value: "20%", label: "20%" },
                  { value: "30%", label: "30%" },
                ]}
                styles={selectStyles}
              />
            </div>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default CollectionSettings;
