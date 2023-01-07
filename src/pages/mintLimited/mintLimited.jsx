import MintInfo from "../../components/mintLimited/mintInfo/mintInfo";
import MintSideBar from "../../components/mintLimited/mintSideBar/mintSideBar";

const MintLimited = () => {
  return (
    <div className="mintLimitedWrapper">
      <MintSideBar />
      <MintInfo />
    </div>
  );
};

export default MintLimited;
