import { useRef, useState } from 'react';
import styles from "./Inscription.module.css";

const FILE_PREVIEW_PLACEHOLDER_IMAGE_SOURCE = "/assets/images/upload-preview@2x.png";

const Inscription = () => {
  const [imageSrc, setImageSrc] = useState(FILE_PREVIEW_PLACEHOLDER_IMAGE_SOURCE);
  const [isWrapperActive, setIsWrapperActive] = useState(false);
  const [fileName, setFileName] = useState("")
  const defaultBtnRef = useRef(null)

  const handleFileSelect = () => {
    defaultBtnRef.current.click()
  }

  const handleFilePreview = () => {
    // TODO: give more explicit name to regex and move to more generic file
    const regExp = /[0-9a-zA-Z\^\&\'\@\{\}\[\]\,\$\=\!\-\#\(\)\.\%\+\~\_ ]+$/;
    const file = defaultBtnRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const result = reader.result;
        setImageSrc(result)
        setIsWrapperActive(true);
      };
      reader.readAsDataURL(file);
    }
    if (defaultBtnRef.current.value) {
      let valueStore = defaultBtnRef.current.value.match(regExp);
      setFileName(valueStore);
    }
  }

  const handleImageUploadCancel = () => {
    setImageSrc('');
    setIsWrapperActive(false)
  }

  return (
    <>
      <section className={styles.content} id="ContentSection">
        <div className={styles.section} id="DataContent">
          <div className={styles.sectioncontent} id="ContentContainer">
            <div className={styles["fee-field"]} id="PriceField">
              <h1 className={styles["total-fee"]}>Total Cost:</h1>
              <div className={styles.displayfee} id="TotalPriceDisplay">
                <a className={styles.a} id="totalPrice">
                  2,52,354
                </a>
              </div>
            </div>
            <div className={styles["fee-field"]} id="AddressField">
              <h1 className={styles["total-fee"]}>Receiver BTC address:</h1>
              <div className={styles["displayfee-parent"]}>
                <input
                  className={styles.displayfee2}
                  type="text"
                  placeholder="bc1plj2 ... cmkwd26740"
                  required
                  id="ReceiverAddressInputField"
                />
                <label
                  className={styles["save-and-submit"]}
                  htmlFor="ReceiverAddressInputField"
                >
                  * Only valid bitcoin addresses !
                </label>
              </div>
            </div>
            <div className={styles["upload-field"]} id="UploadField">
              <h1 className={styles["total-fee"]}>Upload file:</h1>
              <form className={styles["uploadbtn-preview"]} id="UploadForm">
                <div className={styles["upload-preview-group"]}>
                  <img
                    className={styles["upload-preview-icon"]}
                    alt=""
                    id="fileImg"
                    src={imageSrc}
                  />
                  <label className={styles.preview} htmlFor="PreviewContainer">
                    *Preview
                  </label>
                </div>
                <div className={styles.container}>
                  <div className={`${styles.wrapper} ${isWrapperActive ? 'active' : ''}`}>
                    <div className={styles.image}>
                      <img id="fileImg" src="" alt="" />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.icon}>
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <div className={styles.text}>No file chosen, yet!</div>
                    </div>
                    <div id={styles['cancel-btn']} onClick={handleImageUploadCancel}>
                      <i className="fas fa-times"></i>
                    </div>
                    <div className={styles["file-name"]}>{fileName}</div>
                  </div>
                  <button onClick={handleFileSelect} id={styles['custom-btn']}>
                    Choose a file
                  </button>
                  <input id="default-btn" type="file" hidden ref={defaultBtnRef} onChange={handleFilePreview} />
                </div>
                <div
                  className={styles["upload-btn-group"]}
                  id="UploadBtnContainer"
                >
                  <input
                    className={styles["btn-upload"]}
                    type="file"
                    required
                    name="btn-upload"
                  />
                  <label className={styles.preview}>*Upload file</label>
                </div>
              </form>
            </div>
            <div
              className={styles["displayfee-parent"]}
              id="SubmitBtnContainer"
            >
              <button
                className={styles["btn-submit"]}
                id="SubmitBtn"
                type="button"
              >
                <h2 className={styles.submit}>Request inscription</h2>
              </button>
              <label className={styles["save-and-submit"]} htmlFor="SubmitBtn">
                *Save and Submit
              </label>
              <button
                className={styles["btn-submit"]}
                id="SubmitBtn"
                type="button"
              >
                <h2 className={styles.submit}>Request refund</h2>
              </button>
              <label className={styles["save-and-submit"]} htmlFor="SubmitBtn">
                *In case of inscription error only !
              </label>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Inscription;
