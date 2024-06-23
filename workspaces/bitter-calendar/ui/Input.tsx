import styled from 'styled-components';
import { colors } from '../styles/theme';

const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  box-sizing: border-box;
  border: 1px solid ${colors.border};
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #66afe9;
    outline: none;
    box-shadow: 0 0 8px rgba(102, 175, 233, 0.6);
  }
`;

export default Input;
