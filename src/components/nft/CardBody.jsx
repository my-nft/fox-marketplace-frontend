const CardBody = ({title, price, priceDollar, children}) => {
  return (
    <div class="card-body">
      <div class="card-text">
        <h5>{title}</h5>
        <p id="price">
          {price} <span id="priceDollar">${priceDollar}</span>
        </p>
        {children}
      </div>
    </div>
  );
};

export default CardBody;
