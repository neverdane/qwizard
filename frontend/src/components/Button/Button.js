import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import MuiButton from "@material-ui/core/es/Button/Button";
import theme from "../../theme/index";
import styled from "styled-components";

const Button = styled(
  withStyles({
    root: {
      backgroundColor: "transparent",
      borderRadius: "0",
      borderWidth: "0.1em",
      borderStyle: "solid",
      fontFamily: `${theme.text.fonts.secondary}`,
      fontSize: "1rem",
      minWidth: 0
    }
  })(({ color, invertedColor = theme.colors.white, ...otherProps }) => (
    <MuiButton disableFocusRipple={true} {...otherProps} />
  ))
)`
  && {
    color: ${props => props.color || props.theme.colors.primary};
    font-weight: 400;

    &&:focus,
    &&:hover {
      background-color: ${props => props.color || props.theme.colors.primary};
      color: ${props => props.invertedColor};
      border-color: ${props => props.color || props.theme.colors.primary};
    }
  }
`;

Button.defaultProps = {
  invertedColor: theme.colors.white
};

export default Button;
