import { useEffect, useState } from "react";
import Spinner from "./../../components/Spinner";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { MINT_COLLECTION } from "../../saga/actions";
import { toast } from "react-toastify";
import { selectIsLoading, setIsLoading } from "../../redux/collectionReducer";
import CustomSelect from "../../components/Select";

const CreateCollection = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageData, setImageData] = useState(null);
  const loading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file.size > 15000000) {
      toast.error("File size too large");
      return;
    }

    if (file) {
      const url = URL.createObjectURL(file);
      let reader = new FileReader();
      reader.onloadend = () => {
        setImageData(file);
        setImageUpload(url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // convert form inputs to data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if (!imageData) {
      toast.error("Please upload an image");
      return;
    }

    if (data) {
      let dataValid = true;
      Object.keys(data).forEach((key) => {
        console.log(data);
        if (data[key] === "" && key !== "royaltyAddress") {
          dataValid = false;
        }
      });
      if (dataValid) {
        handleMintCollection(data);
      }
    }
  };

  const handleMintCollection = async (data) => {
    dispatch({
      type: MINT_COLLECTION,
      payload: {
        data: {
          artistName: data.artistName,
          description: data.description,
          name: data.name,
          royaltyAddress: data.royaltyAddress,
          royaltyPercent: data.royaltyPercent,
          symbol: data.symbol,
        },
        image: imageData,
      },
      onSuccess: (collectionAddress) => {
        toast.success(
          "Congratulations, your Collection has been created successfully"
        );
        navigate(`/collection/${collectionAddress}`);
      },
    });
  };

  return (
    <section id="createCollection" className="my-2">
      <img src="/assets/images/Background.jpg" id="layer" alt="" />
      <h3 className="text-center mb-5">Create Collection</h3>
      <div className="container pt-3">
        {loading ? (
          <div className="processing processingMargin">
            <Spinner />
            <h2>Processing</h2>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="row text-center">
            <div className="col-md-4 col-sm-12 mb-5">
              <label
                id="upload"
                className={`${imageUpload ? "uploaded" : null}`}
              >
                <img src={imageUpload} alt="" />
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="50"
                    height="50"
                    fill="currentColor"
                    className="bi bi-cloud-arrow-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                    />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                  </svg>
                  <input
                    type="file"
                    name="upload"
                    id="uploadImage"
                    onChange={(e) => handleImageUpload(e)}
                  />
                  <p>Upload Image</p>
                  <span>Max 8 Mb.</span>
                </div>
              </label>
            </div>
            <div className="col-md-8 col-sm-12 mb-5 text-left px-5">
              <h3>Collection Info</h3>
              <div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputTokName">Collection Token Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTokName"
                      placeholder="cats"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputArtName">Artist Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputArtName"
                      placeholder="Zak"
                      name="artistName"
                    />
                  </div>

                  <div className="form-group col-md-6">
                    <label htmlFor="inputTokSym">Collection Token Symbol</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputTokSym"
                      placeholder="cat"
                      name="symbol"
                      required
                    />
                  </div>
                </div>

                <h4 className="mt-4">Description</h4>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="ItemDescription">Item Description</label>
                    <textarea
                      className="form-control"
                      id="ItemDescription"
                      rows="2"
                      name="description"
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Royalty Address</label>

                    <input
                      type="text"
                      className="form-control"
                      name="royaltyAddress"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Royalty Percent (%)</label>
                    <CustomSelect
                      name="royaltyPercent"
                      defaultValue={{ value: "0", label: "0" }}
                      options={[
                        { value: "0", label: "0" },
                        { value: "1", label: "1" },
                        { value: "2", label: "2" },
                        { value: "3", label: "3" },
                        { value: "4", label: "4" },
                        { value: "5", label: "5" },
                        { value: "6", label: "6" },
                        { value: "7", label: "7" },
                        { value: "8", label: "8" },
                        { value: "9", label: "9" },
                        { value: "10", label: "10" },
                      ]}
                    />
                  </div>
                </div>

                <button type="submit" className="btn">
                  Create Collection
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CreateCollection;
