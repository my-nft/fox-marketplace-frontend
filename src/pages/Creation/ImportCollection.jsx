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

const ImportCollection = () => {
  const [loading, setLoading] = useState(true);
  const [contractType, setContractType] = useState("ERC721");
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

  return (
    <section id="importItem" className="my-2">
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
                      value={contractType}
                      onChange={(e) => setContractType(e)}
                      options={[
                        { value: "ERC721", label: "ERC721" },
                        { value: "ERC1155", label: "ERC1155" },
                      ]}
                      defaultValue={{ value: "ERC721", label: "ERC721" }}
                      required
                    />
                  </div>

                  <button
                    className="btn mx-auto py-3 d-block  "
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
