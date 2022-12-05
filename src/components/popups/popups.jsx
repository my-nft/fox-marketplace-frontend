const EntryField = ({type}) => {
    return(
        <div className="entry-fields">
            <div className="entry-field">
                <label htmlFor="">Name</label>
                <input type="text" />
            </div>
            <div className="entry-field">
                {
                    type === "properties"
                    ? <div className="entry-field">
                        <label htmlFor="">Type</label>
                        <input type="text" />
                    </div>
                    :
                    <div className="grouped-fields">
                        <div className="entry-field">
                            <label htmlFor="">Type</label>
                            <input type="text" />
                        </div>
                        <div className="entry-field">
                            <label htmlFor="">Type</label>
                            <input type="text" />
                        </div>
                    </div>
                }
            </div>
        
        </div>
    )
}



const PopupContainerWrapper = ({
    popupType,
    popupCloseAction=()=>{}
}) => {
    
  
   
    
    return (
        
        <div className={`popup-container ${popupType ? 'popup-show' : null}`} >
            <div className="popup-background" onClick={() => popupCloseAction(false)} />
            <div className="popup-wrapper">
                <div className="popupHeader">
                    <div className="popup-header-text">
                        <h3>
                            {
                                popupType === "properties"
                                ? "Properties"
                                : null
                            }
                        </h3>
                        <p>
                            {
                                popupType === "properties"
                                ? "Textual traits that show up as rectangles"
                                : null
                            }
                        </p>
                    </div>
                    <p className="popup-close" onClick={() => popupCloseAction(false)} >X</p>
                </div>
                <EntryField type={popupType} />
            </div>
        </div>
        
    )
}


export default PopupContainerWrapper