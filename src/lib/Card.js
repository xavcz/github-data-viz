import styled from 'styled-components';
import { colors, spacing, shadowTransition } from './styles';

const transitionColors = {
  start: colors.white,
  end: colors.grey
};

const Card = shadowTransition(transitionColors)(styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  padding: 20px;
  border-radius: 16px;
  overflow: hidden;
  color: ${colors.black};
  margin: ${spacing.quarter} 0;
`);

// note: this flex + svg could be abstracted in a hoc.
export const CardTitle = styled.h3`
  display: flex;
  align-items: center;
  margin-top: 0;
  color: ${colors.gradientTop};
  
  svg {  
    margin: 0 ${spacing.quarter};
  }
`;

export const CardItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    &:not(:last-child) {
      margin-right: ${spacing.quarter};
    }
    margin-left: ${spacing.quarter};
  }
`;

export default Card;
