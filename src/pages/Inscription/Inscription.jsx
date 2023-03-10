import styles from "./Inscription.module.css";

const Inscription = () => {
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
                    src="/assets/images/upload-preview@2x.png"
                  />
                  <label className={styles.preview} htmlFor="PreviewContainer">
                    *Preview
                  </label>
                </div>
                <div className={styles.container}>
                  <div className={styles.wrapper}>
                    <div className={styles.image}>
                      <img id="fileImg" src="" alt="" />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.icon}>
                        <i className="fas fa-cloud-upload-alt"></i>
                      </div>
                      <div className={styles.text}>No file chosen, yet!</div>
                    </div>
                    <div id={styles['cancel-btn']}>
                      <i className="fas fa-times"></i>
                    </div>
                    <div className={styles["file-name"]}>File name here</div>
                  </div>
                  <button onClick={() => {}} id={styles['custom-btn']}>
                    Choose a file
                  </button>
                  <input id="default-btn" type="file" hidden />
                </div>
                <div
                  className={styles["upload-btn-group"]}
                  id="UploadBtnContainer"
                >
                  <input
                    className={styles["btn-upload"]}
                    type="file"
                    required
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
