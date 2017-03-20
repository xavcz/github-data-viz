import React from 'react';
import styled from 'styled-components';
import { colors, spacing, fonts, shadowTransition } from './styles';

// grey background if the button is disabled
const transitionColors = props => ({
  start: props.disabled ? colors.grey : colors.white,
  end: colors.grey,
});

const Button = props => {
  const ShadowButton = shadowTransition(transitionColors(props))(
    styled.button`
      svg {
        height: ${props => props.big ? spacing.single : spacing.half};
        width: auto;
        fill: ${colors.gradientTop};
        margin-right: ${spacing.quarter};
      }
      
      display: flex;
      align-items: center;
      margin: ${spacing.quarter} 0;
      border: 0;
      padding: ${spacing.quarter} ${spacing.half};
      border-radius: 99px;
      font-size: ${props => props.big ? fonts.large : fonts.small};
      color: ${colors.gradientBottom};
      outline: none;
      cursor: pointer;
    `
  );

  return <ShadowButton {...props} />;
};

export default Button;
