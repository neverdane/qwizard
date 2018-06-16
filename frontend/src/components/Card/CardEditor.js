import React from "react";
import Input, { InputAdornment } from "../Form/Input";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import {
  faQuestionCircle,
  faCheckCircle,
  faTags
} from "@fortawesome/fontawesome-pro-light/index";
import theme from "../../theme/index";
import Autocomplete from "../Form/Autocomplete";
import Button from "../Button/Button";
import { AnimatedRow as Row } from "./Card";
import { Trail } from "react-spring";

class CardEditor extends React.Component {
  static defaultProps = {
    mode: "creation",
    labels: [],
    selectableLabels: [],
    handleSubmit: e => {}
  };

  input = null;

  componentDidMount() {
    setTimeout(() => this.input.focus(), 0);
  }

  render() {
    const {
      mode,
      selectableLabels,
      handleSubmit,
      onQuestionChange,
      onResponseChange,
      onLabelsChange,
      question,
      response,
      labels
    } = this.props;

    const rows = [
      <Input
        name="question"
        onChange={onQuestionChange}
        style={{ flexGrow: 1 }}
        value={question}
        autoFocus={true}
        inputRef={input => (this.input = input)}
        startAdornment={
          <InputAdornment position="start">
            <FontAwesomeIcon
              icon={faQuestionCircle}
              color={theme.colors.primary}
              size="xs"
            />
          </InputAdornment>
        }
        placeholder="Question"
      />,
      <Input
        name="response"
        onChange={onResponseChange}
        style={{ flexGrow: 1 }}
        value={response}
        startAdornment={
          <InputAdornment position="start">
            <FontAwesomeIcon
              icon={faCheckCircle}
              color={theme.colors.primary}
              size="xs"
            />
          </InputAdornment>
        }
        placeholder="Answer"
      />,
      <React.Fragment>
        <Autocomplete
          name="labels"
          onChange={onLabelsChange}
          style={{ flexGrow: 1, marginRight: "1.3rem" }}
          value={labels}
          formatCreateLabel={value => `Add label "${value}"`}
          startAdornment={
            <InputAdornment position="start">
              <FontAwesomeIcon
                icon={faTags}
                color={theme.colors.primary}
                size="xs"
                style={{ width: "1em" }}
              />
            </InputAdornment>
          }
          placeholder="Labels"
          options={selectableLabels.map(label => ({
            label: label.name,
            value: label.name
          }))}
        />

        <Button style={{ alignSelf: "stretch" }} onClick={handleSubmit}>
          {mode === "creation" ? "Add Question" : "Save Changes"}
        </Button>

        {mode === "edition" && (
          <Button
            style={{ alignSelf: "stretch", marginLeft: "1.3rem" }}
            color={theme.colors.red}
          >
            Delete
          </Button>
        )}
      </React.Fragment>
    ];

    return (
      <Trail
        native
        from={{ opacity: 0, x: 5 }}
        to={{ opacity: 1, x: 0 }}
        keys={[0, 1, 2]}
        config={{ tension: 120, friction: 30 }}
      >
        {rows.map((row, index) => ({ x, opacity }) => {
          return (
            <Row
              key={index}
              style={{
                opacity,
                transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
              }}
            >
              {row}
            </Row>
          );
        })}
      </Trail>
    );
  }
}

export default CardEditor;
