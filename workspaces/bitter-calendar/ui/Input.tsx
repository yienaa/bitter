import styled from 'styled-components';
import { colors } from '../styles/theme';
import React from 'react';
import Icon from './Icon';

interface InputProps {
  placeholder: string;
  iconClass?: string;
}

const StyledInputWrapper = styled.div`
  padding: 5px 5px;
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid ${colors.border};
  border-radius: 4px;

  & > ${Icon} {
    margin: 0 5px;
  }
`;

const StyledInput = styled.input<InputProps>`
  width: 100%;
  box-sizing: border-box;
  padding: 0 5px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #66afe9;
    outline: none;
    //box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  }

  &::placeholder {
    color: ${colors.placeholder};
  }
`;

export default function Input({ placeholder, iconClass = 'icon-search' }: InputProps): React.ReactElement {
  return (
    <StyledInputWrapper>
      {iconClass && <Icon className={iconClass} />}
      <StyledInput placeholder={placeholder} />
    </StyledInputWrapper>
  );
}
