import React from "react";
import { withFormik } from "formik";
import { generateQuiz } from "../../actions";
import { connect } from "react-redux";
import Question from "../../components/Question/Question";

export default connect(null, {
  generateQuiz
})(
  withFormik({
    mapPropsToValues: () => ({
      response: ""
    }),
    handleSubmit: (values, { props }) => {}
  })(({ handleSubmit, handleChange, values, ...props }) => {
    return (
      <Question
        handleResponseSubmission={handleSubmit}
        handleResponseChange={handleChange}
        response={values.response}
        {...props}
      />
    );
  })
);
