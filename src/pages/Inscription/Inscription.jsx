import { validate } from "bitcoin-address-validation";
import { useFormik } from "formik";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import Spinner from "../../components/Spinner";
import { REQUEST_INSCRIPTION } from "../../saga/actions";
import { getTotalCostData } from "../../services/bitCoinInscription";
import styles from "./Inscription.module.css";

const FILE_PREVIEW_PLACEHOLDER_IMAGE_SOURCE =
  "/assets/images/upload-preview@2x.png";

const FIFTY_KILOBYTES = 50_000;

const validateForm = (values) => {
  const errors = {};

  if (!values.receiverBitcoinAddress) {
    errors.receiverBitcoinAddress = "Required";
  }

  if (
    values.receiverBitcoinAddress &&
    !validate(values.receiverBitcoinAddress)
  ) {
    errors.receiverBitcoinAddress = "Pattern";
  }

  if (!values.image) {
    errors.image = "Required";
  }

  if (values.image && values.image.size > FIFTY_KILOBYTES) {
    errors.image = "FileSize";
  }

  return errors;
};

const Inscription = () => {
  const [totalCostData, setTotalCostData] = useState({});
  const [imageSrc, setImageSrc] = useState(
    FILE_PREVIEW_PLACEHOLDER_IMAGE_SOURCE
  );
  const [isInscriptionError, setIsInscriptionError] = useState(false);
  const defaultBtnRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { isConnected } = useAccount();

  const handleFileSelect = () => {
    defaultBtnRef.current.click();
  };

  const handleImage = (event) => {
    const file = defaultBtnRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async function () {
        const result = reader.result;
        if (file.size <= FIFTY_KILOBYTES) {
          setImageSrc(result);
          const estimatedCostData = await getTotalCostData(file.size);
          setTotalCostData(estimatedCostData);
        }
      };
      reader.readAsDataURL(file);
      formik.setFieldValue(
        "image",
        event.target.files && event.target.files.length !== 0
          ? event.target.files[0]
          : null
      );
    }
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);
    dispatch({
      type: REQUEST_INSCRIPTION,
      payload: {
        imageFile: values.image,
        fileSize: values.image.size,
        estimatedCost: totalCostData.fxgCost,
        receiverAddress: values.receiverBitcoinAddress,
      },
      onSuccess: (inscriptionRes) => {
        toast.success("Inscription success");
        console.log("Inscription success");
        toast.success(inscriptionRes, {
          autoClose: false,
        });
        setIsLoading(false);
      },
      onError: (error) => {
        console.log("Inscription error");
        toast.error(error.message);
        setIsInscriptionError(true);
        setIsLoading(false);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      receiverBitcoinAddress: "",
      image: undefined,
    },
    validate: validateForm,
    onSubmit: handleFormSubmit,
  });

  const formatTotalCost = (costData) => {
    if (!costData.fxCost || !costData.fxgCost) {
      return '';
    }
    return `${costData.fxCost}FX + ${costData.fxgCost}FXG`;
  };

  return (
    <>
      {isLoading ? (
        <div className="processing processingMargin">
          <Spinner />
          <h2>Processing</h2>
        </div>
      ) : (
        <section className={styles.content} id="ContentSection">
          <div className={styles.section} id="DataContent">
            <div className={styles.sectioncontent} id="ContentContainer">
              <div className={styles["fee-field"]} id="PriceField">
                <h1
                  className={styles["total-fee"]}
                  onClick={() => {
                    console.log("test");
                    toast.success("Inscription success");
                  }}
                >
                  Total Cost:
                </h1>
                <div className={styles.displayfee} id="TotalPriceDisplay">
                  {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                  <a className={styles.a} id="totalPrice">
                    {formatTotalCost(totalCostData)}
                  </a>
                </div>
              </div>
              <form
                id="UploadForm"
                onSubmit={formik.handleSubmit}
                className={styles.sectioncontent}
              >
                <div className={styles["fee-field"]} id="AddressField">
                  {/* one h1 by page rule? */}
                  <h1 className={styles["total-fee"]}>Receiver BTC address:</h1>
                  <div className={styles["displayfee-parent"]}>
                    <input
                      className={styles.displayfee2}
                      type="text"
                      placeholder="bc1plj2 ... cmkwd26740"
                      id="ReceiverAddressInputField"
                      value={formik.values.receiverBitcoinAddress}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "receiverBitcoinAddress",
                          e.target.value
                        );
                      }}
                    />
                    {formik.errors.receiverBitcoinAddress === "Pattern" && (
                      <label
                        className={styles["save-and-submit"]}
                        htmlFor="ReceiverAddressInputField"
                      >
                        * Only valid bitcoin addresses!
                      </label>
                    )}
                  </div>
                </div>
                <div className={styles["upload-field"]} id="UploadField">
                  <h1 className={styles["total-fee"]}>Upload file:</h1>
                  <div className={styles["uploadbtn-preview"]}>
                    <div className={styles["upload-preview-group"]}>
                      <img
                        className={styles["upload-preview-icon"]}
                        alt=""
                        id="fileImg"
                        src={imageSrc}
                      />
                      <label
                        className={styles.preview}
                        htmlFor="PreviewContainer"
                      >
                        *Preview
                      </label>
                      {formik.errors.image === "FileSize" && (
                        <label className={styles.preview}>
                          File size is limited to 50kb
                        </label>
                      )}
                    </div>
                    <div className={styles.container}>
                      <div className={`${styles.wrapper}`}>
                        <div className={styles.image}>
                          <img id="fileImg" src="" alt="" />
                        </div>
                        <div className={styles.content}>
                          <div className={styles.icon}>
                            <i className="fas fa-cloud-upload-alt"></i>
                          </div>
                          <div className={styles.text}>
                            No file chosen, yet!
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={handleFileSelect}
                        id={styles["custom-btn"]}
                      >
                        Choose a file
                      </button>
                      <input
                        id="default-btn"
                        type="file"
                        accept="image/png, image/jpeg"
                        hidden
                        ref={defaultBtnRef}
                        onChange={(e) => handleImage(e)}
                      />
                    </div>
                    <div
                      className={styles["upload-btn-group"]}
                      id="UploadBtnContainer"
                    >
                      <input
                        className={styles["btn-upload"]}
                        type="file"
                        name="btn-upload"
                      />
                      <label className={styles.preview}>*Upload file</label>
                    </div>
                  </div>
                </div>
                <div
                  className={styles["displayfee-parent"]}
                  id="SubmitBtnContainer"
                >
                  <button
                    className={styles["btn-submit"]}
                    id="SubmitBtn"
                    type="submit"
                    disabled={!isConnected}
                  >
                    <h2 className={styles.submit}>Request inscription</h2>
                  </button>
                  <label
                    className={styles["save-and-submit"]}
                    htmlFor="SubmitBtn"
                  >
                    *Save and Submit
                  </label>
                  {isInscriptionError && (
                    <>
                      <button
                        className={styles["btn-submit"]}
                        id="SubmitBtn"
                        type="button"
                      >
                        <h2 className={styles.submit}>Request refund</h2>
                      </button>
                      <label
                        className={styles["save-and-submit"]}
                        htmlFor="SubmitBtn"
                      >
                        *In case of inscription error only!
                      </label>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Inscription;
