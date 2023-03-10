import CreationIcon from "../../components/CreationIcon";
import { useState } from "react";
import Spinner from "./../../components/Spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IMPORT_COLLECTION } from "../../saga/actions";
import { selectIsLoading } from "../../redux/collectionReducer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomSelect from "./../../components/Select";
import { CONTRACT_TYPES } from "../../utils/foxConstantes";

const ImportCollection = () => {
  const [loading, setLoading] = useState(true);
  const [contractType, setContractType] = useState("ERC721");
  const [importType, setImportType] = useState("range");
  const [idsList, setIdsList] = useState([]);
  const [idBuffer, setIdBuffer] = useState("");
  const loadingSelector = useSelector(selectIsLoading);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (data) {
      let dataValid = true;
      Object.keys(data).forEach((key) => {
        if (data[key] === "") {
          dataValid = false;
        }
      });
      if (dataValid) {
        dispatch({
          type: IMPORT_COLLECTION,
          payload: {
            collectionAddress: data["collectionAddress"],
          },
          onSuccess: async () => {
            toast.success(
              "Congratulations, your Collection has been imported successfully"
            );
            navigate(`/collection/${data["collectionAddress"]}`);
          },
        });
      } else {
        toast.error("Please fill the collection address !");
      }
    }
  };

  useEffect(() => {
    setLoading(loadingSelector);
  }, [loadingSelector]);

  useEffect(() => {
    setIdBuffer("");
    setIdsList([]);
  }, [contractType]);

  const handleAddId = () => {
    if (idBuffer) {
      if (idsList.includes(idBuffer)) {
        toast.error("This id is already in the list");
        return;
      }
      setIdsList([...idsList, idBuffer]);
      setIdBuffer("");
    }
  };

  const handleRemoveId = (idToRemove) => {
    setIdsList(idsList.filter((id) => id !== idToRemove));
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
                <form onSubmit={handleFormSubmit}>
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
                        required
                        placeholder="Enter the Smart Contract Address of the Collection..."
                      />
                    </div>
                  </div>

                  <div className=" mt-5 mb-5 text-start entry-field ">
                    <label htmlFor="contractType mb-2">Contract Type</label>
                    <CustomSelect
                      name="contractType"
                      value={CONTRACT_TYPES.find(
                        (option) => option.value === contractType
                      )}
                      onChange={(e) => setContractType(e.value)}
                      options={CONTRACT_TYPES}
                      defaultValue={{ value: "ERC721", label: "ERC721" }}
                      required
                    />
                  </div>
                  {contractType === "ERC1155" && (
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
                            console.log("AA");
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
                                type="text"
                                className="form-control"
                                name="collectionIdStart"
                                required
                                placeholder="First ID..."
                              />
                              <span className="input-group-text"></span>
                              <input
                                type="text"
                                name="collectionIdEnd"
                                className="form-control"
                                required
                                placeholder="Last ID..."
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
                            <div className="importIdsContainer mb-3">
                              {idsList.map((id, index) => {
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
                              {idsList.length === 0 && (
                                <p className="mb-0">No Ids</p>
                              )}
                            </div>
                            <div className="importIdWrapper">
                              <input
                                type="text"
                                className="form-control"
                                name="idToImport"
                                required={idsList.length === 0}
                                placeholder="First ID..."
                                value={idBuffer}
                                onChange={(e) => setIdBuffer(e.target.value)}
                              />
                              <p
                                className="input-group-text"
                                onClick={() => handleAddId()}
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
