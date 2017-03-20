import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { spacing, colors, shimmeringText } from './lib/styles';

// SVG imported like this to avoid storybook to complain about missing file

const Header = ({ inline }) => (
  <HeaderWrapper inline={inline}>
    <Logo src="/logo.svg" alt="Apollo" inline={inline} />
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
  margin: ${spacing.quarter} 0;
  color: ${colors.white};
`;

// Logo stylings depending on inline or not
const Logo = styled.img`
  ${props => props.inline && `margin-right: ${spacing.half};`};
  ${props => props.inline && 'width: 64px;'}
  ${props => props.inline && 'height: 64px;'}
`;

const Title = shimmeringText(
  styled.h1`
  margin: ${spacing.half} 0;
`
);

export default Header;
