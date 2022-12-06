import CreationIcon from "../../components/CreationIcon";
import { useState } from 'react';
import Spinner from './../../components/Spinner';
import { useSelector } from "react-redux";
import { selectConnectedWallet } from "../../redux/userReducer";

const ImportCollection = () => {

  const [loading, setLoading] = useState(false);
  const ownerAddress = useSelector(selectConnectedWallet);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    if(data){
      let dataValid = true;
      Object.keys(data).forEach((key) => {
        if(data[key] === ""){
          dataValid = false;
        }
      })
      if(dataValid){
        // import collection
        //const importCollectionResponse = await importCollectionFromAddress(data.address, ownerAddress,"COLLECTION_NAME","COLLECTION_IMAGE");

      }
    }
    

  }



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
        {
          loading
          ? 
          <div className='processing'>
            <Spinner />
            <h2>Processing</h2>
          </div>
          :
          <div className="row text-center">
            <div className="col">
              <form onSubmit={handleFormSubmit}>
                <div className="form-row text-center">
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      id="inputArtName"
                      name='address'
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
        }
        
      </div>
    </section>
  );
};

export default ImportCollection;
