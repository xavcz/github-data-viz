import React, { PropTypes } from 'react';
import styled, { keyframes } from 'styled-components';

// SVG imported like this to avoid storybook to complain about missing file
const svgLogo = `${process.env.PUBLIC_URL}/logo.svg`;

const Header = ({ inline }) => (
  <HeaderWrapper inline={inline}>
    <Logo src={svgLogo} alt="Apollo" inline={inline} />
    <Title>Apollo Github Organization</Title>
  </HeaderWrapper>
);

Header.propTypes = {
  // true, display logo & title in line; false in column
  inline: PropTypes.bool,
};

// Container around the Logo & Title, can display inline or in column
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${props => !props.inline && 'flex-direction: column'};
`;

// Logo stylings depending on inline or not
const Logo = styled.img`
  ${props => props.inline && 'margin-right: 20px;'};
`;

// Animation for the title!
const shimmer = keyframes`
  from { background-position: -500px 0 }
  to { background-position: 500px 0 }
`;

// Title with animated text color (grey stripe walking the text in 1.5s)
const Title = styled.h1`
  animation: 1.5s linear 1 forwards ${shimmer};
  background: linear-gradient(to right, #fff 10%, #bbb 18%, #fff 26%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 1000px 2em;
`;

export default Header;
