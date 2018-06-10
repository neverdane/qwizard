import React from "react";
import Card from "../../components/Card/Card";
import PropTypes from "prop-types";
import CardEditor from "./CardEditor";
import CardSummary from "../../components/Card/CardSummary";

export default class extends React.Component {
  static propTypes = {
    initialMode: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {
      mode: this.props.initialMode || "summary"
    };
  }

  handleZipClick = () => {
    this.setState({
      ...this.state,
      mode: this.state.mode === "summary" ? "edition" : "summary"
    });
  };

  handleSubmit = data => {
    console.log(data);
    this.setState({ ...this.state, mode: "summary" });
  };

  render() {
    const { mode } = this.state;

    return (
      <Card
        isFocused={mode !== "summary"}
        isZipDisplayed={mode !== "creation"}
        isZipOpened={mode === "edition"}
        onZipClick={this.handleZipClick}
      >
        {["edition", "creation"].includes(mode) && (
          <CardEditor
            mode={mode}
            handleSubmit={this.handleSubmit}
            {...this.props}
          />
        )}
        {mode === "summary" && <CardSummary {...this.props} />}
      </Card>
    );
  }
}
