import { useState } from "react";
import { ReactComponent as Clipboard } from "../../assets/icons/clipboard.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import uploadIcon from "../../assets/images/create_icon_3.png";

const CollectionSettings = (props) => {
  const [settingsState, setSettingsState] = useState({
    name: "Shading Clouds",
    token: "asd556wdw",
    address: "0x1234567890",
    owner: "TheOni",
    imgUrl: "../../assets/images/Element19.png",
  });

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setSettingsState({
          ...settingsState,
          imgUrl: e.target.result,
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const clipboardCopy = (value) => {
    navigator.clipboard.writeText(value);
  };

  return (
    <div className="collectionSettings">
      <h1>Configure Your Collection</h1>
      <p>
        Here you can configure your collection. You can change the collection
        name, collection image, collection token, collection address and
        collection owner.
      </p>
      <div className="collectionSettingsWrapper">
        <form className="settingsForm">
          <h2 className="settingsTitle">Collection Info</h2>
          <p className="setttingsDescription">
            Here you can change information regarding the collection
          </p>
          <div className="settingGroup">
            <label htmlFor="name">Collection Name</label>
            <div className="inputWrapper">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Collection Name"
                value={settingsState.name}
                onChange={(e) =>
                  setSettingsState({
                    ...settingsState,
                    name: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className="settingGroup">
            <label htmlFor="name">Collection Token</label>
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

          <div className="settingGroup">
            <label htmlFor="name">Collection Address</label>
            <div className="inputWrapper">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Collection Address"
                value={settingsState.address}
                onChange={(e) =>
                  setSettingsState({
                    ...settingsState,
                    address: e.target.value,
                  })
                }
              />
              <Clipboard onClick={() => clipboardCopy(settingsState.address)} />
            </div>
          </div>

          <div className="settingGroup">
            <label htmlFor="name">Collection Owner</label>
            <div className="ownership">
              <div className="inputWrapper">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Collection Owner"
                  value={settingsState.owner}
                  onChange={(e) =>
                    setSettingsState({
                      ...settingsState,
                      owner: e.target.value,
                    })
                  }
                />
                <Clipboard onClick={() => clipboardCopy(settingsState.owner)} />
              </div>
              <p className="transferOwnership">Transfer Ownership</p>
            </div>
          </div>

          <div className="settingsButtons">
            <button type="submit">Save Changes</button>
            <p className="delete">
              <Trash />
              Delete Collection
            </p>
          </div>
        </form>
        <form action="" className="imageChange">
          <h2 className="settingsTitle">Collection Image</h2>
          <p className="settingsDescription">
            Here you can change the collection image
          </p>
          <label htmlFor="imageChange">
            <img src={settingsState.imgUrl} />
            <div className="changeOverlay">
              <img src={uploadIcon} />
              <p>Change image</p>
            </div>
            <input
              type="file"
              name="imageChange"
              id="imageChange"
              onChange={handleImageChange}
            />
          </label>
          <div className="settingsButtons">
            <button type="submit">Save changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionSettings;
