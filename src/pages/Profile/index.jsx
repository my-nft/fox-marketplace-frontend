import uploadIcon from "../../assets/images/create_icon_3.png";
import { useEffect, useState } from "react";
import Spinner from "../../components/Spinner";
import { Form } from "formik";
import { useSelector } from "react-redux";
import { selectCurrentWallet } from "../../redux/userReducer";
import Address from "../../components/Address";
import { toast } from "react-toastify";

const Profile = ({ values, handleChange, isSubmitting, handleSubmit }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [bannerUrl, setBannerUrl] = useState(null);

  useEffect(() => {
    setImageUrl(values.image);
    setBannerUrl(values.banner);
  }, [values.image, values.banner]);

  const walletAddress = useSelector(selectCurrentWallet);

  const handleImageUpload = (e) => {
    if (e.target.files[0].size > 15000000) {
      toast.error("File size too large");
      return;
    }
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setImageUrl(url);
    handleChange({ target: { name: "imageFile", value: file } });
  };

  const handleBannerUpload = (e) => {
    if (e.target.files[0].size > 15000000) {
      toast.error("File size too large");
      return;
    }
    const file = e.target.files[0];
    let url = URL.createObjectURL(file);
    setBannerUrl(url);
    handleChange({ target: { name: "bannerFile", value: file } });
  };

  useEffect(() => {
    handleChange({ target: { name: "address", value: walletAddress } });
  }, []);

  return (
    <>
      {isSubmitting ? (
        <Spinner />
      ) : (
        <Form className="container-fluid" id="profile">
          <div className="row">
            <div className="col-md-2 navigation">
              <h5>SETTINGS</h5>
              <ul>
                <li>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-person-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>{" "}
                  <span>Profile</span>
                </li>
              </ul>
            </div>
            <div className="col-md-10 p-5 col-sm-12">
              <h2>Profile Details</h2>
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <form>
                    <div className="form-row">
                      <div className="form-group col-md-12">
                        <label htmlFor="username">Username</label>
                        <input
                          type="text"
                          className="form-control"
                          id="username"
                          name="username"
                          placeholder="Enter user name"
                          onChange={handleChange}
                          value={values.username}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                          maxLength="140"
                          placeholder="Tell the world your story!"
                          id="bio"
                          name="bio"
                          onChange={handleChange}
                          className="form-control"
                          value={values.bio}
                        ></textarea>
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="emailAddress">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          id="emailAddress"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          value={values.email}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputConfirmEmail">
                          Confirm Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="inputConfirmEmail"
                          name="emailConfirm"
                          placeholder="Confirm email"
                          // onChange={handleChange}
                        />
                      </div>
                      <div id="socialConnection">
                        <h3>Social Connections</h3>
                        <h6>
                          Help collectors verify your account by connecting
                          social accounts
                        </h6>
                        <p>*** Coming Soon ***</p>
                        {/* <ul>
                              <li>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-twitter"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                                  </svg>{" "}
                                  Twitter
                                </span>
                                <button>Connect</button>
                              </li>
                              <li>
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-instagram"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" />
                                  </svg>{" "}
                                  Instagram
                                </span>
                                <button>Connect</button>
                              </li>
                            </ul> */}
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="linkWeb">Links</label>
                        <input
                          type="text"
                          className="form-control"
                          name="linkWeb"
                          id="linkWeb"
                          placeholder="yoursite.io"
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group col-md-12">
                        <label htmlFor="inputArtName">Wallet Address</label>

                        <Address
                          address={walletAddress}
                          className="profileWallet"
                        >
                          {walletAddress}
                        </Address>
                      </div>
                      <button
                        type="submit"
                        className="confirmButton"
                        onClick={handleSubmit}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className="col-md-6 col-sm-12 text-center imageChange"
                  id="profileImg"
                >
                  <div className="imageUpload">
                    <h4>Profile Image</h4>
                    <label htmlFor="image" className="profileImageUpload">
                      <img src={imageUrl} alt="" />
                      <div className="changeOverlay">
                        <img src={uploadIcon} />
                        <p>Change image</p>
                      </div>
                      <input
                        type="file"
                        name="image"
                        id="image"
                        onChange={handleImageUpload}
                      />
                    </label>
                  </div>

                  <div className="imageUpload">
                    <h4 className="mt-5">Profile Banner</h4>
                    <label htmlFor="banner" className="bannerImageUpload">
                      <img src={bannerUrl} alt="" />
                      <div className="changeOverlay">
                        <img src={uploadIcon} />
                        <p>Change image</p>
                      </div>
                      <input
                        type="file"
                        name="banner"
                        id="banner"
                        onChange={handleBannerUpload}
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </>
  );
};

export default Profile;
