import { withFormik } from "formik";
import * as Yup from "yup";
import { getCurrentWalletConnected } from "../../utils/blockchainInteractor";
import Profile from './index';

const EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$";

const walletAddress = getCurrentWalletConnected()

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .trim()
      .matches(EMAIL_REGEX, "Please add a correct email address")
      .nullable(),
  }),
  mapPropsToValues: (props) => {

    return {
      // ...props?.connectedUser,
      username: "",
      bio: "",
      email: "",
      linkWebsite: "",
      address: walletAddress,
      image: false,
      banner: false
    };
  },

  handleSubmit: (values, { setSubmitting }) => {
    setSubmitting(true);
  },
  displayName: "SITUATION_PERSONNELLE_FORM",
});

export default formikEnhancer(Profile);
