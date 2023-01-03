import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner";
import { CreateNFTPopup } from "../../components/popups/popups";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoading, setIsLoading } from "../../redux/nftReducer";
import { MINT_NFT } from "../../saga/actions";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  useSignMessage,
  useAccount,
  useContract,
  useContractWrite,
  usePrepareContractWrite,
  useContractRead
} from "wagmi";


import { ERC20ContractAddress, ERC_CONTRACT_INITILIZER, foxMasterCollectionAddress, ZERO_ADDRESS } from "../../utils/blockchainInteractor";
import FOX_MASTER from "../../utils/contracts/FOX_MASTER.json";
import ERC20 from '../../utils/contracts/ERC20.json';
import { addNftToIpfs } from "../../api/nftApi";
import { signinUser } from "../../api/AuthUserApi";
import Web3 from "web3";
import { importCollectionToken } from "../../api/collectionApi";


const CreateSingleNft = () => {
  const [imageUpload, setImageUpload] = useState(null);
  
  const [imageData, setImageData] = useState(null);
  
  
  const isLoading = useSelector(selectIsLoading);
  const [popupStatus, setPopupStatus] = useState(null);
  const dispatch = useDispatch();
  
  const navigate = useNavigate();
  
  const [searchParams, setSearchParams] = useSearchParams();
  let collectionAddress = searchParams.get("collectionAddress") || foxMasterCollectionAddress;

  const { address, connector, isConnected } = useAccount();

  const [token, setToken] = useState();

  const { signMessageAsync } = useSignMessage({
    message: `I would like to Sign in for user with address: ${address}`,
  });

  const {refetch : mintFee} = useContractRead({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName : 'mintFee'
    }
  );

  const [idIpfs, setIdIpfs] = useState('');

  const { config : configMint, status, error} = usePrepareContractWrite({
    address: collectionAddress,
    abi: FOX_MASTER,
    functionName: 'mint',
    args: [address, idIpfs],
    enabled: Boolean(idIpfs),
  });

  console.log(status, error, collectionAddress);

  const { writeAsync : JJJJJJ } = useContractWrite(configMint);


  const runMint = async () => {
    
    const mintTsx = await JJJJJJ();

    const receipt = await mintTsx.wait();

    const tokenID = Web3.utils.hexToNumber(receipt.logs[0].topics[3].toString());

    await importCollectionToken(collectionAddress, tokenID, token)

    navigate(`/collection/${collectionAddress}/${tokenID}`);
  }

  useEffect(() => {
    if(idIpfs && status === 'success') {
      runMint();
    }
  }, [idIpfs, status])


  //#Approuve
  const [fees, setFees] = useState();

  const { config } = usePrepareContractWrite({
    address: ERC20ContractAddress,
    abi: ERC20,
    functionName: 'approve',
    args: [collectionAddress, fees],
    enabled: Boolean(fees)
  });
  const { writeAsync : approve } = useContractWrite(config);

  const runApprove = async () => {
    await approve();

    const { upload, ...rest } = nftData;

    const response = await addNftToIpfs({
      collectionAddress: collectionAddress,
      image: imageData,
      token,
      nft: rest
    });


    console.log("IPFS URI", response.data);

    setIdIpfs(response.data);
  }

  useEffect(() => {
    if(fees) {
      runApprove();
    }
  }, [fees]);


  //# calculate fees

  const continueMinting = async () => {
    const mintFeesRet = await mintFee();
    setFees(mintFeesRet.data);
  }

  useEffect(() => {
    if(token){
      continueMinting();
    }
  }, [token])



  const runMintNft = async () =>  {
    
    const signature = await signMessageAsync();

    const responseSigning = await signinUser({
      address,
      signature
    })

    const token = responseSigning.data.token;

    setToken(token);
  };


  useEffect(() => {
    dispatch(setIsLoading(false));
  }, []);

  const [nftData, setNftData] = useState({
    name: "",
    description: "",
    artistName: "",
    upload: null,
    attributes: [],
    levels: [],
    stats: [],
  });

  const handleChange = (e) => {
    if (e.target.name === "upload") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(URL.createObjectURL(e.target.files[0]));
        setImageData(e.target.files[0]);
        setNftData({
          ...nftData,
          upload: e.target.files[0],
        });
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setNftData({
        ...nftData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleAddToArray = (arrayTarget, objectToInsert) => {
    // check if object is already in array
    const objectExists = nftData[arrayTarget].find(
      (item) => item.name === objectToInsert.name
    );
    if (objectExists) {
      toast.error("Object already exists");
    }
    // if not, add object to array
    else {
      setNftData({
        ...nftData,
        [arrayTarget]: [...nftData[arrayTarget], objectToInsert],
      });
    }
  };

  const handleRemoveFromArray = (arrayTarget, objectToRemove) => {
    const newArray = nftData[arrayTarget].filter(
      (item) => item.name !== objectToRemove.name
    );
    setNftData({
      ...nftData,
      [arrayTarget]: newArray,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await runMintNft();

    /*
    if (nftData.upload === null) {
      toast.error("Please upload an image");
      return;
    }

    const { upload, ...rest } = nftData;

    dispatch({
      type: MINT_NFT,
      payload: {
        ...rest,
        collectionAddress,
        image: imageData,
      },
      onError: (err) => {
        console.log(err);
        toast.error("Error creating NFT");
        setNftData({
          name: "",
          description: "",
          artistName: "",
          upload: null,
          attributes: [],
          //levels: [],
          //stats: [],
        });
        setImageData(null);
        setImageUpload(null);
      },
      onSuccess: (collectionAddress, tokenID) => {
        console.log("Success");
        toast.success("NFT created successfully");
        navigate(`/collection/${collectionAddress}/${tokenID}`);
      },
    });
    */
  };

  return (
    <section id="createCollection" className="my-2">
      <CreateNFTPopup
        values={nftData}
        updateAction={handleChange}
        popupType={popupStatus}
        popupTitle={popupStatus}
        popupCloseAction={setPopupStatus}
        handleAddToArray={handleAddToArray}
        handleRemoveFromArray={handleRemoveFromArray}
        nftData={nftData}
      />
      <img src="/assets/images/Background.jpg" id="layer" alt="" />
      <h3 className="text-center mb-5">Mint Your NFT</h3>
      <div className="container pt-3 ">
        {isLoading ? (
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
                    onChange={(e) => handleChange(e)}
                  />
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
                      name="name"
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
                <h3 className="mt-12 mb-1">Attributes</h3>
                <p className="text-white mb-3 ">
                  Textual traits that show up as rectangles
                </p>
                <div className="form-row mb-4 mt-4 mb-5">
                  <div className="properties-row">
                    {nftData.attributes.map((property, index) => {
                      return (
                        <div className="property" key={index}>
                          <p className="property_name">{property.trait_type}</p>
                          <p className="property_value">{property.value}</p>
                        </div>
                      );
                    })}

                    <div
                      className="property propertyAdd"
                      onClick={() => setPopupStatus("attributes")}
                    >
                      <p>+</p>
                    </div>
                  </div>
                </div>
                {/* <h3 className="mt-12 mb-1">Levels</h3>
                <p className="text-white mb-3 ">
                  Numerical traits that show as a progress bar
                </p>
                <div className="levels mb-4 mt-4 mb-5">
                  {nftData.levels.map((level, index) => {
                    return (
                      <div className="level" key={index}>
                        <div className="py-2 levelHead d-flex align-items-center justify-content-between">
                          <h4>{level.name}</h4>
                          <p className="mb-0">
                            {level.valueMin} of {level.valueMax}
                          </p>
                        </div>
                        <progress
                          className="d-block w-full"
                          value={level.valueMin}
                          max={level.valueMax}
                        />
                      </div>
                    );
                  })}
                  <div
                    className="property propertyAdd"
                    onClick={() => setPopupStatus("levels")}
                  >
                    <p>+</p>
                  </div>
                </div> */}
                {/* <h3 className="mt-12 mb-1">Stats</h3>
                <p className="text-white mb-3 ">
                  Numerical traits that just show as numbers
                </p>
                <div className="stats mb-4 mt-4 mb-5">
                  {nftData.stats.map((stat, index) => {
                    return (
                      <div className="stat" key={index}>
                        <h4>{stat.name}</h4>
                        <p className="mb-0">
                          {stat.valueMin} of {stat.valueMax}
                        </p>
                      </div>
                    );
                  })}
                  <div
                    className="property propertyAdd"
                    onClick={() => setPopupStatus("stats")}
                  >
                    <p>+</p>
                  </div>
                </div> */}

                <button type="submit" className="btn">
                  Create NFT
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};

export default CreateSingleNft;
