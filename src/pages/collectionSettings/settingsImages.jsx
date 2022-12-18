import uploadIcon from "../../assets/images/create_icon_3.png";

const SettingsImages = ({ settingsState, setSettingsState }) => {
  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        if (type === "profile") {
          setSettingsState({
            ...settingsState,
            profileImage: e.target.result,
          });
        } else {
          setSettingsState({
            ...settingsState,
            bannerImage: e.target.result,
          });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <form className="collectionSettingsImages">
      <div className="settingsGroup imageChange profileChange">
        <h2>Profile Image</h2>
        <label htmlFor="profileChange">
          <img
            src={
              settingsState.profileImage
                ? settingsState.profileImage
                : uploadIcon
            }
            alt="profile"
          />
          <div className="changeOverlay">
            <img src={uploadIcon} />
            <p>Change image</p>
          </div>
          <input
            type="file"
            name="profileChange"
            id="profileChange"
            onChange={(e) => handleImageChange(e, "profile")}
          />
        </label>
      </div>
      <div className="settingsGroup imageChange bannerChange">
        <h2>Banner Image</h2>
        <label htmlFor="bannerChange">
          <img
            src={
              settingsState.bannerImage ? settingsState.bannerImage : uploadIcon
            }
            alt="banner"
          />
          <div className="changeOverlay">
            <img src={uploadIcon} />
            <p>Change image</p>
          </div>
          <input
            type="file"
            name="bannerChange"
            id="bannerChange"
            onChange={(e) => handleImageChange(e, "banner")}
          />
        </label>
      </div>
    </form>
  );
};

export default SettingsImages;
