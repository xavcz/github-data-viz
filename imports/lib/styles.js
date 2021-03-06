import React from 'react';
import styled, { injectGlobal, css, keyframes } from 'styled-components';

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
  issues: '#82ca9d',
  pullRequests: '#8884d8',
};

export const spacing = {
  quarter: '10px',
  half: '20px',
  single: '40px',
  double: '80px',
};

export const small = (...args) => css`
  @media screen and (max-width: 600px) {
    ${css(...args)}
  }
`;

export const medium = (...args) => css`
  @media screen and (min-width: 601px) and (max-width: 1200px) {
    ${css(...args)}
  }
`;

export const large = (...args) => css`
  @media screen and (min-width: 1201px) {
    ${css(...args)}
  }
`;

export const cubic = {
  easeOut: 'cubic-bezier(0, 0, 0.58, 1)',
  easeIn: 'cubic-bezier(0.42, 0, 1, 1)',
};

const shimmer = keyframes`
  from { background-position: -500px 0 }
  to { background-position: 500px 0 }
`;

// Title with animated text color (grey stripe walking the text in 1.5s)
export const shimmeringText = Component => {
  const ShimmeringComponent = styled(Component)`
    animation: 1.5s linear 2 forwards ${shimmer};
    background: linear-gradient(to right, ${colors.white} 10%, ${colors.grey} 18%, ${colors.white} 26%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-size: 1000px 2em;
  `;

  // eslint-disable-next-line
  return props => <ShimmeringComponent {...props} />;
};

export const shadowTransition = (
  {
    start: backgroundColorStart,
    end: backgroundColorEnd,
  }
) => Component => {
  const ShadowComponent = styled(Component)`
    background-color: ${backgroundColorStart};
    background-image: linear-gradient(to bottom, ${backgroundColorStart} 0%, rgba(255,255,255,0) 100%);
    box-shadow: 0 6px 15px ${colors.transparentGrey(0.08)};
    transition: box-shadow 0.5s ${cubic.easeIn}, background-color 0.5s ${cubic.easeIn};
    
    &:hover {
      box-shadow: 5px ${spacing.quarter} ${spacing.half} ${colors.transparentGrey(0.5)};
      background-color: ${backgroundColorEnd};
    }
  `;

  // eslint-disable-next-line
  return props => <ShadowComponent {...props} />;
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
