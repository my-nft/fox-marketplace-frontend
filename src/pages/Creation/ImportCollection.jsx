import CreationIcon from "../../components/CreationIcon";
import { useState } from "react";
import Spinner from "./../../components/Spinner";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { IMPORT_COLLECTION, LOAD_COLLECTION } from "../../saga/actions";
import { selectIsLoading } from "../../redux/collectionReducer";
import { useEffect } from "react";
import { delay } from "redux-saga/effects";
import { useNavigate } from "react-router-dom";

const ImportCollection = () => {
  const [loading, setLoading] = useState(true);
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
            dispatch({
              type: LOAD_COLLECTION,
              payload : {
                collectionAddress : data["collectionAddress"],
              },
              onSuccess: () => navigate("/collection")
            })
          }
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
            <div className="row text-center">
              <div className="col">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-row text-center">
                    <div className="form-group">
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

                  <button className="mt-5 contIcon withGlow" id="importSubmit">
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
