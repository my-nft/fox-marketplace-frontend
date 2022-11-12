const PopularCollectionItem = (props) => {
    return (
        <div className="popularItems col-sm-6 col-md-3">
          <img src="/assets/images/Popluar_1.png" alt=""/>
          <div className="nameItem">
            <span className="name">FACES</span>
            <span>
              193{" "}
              <img
                src="/assets/images/Iconmonstr-favorite-2-16.png"
                style={{"width": "16px"}}
                alt=""
              />
            </span>
          </div>
          <p>$118 Lowest ask</p>
          <p>3LAU</p>
        </div>
    );
};

export default PopularCollectionItem;