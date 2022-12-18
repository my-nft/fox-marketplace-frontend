import { useEffect, useState } from "react";
import Select from "react-select";
import { ReactComponent as Clipboard } from "../../assets/icons/clipboard.svg";
import { ReactComponent as WebIcon } from "../../assets/icons/web.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons/medium.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegram.svg";

import uploadIcon from "../../assets/images/create_icon_3.png";
import SettingsImages from "./settingsImages";
import Socials from "./socials";
import { useNavigate, useNavigation } from "react-router-dom";

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
  const [settingsState, setSettingsState] = useState({
    token: "asd556wdw",
    url: "0x1234567890",
    description: "This is a description",
    category: "Art",
    linkWebsite: "",
    linkMedium: "",
    linkTelegram: "",
    royaltyAddress: "",
    rightsDuration: "10 Years",
    profileImage: "../../assets/images/Element19.png",
    bannerImage: "../../assets/images/Element19.png",
  });

  const navigate = useNavigate();

  const handleSubmitData = (e) => {
    e.preventDefault();
    // navigate("/")
  };

  const clipboardCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  useEffect(() => {
    console.log(settingsState);
  }, [settingsState]);

  return (
    <div id="createCollection">
      <h2 className="collectionSettingsTitle">Create Collection</h2>
      <div className="collectionUpdateSettings">
        <SettingsImages
          settingsState={settingsState}
          setSettingsState={setSettingsState}
        />
        <form onSubmit={handleSubmitData} className="collectionSettingsData">
          <div className="settingsGroup">
            <h2>Collection Info</h2>
            <div className="settingGroup settingsWidthHalf">
              <label htmlFor="name">Collection Token Name</label>
              <div className="inputWrapper">
                <input
                  type="text"
                  name="token"
                  id="token"
                  placeholder="Collection Token"
                  value={settingsState.token}
                  onChange={(e) =>
                    setSettingsState({
                      ...settingsState,
                      token: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="settingGroup settingsWidthFull">
              <label htmlFor="name">Url</label>
              <div className="inputWrapper">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Collection url"
                  value={settingsState.url}
                  onChange={(e) =>
                    setSettingsState({
                      ...settingsState,
                      url: e.target.value,
                    })
                  }
                />
                <Clipboard onClick={() => clipboardCopy(settingsState.url)} />
              </div>
            </div>
            <div className="settingGroup settingsWidthFull">
              <label htmlFor="name">Item Description</label>
              <div className="inputWrapper">
                <textarea
                  name="description"
                  id="description"
                  placeholder="Item Description"
                  value={settingsState.description}
                  onChange={(e) =>
                    setSettingsState({
                      ...settingsState,
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
                  value: settingsState.category,
                  label: settingsState.category,
                }}
                onChange={(e) =>
                  setSettingsState({
                    ...settingsState,
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
            settingsState={settingsState}
            setSettingsState={setSettingsState}
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
                  value={settingsState.royaltyAddress}
                  onChange={(e) =>
                    setSettingsState({
                      ...settingsState,
                      royaltyAddress: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="settingGroup">
              <label htmlFor="rightsDuration">Rights Duration</label>
              <Select
                className="settingsWidthFull"
                name="rightsDuration"
                id="rightsDuration"
                value={{
                  value: settingsState.rightsDuration,
                  label: settingsState.rightsDuration,
                }}
                onChange={(e) =>
                  setSettingsState({
                    ...settingsState,
                    rightsDuration: e.value,
                  })
                }
                options={[
                  { value: "10 Years", label: "10 Years" },
                  { value: "20 Years", label: "20 Years" },
                  { value: "30 Years", label: "30 Years" },
                ]}
                styles={selectStyles}
              />
            </div>
          </div>
          <button type="submit">Create Collection</button>
        </form>
      </div>
    </div>
  );
};

export default CollectionSettings;
