import React from "react";
import withStyles from "@material-ui/core/es/styles/withStyles";
import Button from "@material-ui/core/es/Button/Button";
import theme from "../../theme/index";
import styled from "styled-components";

export default styled(withStyles({
  root: {
    backgroundColor: 'transparent',
    borderRadius: '0',
    borderWidth: '0.05em',
    borderStyle: 'solid',
    fontFamily: `${theme.text.fonts.secondary}`,
    fontSize: '1rem',
    fontWeight: 300,
    minWidth: 0
  }
})(({color, ...otherProps}) => <Button disableFocusRipple={true} {...otherProps} />))`
  && {
    color: ${props => props.color || props.theme.colors.primary};

    &&:focus, &&:hover {
      background-color: ${props => props.color || props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
      border-color: ${props => props.color || props.theme.colors.primary};
    }
  }
`;
