import { ReactComponent as WebIcon } from "../../assets/icons/web.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons/medium.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegram.svg";

const Socials = ({ collectionDetails, setCollectionDetails }) => {
  return (
    <div className="socials settingsGroup">
      <h2>Social Links</h2>
      <div className="socialLink">
        <WebIcon />
        <div className="settingGroup">
          <div className="inputWrapper">
            <input
              type="text"
              name="websiteUrl"
              id="websiteUrl"
              placeholder="Website Url"
              value={collectionDetails.linkWebsite}
              onChange={(e) =>
                setCollectionDetails({
                  ...collectionDetails,
                  linkWebsite: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="socialLink">
        <MediumIcon />
        <div className="settingGroup">
          <div className="inputWrapper">
            <input
              type="text"
              name="mediumUrl"
              id="mediumUrl"
              placeholder="Medium Url"
              value={collectionDetails.linkMedium}
              onChange={(e) =>
                setCollectionDetails({
                  ...collectionDetails,
                  linkMedium: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="socialLink">
        <TelegramIcon />
        <div className="settingGroup">
          <div className="inputWrapper">
            <input
              type="text"
              name="telegramUrl"
              id="telegramUrl"
              placeholder="Telegram Url"
              value={collectionDetails.linkTelegram}
              onChange={(e) =>
                setCollectionDetails({
                  ...collectionDetails,
                  linkTelegram: e.target.value,
                })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Socials;
