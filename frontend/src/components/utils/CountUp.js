import React from "react";
import PropTypes from "prop-types";
import CountUp from "react-countup";

export default class extends React.Component {
  static propTypes = {
    value: PropTypes.number
  };

  state = {
    previousValue: 0,
    initialDisplay: true,
    currentValue: 0
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.state, initialDisplay: false });
    }, 0);
  }

  render() {
    const { value = 0, render, ...otherProps } = this.props;
    const currentValue = this.state.initialDisplay ? 0 : value;

    return (
      <React.Fragment>
        <CountUp
          style={{ display: "none" }}
          start={this.state.previousValue}
          end={currentValue}
          duration={1}
          useEasing={false}
          onComplete={() => {
            this.setState({
              ...this.state,
              previousValue: currentValue
            });
          }}
          formattingFn={value => {
            this.setState({ ...this.state, currentValue: value });

            return value;
          }}
          {...otherProps}
        />
        {render({ value: this.state.currentValue, targetValue: currentValue })}
      </React.Fragment>
    );
  }
}
