import { useEffect, useState } from "react";
import uploadIcon from "../../assets/images/create_icon_3.png";
import { Buffer } from "buffer";
import { toast } from "react-toastify";

const SettingsImages = ({
  banner,
  image,
  setCollectionImage,
  setCollectionBanner,
}) => {
  console.log(image);

  /*
  useEffect(() => {

    if(image){
      if(image.data) {
        const base64 = Buffer.from(image.data.data).toString('base64')
        setImageUrl(`data:image/png;base64,${base64}`);
      }
      else if(image.type){
        let url = URL.createObjectURL(image);
        console.log(url)
        setImageUrl(url);
      }
      else if(typeof image === "string"){
        setImageUrl(image);
      }
    }

    if(banner){
      if(banner.data) {
        const base64 = Buffer.from(banner.data.data).toString('base64')
        setBannerUrl(`data:image/png;base64,${base64}`);
      }
      else if(banner.type){
        let url = URL.createObjectURL(banner);
        setBannerUrl(url);
      }
      else if(typeof banner === "string"){
        setBannerUrl(banner);
      }
    }

  }, [image, banner])
*/

  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files[0].size > 15000000) {
        toast.error("File size too large");
        return;
      }

      if (type === "profile") {
        setCollectionImage(e.target.files[0]);
      } else {
        setCollectionBanner(e.target.files[0]);
      }
    }
  };

  return (
    <form className="collectionSettingsImages">
      <div className="settingsGroup imageChange profileChange">
        <h2>Profile Image</h2>
        <label htmlFor="profileChange">
          <img src={image} alt="profile" />
          <div className="changeOverlay">
            <img src={uploadIcon} />
            <p>Change image</p>
          </div>
          <input
            type="file"
            name="profileChange"
            id="profileChange"
            onChange={(e) => handleImageChange(e, "profile")}
          />
        </label>
      </div>
      <div className="settingsGroup imageChange bannerChange">
        <h2>Banner Image</h2>
        <label htmlFor="bannerChange">
          <img src={banner ? banner : null} alt="banner" />
          <div className="changeOverlay">
            <img src={uploadIcon} />
            <p>Change image</p>
          </div>
          <input
            type="file"
            name="bannerChange"
            id="bannerChange"
            onChange={(e) => handleImageChange(e, "banner")}
          />
        </label>
      </div>
    </form>
  );
};

export default SettingsImages;
