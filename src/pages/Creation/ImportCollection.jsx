import { isValidAddress } from "ethereumjs-util";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAccount } from "wagmi";
import CreationIcon from "../../components/CreationIcon";
import { selectIsLoading } from "../../redux/collectionReducer";
import { IMPORT_COLLECTION } from "../../saga/actions";
import { CONTRACT_TYPES } from "../../utils/foxConstantes";
import CustomSelect from "./../../components/Select";
import Spinner from "./../../components/Spinner";

const validateForm = (values) => {
  const errors = {};

  if (!values.collectionAddress) {
    errors.collectionAddress = "Required";
  }

  if (values.collectionAddress && !isValidAddress(values.collectionAddress)) {
    errors.collectionAddress = "Pattern";
  }

  if (values.contractType.value === "ERC1155") {
    if (
      (values.idsList.length === 0 &&
        values.idRange.start === 0 &&
        values.idRange.end === 0) ||
      +values.idRange.start > +values.idRange.end
    ) {
      errors.tokens = "Invalid";
    }
  }

  return errors;
};

const ImportCollection = () => {
  const [loading, setLoading] = useState(true);
  const [importType, setImportType] = useState("range");

  const loadingSelector = useSelector(selectIsLoading);
  const { isConnected } = useAccount();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    dispatch({
      type: IMPORT_COLLECTION,
      payload: {
        collectionAddress: values.collectionAddress,
        contractType: values.contractType,
        tokens:
          values.idsList.length > 0
            ? values.idsList
            : Array.from(
                {
                  length:
                    parseInt(values.idRange.end) -
                    parseInt(values.idRange.start),
                },
                (_, i) => i + parseInt(values.idRange.start)
              ),
      },
      onSuccess: async () => {
        toast.success(
          "Congratulations, your Collection has been imported successfully"
        );
        navigate(`/collection/${values["collectionAddress"]}`);
      },
    });
  };

  const formik = useFormik({
    initialValues: {
      collectionAddress: "",
      contractType: { value: "ERC721", label: "ERC721" },
      idRange: {
        start: 0,
        end: 0,
      },
      idsList: [],
      idBuffer: "",
    },
    validate: validateForm,
    onSubmit: handleFormSubmit,
  });

  useEffect(() => {
    setLoading(loadingSelector);
  }, [loadingSelector]);

  const handleAddId = async () => {
    if (formik.values.idRange.start > 0 || formik.values.idRange.end > 0) {
      return;
    }
    if (formik.values.idBuffer) {
      if (formik.values.idsList.includes(formik.values.idBuffer)) {
        toast.error("This id is already in the list");
        return;
      }
      formik.setFieldValue("idsList", [
        ...formik.values.idsList,
        formik.values.idBuffer,
      ]);
      formik.setFieldValue("idBuffer", "");
    }
  };

  const handleRemoveId = (idToRemove) => {
    formik.setFieldValue(
      "idsList",
      formik.values.idsList.filter((id) => id !== idToRemove)
    );
  };

  const notifyErrors = async () => {
    const formikErrors = await formik.validateForm();

    if (formikErrors.collectionAddress === "Required") {
      toast.error("Collection address is required");
    }

    if (formikErrors.collectionAddress === "Pattern") {
      toast.error("Invalid collection address");
    }

    if (formikErrors.tokens === "Invalid") {
      toast.error("Invalid Item IDs Range");
    }
  };

  return (
    <section id="importItem" className="my-2 mb-5">
      <img src="/assets/images/Background.jpg" id="layer" alt="" />
      <h3 className="text-center mb-5">Import Collection</h3>
      <div className="container">
        <div className="row text-center">
          <div className="col mb-5">
            <CreationIcon img="/assets/images/importCollection.png" />
          </div>
        </div>
        {loading ? (
          <div className="processing">
            <Spinner />
            <h2>Processing</h2>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col">
                <form onSubmit={formik.handleSubmit}>
                  <div className="form-row ">
                    <div className="form-group entry-field text-start">
                      <label htmlFor="collectionAddress mb-2">
                        Collection Address
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputArtName"
                        name="collectionAddress"
                        onChange={(e) => {
                          formik.setFieldValue(
                            "collectionAddress",
                            e.target.value
                          );
                        }}
                        value={formik.values.collectionAddress}
                        placeholder="Enter the Smart Contract Address of the Collection..."
                      />
                    </div>
                  </div>

                  <div className=" mt-5 mb-5 text-start entry-field ">
                    <label htmlFor="contractType mb-2">Contract Type</label>
                    <CustomSelect
                      name="contractType"
                      onChange={(newValue) => {
                        formik.setFieldValue("contractType", newValue);
                        formik.setFieldValue("idBuffer", "");
                        formik.setFieldValue("idsList", []);
                      }}
                      value={CONTRACT_TYPES.find(
                        (option) => option.value === formik.values.contractType
                      )}
                      options={CONTRACT_TYPES}
                      defaultValue={{ value: "ERC721", label: "ERC721" }}
                      isSearchable={false}
                    />
                  </div>
                  {formik.values.contractType.value === "ERC1155" && (
                    <>
                      <div className="importTypeChoice mb-4">
                        <p
                          className={
                            importType === "range" ? "importChoice" : ""
                          }
                        >
                          IDs Range
                        </p>
                        <label
                          htmlFor="importChoice"
                          className="toggler-wrapper"
                          onClick={() => {
                            if (importType === "range") {
                              setImportType("individual");
                            } else {
                              setImportType("range");
                            }
                          }}
                        >
                          <input
                            type="checkbox"
                            checked={importType === "individual"}
                          />
                          <div class="toggler-slider">
                            <div class="toggler-knob"></div>
                          </div>
                        </label>
                        <p
                          className={
                            importType === "individual" ? "importChoice" : ""
                          }
                        >
                          Individual IDs
                        </p>
                      </div>

                      {importType === "range" && (
                        <div className="form-row mb-5 ">
                          <div className="form-group entry-field text-start">
                            <label htmlFor="collectionAddress mb-2">
                              Item IDs Range
                            </label>
                            <div className="importIdsRange">
                              <input
                                type="number"
                                className="form-control"
                                name="collectionIdStart"
                                placeholder="First ID..."
                                value={formik.values.idRange.start}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "idRange.start",
                                    e.target.value
                                  );
                                }}
                                disabled={formik.values.idsList.length > 0}
                              />
                              <span className="input-group-text"></span>
                              <input
                                type="number"
                                name="collectionIdEnd"
                                className="form-control"
                                placeholder="Last ID..."
                                value={formik.values.idRange.end}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "idRange.end",
                                    e.target.value
                                  );
                                }}
                                disabled={formik.values.idsList.length > 0}
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {importType === "individual" && (
                        <div className="form-row mb-5 ">
                          <div className="form-group entry-field text-start">
                            <label htmlFor="collectionAddress mb-2">
                              Item IDs
                            </label>
                            <div className="importIdsContainer">
                              {formik.values.idsList.map((id, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="idToImportWrapper"
                                  >
                                    <p>{id}</p>
                                    <span
                                      className="input-group-text"
                                      onClick={() => handleRemoveId(id)}
                                    >
                                      -
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                            <div className="importIdWrapper">
                              <input
                                type="number"
                                className="form-control"
                                name="idToImport"
                                placeholder="First ID..."
                                value={formik.values.idBuffer}
                                onChange={(e) => {
                                  formik.setFieldValue(
                                    "idBuffer",
                                    e.target.value
                                  );
                                }}
                                disabled={
                                  formik.values.idRange.start > 0 ||
                                  formik.values.idRange.end > 0
                                }
                              />
                              <p
                                className="input-group-text"
                                onClick={handleAddId}
                              >
                                Add Id
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <button
                    className="btn mx-auto py-3 d-block mb-5   "
                    id="importSubmit"
                    type="button"
                    onClick={() => {
                      notifyErrors();
                      formik.handleSubmit();
                    }}
                    disabled={!isConnected}
                  >
                    Import Collection
                  </button>
                </form>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ImportCollection;
