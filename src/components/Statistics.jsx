import { useEffect, useState } from "react";
import { getStats } from "../api/utilsApi";
import { ReactComponent as StatsIcon } from "../assets/icons/stats.svg";

const PageStatistics = () => {
  const [stats, setStats] = useState({
    collections: 0,
    users: 0,
    nfts: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const init = async () => {
    setIsLoading(true);
    const response = await getStats();
    setStats(response.data);
    setIsLoading(false);
  };

  useEffect(() => {
    init();
  }, []);

  return (
    !isLoading && (
      <div className="pageStatistics">
        <div className="statsIcon">
          <StatsIcon />
        </div>
        <div className="statsText">
          <h4>Statistics</h4>
          <p>
            Collections: <span>{stats.collections}</span>
          </p>
          <p>
            NFTs: <span>{stats.nfts}</span>
          </p>
          <p>
            Users: <span>{stats.users}</span>
          </p>
        </div>
      </div>
    )
  );
};

export default PageStatistics;
