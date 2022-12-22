import { withFormik } from "formik";
import * as Yup from "yup";
import { UPDATE_PROFILE } from "../../saga/actions";
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
  isReinitializable: true,
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

  handleSubmit: (values, { props, setSubmitting }) => {
    // setSubmitting(true);
    props.dispatch({
      type: UPDATE_PROFILE,
      payload: values,
      onSuccess: (() => {
        setSubmitting(false)
      }),
      onError: () => {
        setSubmitting(false)
      }
    })
    
    
  },
  displayName: "SITUATION_PERSONNELLE_FORM",
});

export default formikEnhancer(Profile);
