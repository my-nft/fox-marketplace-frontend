import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Buffer } from "buffer";

import placeholderImage from "../assets/images/Popluar.jpg";

const ExplorePopularCollectionItem = ({ itemData }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState();

  const handleShowCollection = () => {
    navigate(`/collection/${itemData.collectionAddress}`);
  };

  useEffect(() => {
    if (itemData && itemData.image) {
      const image = itemData.image;
      if (image.data) {
        const base64 = Buffer.from(image.data.data).toString("base64");
        setImageUrl(`data:image/png;base64,${base64}`);
      } else if (image.type) {
        let url = URL.createObjectURL(image);
        console.log(url);
        setImageUrl(url);
      } else if (typeof image === "string") {
        setImageUrl(image);
      }
    }

    if (itemData && itemData.banner) {
      const banner = itemData.banner;
      console.log(banner);
      if (banner.data) {
        const base64 = Buffer.from(banner.data.data).toString("base64");
        setBannerUrl(`data:image/png;base64,${base64}`);
      } else if (banner.type) {
        let url = URL.createObjectURL(banner);
        setBannerUrl(url);
      } else if (typeof banner === "string") {
        setBannerUrl(banner);
      } else {
        setBannerUrl(placeholderImage);
      }
    } else {
      setBannerUrl(placeholderImage);
    }
  }, []);

  return (
    <div className="listMostPopular" onClick={handleShowCollection}>
      <div className="wrapContent">
        <div className="wrapImg">
          <img src={bannerUrl} className="bigImage" alt="" />
          <img src={imageUrl} className="collectionImgLogo" alt="" />
        </div>
        <div className="wrapText">
          <p>
            <label>{itemData.name ? itemData.name : "-"}</label>
            <span>{itemData.tags ? itemData.tags : "-"}</span>
          </p>
          <p className="text-right">
            <label>Total Volume</label>
            <span>
              <b>f(x)</b> {itemData.totalVolume}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExplorePopularCollectionItem;
