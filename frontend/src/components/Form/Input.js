import withStyles from "@material-ui/core/es/styles/withStyles";
import Input from "@material-ui/core/es/Input/Input";
import theme from "../../theme/index";
import MuiInputAdornment from "@material-ui/core/es/InputAdornment/InputAdornment";

export const InputAdornment = withStyles({
  root: {
    marginRight: '1rem'
  }
})(MuiInputAdornment);

export default withStyles({
  root: {
    background: theme.colors.transparentDark,
    color: theme.colors.dark,
    fontSize: '1.6rem',
    padding: '0.3rem 1rem',
    lineHeight: 'normal',
  },
  input: {
    padding: '0 0 0.3rem',
    '&::-webkit-input-placeholder': {
      color: theme.colors.dark,
      opacity: 0.1
    },
  },
  underline: {
    '&:after': {
      background: 'transparent'
    },
    '&:before': {
      display: 'none'
    }
  }
})(Input);
