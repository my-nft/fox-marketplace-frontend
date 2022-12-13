const CardBody = ({ title, price, priceDollar, bestOffer, children }) => {
  return (
    <div class="card-body">
      <div class="card-text">
        <h3>{title}</h3>
        {price ? (
          <p id="price">
            {price} <span id="priceDollar">${priceDollar}</span>
          </p>
        ) : null}

        {bestOffer ? (
          <>
            <h5>Best offer</h5>
            <p id="price">
              {bestOffer} <span id="priceDollar">${bestOffer}</span>
            </p>
          </>
        ) : null}
        {children}
      </div>
    </div>
  );
};

export default CardBody;
