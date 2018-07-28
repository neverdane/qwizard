import withStyles from "@material-ui/core/es/styles/withStyles";
import MuiInput from "@material-ui/core/es/Input/Input";
import theme from "../../theme/index";
import MuiInputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";

export const InputAdornment = withStyles({
  root: {
    marginRight: "1rem"
  }
})(MuiInputAdornment);

const Input = withStyles({
  root: {
    background: theme.colors.transparentDark,
    color: theme.colors.dark,
    fontSize: "1.3em",
    padding: "0.3em 1em",
    lineHeight: "normal"
  },
  input: {
    padding: "0 0 0.1em",
    "&::-webkit-input-placeholder": {
      color: theme.colors.dark,
      opacity: 0.1
    }
  },
  underline: {
    "&:after": {
      background: "transparent"
    },
    "&:before": {
      display: "none"
    }
  }
})(MuiInput);

export default Input;

export const InversedInput = withStyles({
  root: {
    background: theme.colors.transparentDeepBlack,
    color: theme.colors.white
  },
  input: {
    padding: "0 0 0.1em",
    "&::-webkit-input-placeholder": {
      color: theme.colors.white
    }
  }
})(Input);
