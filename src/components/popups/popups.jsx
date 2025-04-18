import { useEffect, useState } from "react";
import { isValidAddress } from "ethereumjs-util";

const EntryField = ({ type, submitAction }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const dataFromEntries = Object.fromEntries(formData.entries());

    console.log(dataFromEntries);

    submitAction(dataFromEntries);
    //clear input field values

    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="entry-fields">
        <div className="entry-field">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>

        {type === "attributes" ? (
          <div className="entry-field">
            <label htmlFor="value">Value</label>
            <input required type="text" id="value" name="value" />
          </div>
        ) : (
          <div className="grouped-fields">
            <div className="entry-field">
              <label htmlFor="valueMin">Type</label>
              <input required type="number" id="valueMin" name="valueMin" />
            </div>
            <p>of</p>
            <div className="entry-field">
              <label htmlFor="valueMax">Type</label>
              <input required type="number" id="valueMax" name="valueMax" />
            </div>
          </div>
        )}
      </div>
      <button type="submit">Add Property</button>
    </form>
  );
};

export const CreateNFTPopup = ({
  popupType,
  popupTitle,
  popupCloseAction,
  handleAddToArray,
  handleRemoveFromArray,
  nftData,
}) => {
  const handleAddItem = (newObject) => {
    let objectToAdd = {
      trait_type: newObject.name,
      value: newObject.value,
      name: newObject.name,
    };
    console.log(objectToAdd);
    handleAddToArray(popupTitle, objectToAdd);
  };

  return (
    <PopupContainerWrapper
      popupType={popupType}
      popupCloseAction={popupCloseAction}
    >
      <div className="popup-wrapper">
        <div className="popupHeader">
          <div className="popup-header-text">
            <h3>{popupTitle === "attributes" ? "Attributes" : null}</h3>
            <p>
              {popupTitle === "attributes"
                ? "Textual traits that show up as rectangles"
                : null}
            </p>
          </div>
          <p className="popup-close" onClick={() => popupCloseAction(false)}>
            X
          </p>
        </div>
        <div className="popup-existing-values">
          {nftData[popupTitle] &&
            nftData[popupTitle].map((item, index) => {
              return (
                <div key={index} className="popup-existing-value">
                  <p>{item.trait_type}</p>
                  {
                    <div>
                      {popupTitle === "attributes" ? (
                        <p>{item.value}</p>
                      ) : popupTitle === "levels" ? (
                        <>
                          <progress value={item.valueMin} max={item.valueMax} />
                          <p>
                            {item.valueMin} of {item.valueMax}
                          </p>
                        </>
                      ) : (
                        <p>{item.value}</p>
                      )}
                    </div>
                  }
                  <p>{item.value}</p>
                  <p
                    className="trait-remove"
                    onClick={() =>
                      handleRemoveFromArray(popupTitle, {
                        name: item.name,
                      })
                    }
                  >
                    Remove
                  </p>
                </div>
              );
            })}
        </div>
        <EntryField type={popupType} submitAction={handleAddItem} />
      </div>
    </PopupContainerWrapper>
  );
};

export const OwnershipTransferPopup = ({
  submitAction,
  popupCloseAction,
  popupType,
}) => {
  const [address, setAddress] = useState("");
  const [addressValidity, setAddressValidity] = useState(false);

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  useEffect(() => {
    console.log(isValidAddress(address));
    if (isValidAddress(address)) {
      setAddressValidity(true);
    } else {
      setAddressValidity(false);
    }
  }, [address]);

  return (
    <PopupContainerWrapper
      popupType={popupType}
      popupCloseAction={popupCloseAction}
    >
      <div className="popup-wrapper transferPopup">
        <div className="popupHeader">
          <div className="popup-header-text">
            <h3>Transfer NFT</h3>
            <p>Enter the address of the new owner</p>
          </div>
          <p className="popup-close" onClick={() => popupCloseAction(false)}>
            X
          </p>
        </div>
        <form onSubmit={submitAction}>
          <input
            type="text"
            name="newOwner"
            className="form-control"
            onChange={(e) => handleAddressChange(e)}
            value={address}
            autoFocus={popupType}
          />
          <button
            type="submit"
            className={`transferOwnership ${addressValidity && "showTransfer"}`}
          >
            Transfer
          </button>
        </form>
      </div>
    </PopupContainerWrapper>
  );
};

const PopupContainerWrapper = ({
  popupType,
  children,
  popupCloseAction = () => {},
}) => {
  return (
    <div className={`popup-container ${popupType ? "popup-show" : null}`}>
      <div
        className="popup-background"
        onClick={() => popupCloseAction(false)}
      />
      {children}
    </div>
  );
};

export default PopupContainerWrapper;
