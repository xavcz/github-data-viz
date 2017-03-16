import { injectGlobal, css } from 'styled-components';

/*
 * Global styles, inspired by Sacha Greif
 */

export const fonts = {
  extralarge: '4em',
  large: '1.7em',
  medium: '1.3em',
  small: '1em',
  extrasmall: '0.85em',
};

export const colors = {
  black: '#282b2b',
  white: '#ffffff',
  grey: '#bbc0c6',
  transparentGrey: (a = 0.4) => `rgba(36,37,38,${a})`,
  gradientTop: '#2b3658',
  gradientBottom: '#523e5b',
};

export const spacing = {
  quarter: '10px',
  half: '20px',
  single: '40px',
  double: '80px',
};

export const small = (...args) => css`
  @media screen and (max-width: 600px) {
    ${ css(...args) }
  }
`;

export const medium = (...args) => css`
  @media screen and (min-width: 601px) and (max-width: 1200px) {
    ${ css(...args) }
  }
`;

export const large = (...args) => css`
  @media screen and (min-width: 1201px) {
    ${ css(...args) }
  }
`;

export const cubic = {
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)', 
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
};

// CSS Resets
// eslint-disable-next-line
injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Space+Mono:400,700');
  
  *, *:before, *:after {
    box-sizing: border-box;
    font-family: 'Space Mono', monospace;
  }
  
  body {
    margin: 0;
    padding: 0;
    min-height: 100vh;
    /* optics loading background 😗🎶 */
    background-image: linear-gradient(175deg, ${colors.gradientTop} 0%, ${colors.gradientBottom} 100%); 
    color: ${colors.white};
  }
`;
