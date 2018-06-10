const theme = {
  colors: {
    black: '#222222',
    dark: '#333333',
    blue: '#8BC9CF',
    transparentDark: 'rgba(0, 0, 0, 0.2)',
    transparentWhite: 'rgba(255, 255, 255, 0.2)',
    red: '#E68B52',
  },
  text: {
    fonts: {
      serif: '"Playfair Display", serif',
      sansSerif: 'Oswald, sans-serif',
    },
  }
};

theme.colors.primary = theme.colors.blue;
theme.text.fonts.primary = theme.text.fonts.serif;
theme.text.fonts.secondary = theme.text.fonts.sansSerif;

export default theme;
