import CreationIcon from "../../components/CreationIcon";

const ImportCollection = () => {
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
        <div className="row text-center">
          <div className="col">
            <form>
              <div className="form-row text-center">
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="inputArtName"
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
      </div>
    </section>
  );
};

export default ImportCollection;
