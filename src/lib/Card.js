import styled from 'styled-components';
import { colors, shadowTransition } from './styles';

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
`);

export default Card;
