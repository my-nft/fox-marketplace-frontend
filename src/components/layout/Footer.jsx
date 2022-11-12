import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="container-fluid">
      <div className="row">
        <div className="col-md-4 col-sm-12">
          <img src="/assets/images/Logo_bottom.png" />{" "}
          <span className="pl-5"> Copyright 2022 by FoxChange </span>
        </div>
        <div className="col-md-8 col-sm-12 navBottom">
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
      </div>
    </footer>
  );
};

export default Footer;
