import React from "react";
import { withFormik } from "formik";
import CardEditor from "../../components/Card/CardEditor";

export default withFormik({
  mapPropsToValues: props => ({
    question: props.question || "",
    response: props.response || "",
    labels:
      (props.labels &&
        props.labels.map(label => ({
          label: label.name,
          value: label.name
        }))) ||
      []
  }),
  handleSubmit: (values, { props }) => {
    props.handleSubmit(values);
  }
})(({ values, handleChange, setFieldValue, ...props }) => (
  <form onSubmit={props.handleSubmit} autoComplete={"off"}>
    <CardEditor
      onQuestionChange={handleChange}
      onResponseChange={handleChange}
      onLabelsChange={value => setFieldValue("labels", value)}
      onLabelCreate={name => {
        props.handleLabelCreate(name);
        setFieldValue("labels", [
          ...values.labels,
          { label: name, value: name }
        ]);
      }}
      {...props}
      {...values}
    />
  </form>
));
