import { ReactComponent as WebIcon } from "../../assets/icons/web.svg";
import { ReactComponent as MediumIcon } from "../../assets/icons/medium.svg";
import { ReactComponent as TelegramIcon } from "../../assets/icons/telegram.svg";

const Socials = ({ settingsState, setSettingsState }) => {
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
              value={settingsState.linkWebsite}
              onChange={(e) =>
                setSettingsState({
                  ...settingsState,
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
              value={settingsState.linkMedium}
              onChange={(e) =>
                setSettingsState({
                  ...settingsState,
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
              value={settingsState.linkTelegram}
              onChange={(e) =>
                setSettingsState({
                  ...settingsState,
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
