import { useEffect, useState } from "react";
import uploadIcon from "../../assets/images/create_icon_3.png";
import {Buffer} from 'buffer';

const SettingsImages = ({ banner, image, collectionDetails, setCollectionDetails }) => {

  const [imageUrl, setImageUrl] = useState();
  const [bannerUrl, setBannerUrl] = useState();

  useEffect(() => {

    if(image && image.data) {
      const base64 = Buffer.from(image.data.data).toString('base64')
      setImageUrl(base64);
    }

    console.log(banner);
    
    if(banner && banner.data) {
      const base64 = Buffer.from(banner.data.data).toString('base64')
      setBannerUrl(base64);
    }
    

  }, [image, banner])


  const handleImageChange = (e, type) => {
    if (e.target.files && e.target.files[0]) {

      //convert image to arrayBuffer
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = Buffer.from(reader.result)
        console.log(arrayBuffer)
        const fileObj = {
          contentType: e.target.files[0].type,
          data: {
            data: arrayBuffer,
            type: "Buffer"
          }
        }

        if (type === "profile") {
          setCollectionDetails({
            ...collectionDetails,
            image: fileObj,
          });
        } else {
          setCollectionDetails({
            ...collectionDetails,
            banner: fileObj,
          });
        }
      }
      reader.readAsArrayBuffer(e.target.files[0]);

    }
  };


  return (
    <form className="collectionSettingsImages">
      <div className="settingsGroup imageChange profileChange">
        <h2>Profile Image</h2>
        <label htmlFor="profileChange">
          <img
            src={
              image
                ? `data:image/png;base64,${imageUrl}`
                : uploadIcon
            }
            alt="profile"
          />
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
          <img
            src={
              banner
                ? `data:image/png;base64,${bannerUrl}`
                : uploadIcon
            }
            alt="banner"
          />
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
