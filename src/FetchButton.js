import React, { PropTypes } from 'react';
import styled from 'styled-components';
import { MarkGithubIcon, HubotIcon, RepoPullIcon, RepoCloneIcon } from 'react-octicons-svg';

import { colors, spacing, fonts, cubic } from './lib/styles';

export const statusList = [
  { id: 'init', icon: MarkGithubIcon, caption: 'Fetch organization repositories' },
  { id: 'loading', icon: HubotIcon, caption: 'Loading...', disabled: true },
  { id: 'populating', icon: RepoPullIcon, caption: 'Populating graph...', disabled: true },
  { id: 'refetch', icon: RepoCloneIcon, caption: 'Refetch data!' },
];

const FetchButton = ({ statusId = 'init' }) => {
  const { icon: IconComponent, caption, disabled } = statusList.find(status => status.id === statusId);

  return (
    <Button disabled={disabled}>
      <IconComponent />{caption}
    </Button>
  );
};

FetchButton.propTypes = {
  statusId: PropTypes.oneOf(statusList.map(status => status.id)),
};

const Button = styled.button`
  svg {
    height: ${spacing.single};
    width: auto;
    fill: ${colors.gradientTop};
    margin-right: ${spacing.quarter};
  }
  
  display: flex;
  align-items: center;
  margin: ${spacing.half};
  
  border: 0;
  padding: ${spacing.quarter} ${spacing.half};
  border-radius: 99px;
  font-size: ${fonts.large};
  color: ${colors.gradientBottom};
  background-color: ${props => props.disabled ? colors.grey : colors.white};
  outline: none;
  cursor: pointer;
  
  box-shadow: 0 6px 15px ${colors.transparentGrey(0.08)};
  transition: box-shadow .5s ${cubic.easeIn}, background-color .5s ${cubic.easeIn};
  
  &:hover {
    box-shadow: 5px ${spacing.quarter} ${spacing.half} ${colors.transparentGrey()};
    background-color: ${colors.grey};
  }
`;

export default FetchButton;
