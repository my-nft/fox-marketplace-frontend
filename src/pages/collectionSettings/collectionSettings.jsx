import { useEffect, useState } from "react";
import { ReactComponent as Clipboard } from "../../assets/icons/clipboard.svg";
import { ReactComponent as Chevron } from "../../assets/icons/arrow.svg";

import SettingsImages from "./settingsImages";
import Socials from "./socials";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getCollectionByAddress } from "../../api/collectionApi";
import Spinner from "../../components/Spinner";
import { useDispatch } from "react-redux";
import { UPDATE_COLLECTION } from "../../saga/actions";
import CustomSelect from "../../components/Select";

const CollectionSettings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { collectionAddress } = useParams();
  const [isLoadingCollection, setIsLoadingCollection] = useState(true);
  const [collectionDetails, setCollectionDetails] = useState();
  const [image, setImage] = useState(collectionDetails?.image);
  const [banner, setBanner] = useState(collectionDetails?.banner);

  const [imageFile, setImageFile] = useState();
  const [bannerFile, setBannerFile] = useState();

  useEffect(() => {
    if (imageFile) {
      let url = URL.createObjectURL(imageFile);
      setImage(url);
    }
  }, [imageFile]);

  useEffect(() => {
    if (bannerFile) {
      let url = URL.createObjectURL(bannerFile);
      setBanner(url);
    }
  }, [bannerFile]);

  const init = async () => {
    setIsLoadingCollection(true);
    const response = await getCollectionByAddress(collectionAddress);
    const { data } = response;
    const {collection} = data;
    setCollectionDetails(collection);
    setImage(data.image);
    setBanner(data.banner);
    setIsLoadingCollection(false);
  };

  useEffect(() => {
    init();
  }, []);

  const handleSubmitData = (e) => {
    e.preventDefault();
    setIsLoadingCollection(true);
    dispatch({
      type: UPDATE_COLLECTION,
      payload: {
        collectionAddress,
        image: imageFile,
        banner: bannerFile,
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
        },
      },

      onSuccess: () => {
        setIsLoadingCollection(false);
        navigate(`/collection/${collectionAddress}`);
      },
      onError() {
        setIsLoadingCollection(false);
      },
    });

    // navigate("/")
  };

  const clipboardCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  return isLoadingCollection ? (
    <Spinner />
  ) : (
    <div id="createCollection">
      <Link
        to={`
      /collection/${collectionAddress}
      `}
        className="returnLink"
      >
        <Chevron />
        Return to Collection
      </Link>
      <h2 className="collectionSettingsTitle">Collection Settings</h2>
      <div className="collectionUpdateSettings">
        <SettingsImages
          setCollectionImage={setImageFile}
          setCollectionBanner={setBannerFile}
          image={image}
          banner={banner}
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
                <Clipboard
                  onClick={() => clipboardCopy(collectionDetails.url)}
                />
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

              <CustomSelect
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
                  onChange={(e) => {
                    if (!e.target.value) {
                      setCollectionDetails({
                        ...collectionDetails,
                        royaltyPercent: "0",
                        royaltyAddress: e.target.value,
                      });
                    } else {
                      setCollectionDetails({
                        ...collectionDetails,
                        royaltyAddress: e.target.value,
                      });
                    }
                  }}
                />
              </div>
            </div>
            <div className="settingGroup">
              <label htmlFor="royaltyPercent">Rights Amount</label>

              <CustomSelect
                className="settingsWidthFull"
                name="royaltyPercent"
                id="royaltyPercent"
                value={{
                  value: collectionDetails.royaltyPercent,
                  label: collectionDetails.royaltyPercent,
                }}
                onChange={(e) =>
                  setCollectionDetails({
                    ...collectionDetails,
                    royaltyPercent: e.value,
                  })
                }
                options={[
                  { value: "0", label: "0" },
                  { value: "1", label: "1" },
                  { value: "2", label: "2" },
                  { value: "3", label: "3" },
                  { value: "4", label: "4" },
                  { value: "5", label: "5" },
                  { value: "6", label: "6" },
                  { value: "7", label: "7" },
                  { value: "8", label: "8" },
                  { value: "9", label: "9" },
                  { value: "10", label: "10" },
                ]}
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
