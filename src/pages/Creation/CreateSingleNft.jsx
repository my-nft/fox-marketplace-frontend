import { useState } from "react";
import { toast} from "react-toastify";
import Spinner from "../../components/Spinner";
import { createNftDB } from "../../services/createNFT";
import { useSelector } from 'react-redux';
import { selectConnectedWallet, selectToken } from "../../redux/userReducer";
import PopupContainerWrapper from "../../components/popups/popups";

const CreateSingleNft = () => {

  const [imageUpload, setImageUpload] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popupStatus, setPopupStatus] = useState(false);
  const walletAddress = useSelector(selectConnectedWallet);
  const token = useSelector(selectToken)

  const [nftData, setNftData] = useState({
    artworkName: "",
    description: "",
    artistName: "",
    upload: null,
    email: "",
    rightsDuration: "10 years",
    rightsLevel: "level 1",
    properties: [],
    levels: [],
    stats: [],
  })

  const handleChange = (e) => {
    if(e.target.name === "upload") {
 
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(URL.createObjectURL(e.target.files[0]));
        setImageData(reader.result);
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setNftData({
        ...nftData,
        [e.target.name]: e.target.value
      })
    }
    
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(nftData);




    setLoading(false);

    /*
    // convert form inputs to data
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    data["walletAddress"] = walletAddress;
    data["upload"] = imageData;

    
    if(data){
      let dataValid = true;
      Object.keys(data).forEach((key) => {
        if(data[key] === ""){
          dataValid = false;
        }
      })
      if(dataValid){
        // create new NFT
        const createNFTResponse = await createNewNFT(data, token, "MARKET_PLACE_DEFAULT_VALUE");
      }
    }
    */
  }

  // const handleImageUpload = (e) => {
  //   const file = e.target.files[0];

  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     let reader = new FileReader();
  //     reader.onloadend = () => {
  //       setImageUpload(url);
  //       setImageData(reader.result);
  //     }
  //     reader.readAsDataURL(file);
      
  //   }
   

    
  // }



  return (
    <section id="createCollection" className="my-2">
      <PopupContainerWrapper values={nftData} updateAction={handleChange} popupType={popupStatus} popupCloseAction={setPopupStatus} />
      <img src="/assets/images/Background.jpg" id="layer" alt="" />
      <h3 className="text-center mb-5">Mint Your NFT</h3>
      <div className="container pt-3 ">
        {
          loading
          ?
          <div className="processing processingMargin">
            <Spinner />
            <h2>Processing</h2>
          </div>
          :
          <form onSubmit={handleFormSubmit}  className="row text-center">
            <div className="col-md-4 col-sm-12 mb-5">
              <label id="upload" className={`${imageUpload ? 'uploaded' : null}`} >
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
                  <input required type="file" name="upload" id="uploadImage"  onChange={(e) => handleChange(e)} />
                  <p>Upload Image</p>
                  <span>Max 8 Mb.</span>
                </div>
              </label>
            </div>
            <div className="col-md-8 col-sm-12 mb-5 text-left px-5">
              <h3>Item Info</h3>
              <div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputArtName">Artwork Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputArtName"
                      placeholder="cats"
                      name="artworkName"
                      onChange={(e) => handleChange(e)}
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
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="sna@gmail.com"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      required
                    />
                  </div>
                </div>

                <h3 className="mt-4">Description</h3>
                <div className="form-row">
                  <div className="form-group col-md-12">
                    <label htmlFor="ItemDescription">Item Description</label>
                    <textarea
                      className="form-control"
                      id="ItemDescription"
                      rows="2"
                      name="description"
                      onChange={(e) => handleChange(e)}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="form-row mb-4">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Rights Level</label>
                    <select id="inputState" className="form-control" defaultValue="Level1" name="rightsLevel" onChange={(e) => handleChange(e)} required>
                      <option value="Level1" selected>Level1</option>
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState">Rights Duration</label>
                    <select id="inputState" className="form-control" defaultValue="10 Years" name="rightsDurations" onChange={(e) => handleChange(e)} required>
                      <option value="10 Years" selected>10 Years</option>
                    </select>
                  </div>
                </div>
                <h3 className="mt-12 mb-1">Properties</h3>
                <p className="text-white mb-3 ">Textual traits that show up as rectangles</p>
                <div className="form-row mb-4 mt-4 mb-5">
                  <div className="properties-row">
                    {
                      nftData.properties.map((property, index) => {
                        return (
                          <div className="property" key={index}>
                              <p className="property_name">{property.name}</p>
                              <p className="property_value">{property.value}</p>
                          </div>
                        )
                      })
                    }
                    
                    <div className="property propertyAdd" onClick={() => setPopupStatus("properties")}>
                      <p>+</p>
                    </div>
                  </div>
                </div>
                <h3 className="mt-12 mb-1">Levels</h3>
                <p className="text-white mb-3 ">Numerical traits that show as a progress bar</p>
                <div className="levels mb-4 mt-4 mb-5">
                  
                  {
                    nftData.levels.map((level, index) => {
                      return(
                        <div className="level" key={index}>
                          <div className="py-2 levelHead d-flex align-items-center justify-content-between">
                            <h4>{level.name}</h4>
                            <p className="mb-0">
                              {level.value} of {level.max}
                            </p>
                          </div>
                          <progress className="d-block w-full" value="2" max="5" />
                        </div>
                      )
                    })
                  }
                  <div className="property propertyAdd" onClick={() => setPopupStatus("levels")}>
                      <p>+</p>
                  </div>
                </div>
                <h3 className="mt-12 mb-1">Stats</h3>
                <p className="text-white mb-3 ">Numerical traits that just show as numbers</p>
                <div className="stats mb-4 mt-4 mb-5">
                    {
                      nftData.stats.map((stat, index) => {
                        return(
                          <div className="stat" key={index}>
                            <h4 >Stat Name</h4>
                            <p className="mb-0">0 of 5</p>
                          </div>
                        )
                      })
                    }
                    <div className="property propertyAdd" onClick={() => setPopupStatus("stats")}>
                      <p>+</p>
                    </div>
                </div>

                <button type="submit" className="btn">
                  Create NFT
                </button>
              </div>
            </div>
          </form>
        }
        
      </div>
    </section>
  );
};

export default CreateSingleNft;
