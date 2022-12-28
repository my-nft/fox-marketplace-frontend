import { ReactComponent as StatsIcon } from "../assets/icons/stats.svg";

const PageStatistics = () => {
  return (
    <div className="pageStatistics">
      <div className="statsIcon">
        <StatsIcon />
      </div>
      <div className="statsText">
        <h4>Statistics</h4>
        <p>
          Collections: <span>0</span>
        </p>
        <p>
          NFTs: <span>0</span>
        </p>
        <p>
          Users: <span>0</span>
        </p>
      </div>
    </div>
  );
};

export default PageStatistics;
