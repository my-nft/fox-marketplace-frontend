import { withFormik } from "formik";
import * as Yup from "yup";
import { UPDATE_PROFILE } from "../../saga/actions";
import Profile from "./index";
import { connect } from "react-redux";

const EMAIL_REGEX = "^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,3}$";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    email: Yup.string()
      .trim()
      .matches(EMAIL_REGEX, "Please add a correct email address")
      .nullable(),
  }),

  mapPropsToValues: (props) => {
    return {
      ...props?.connectedUser,
    };
  },

  handleSubmit: (values, { props, setSubmitting }) => {
    // setSubmitting(true);
    props.dispatch({
      type: UPDATE_PROFILE,
      payload: values,
      onSuccess: () => {
        setSubmitting(false);
      },
      onError: () => {
        setSubmitting(false);
      },
    });
  },
  displayName: "SITUATION_PERSONNELLE_FORM",
});

export default connect()(formikEnhancer(Profile));
