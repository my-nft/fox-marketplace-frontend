import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container-fluid mt-4 pt-5">
      <div className="d-flex flex-column justify-content-center align-items-center pt-3">
        <div className="col-12 d-flex justify-content-center">
          <Link to="/">
            <img src="/assets/images/Logo_bottom.png" />{" "}
          </Link>
        </div>
        <div className="col-md-8 col-sm-12 navBottom align-items-center d-flex justify-content-center">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link href="/drops">Drops</Link>
            </li>
            <li>
              <Link href="/marketplace">Marketplace</Link>
            </li>
            <li>
              <Link href="/ranking">Ranking</Link>
            </li>
          </ul>
        </div>
        <span className="mt-5"> Copyright 2022 by FoxChange </span>
      </div>
    </footer>
  );
};

export default Footer;
