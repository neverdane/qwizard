import React from "react";
import { withFormik } from "formik";
import { generateQuiz, submitQuestionResponse } from "../../actions";
import { connect } from "react-redux";
import Question from "../../components/Question/Question";

export default connect(null, {
  generateQuiz,
  submitQuestionResponse
})(
  withFormik({
    mapPropsToValues: () => ({
      response: ""
    }),
    handleSubmit: (values, { props }) => {
      props.submitQuestionResponse(
        props.iri,
        values.response,
        props.number - 1
      );
    }
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
