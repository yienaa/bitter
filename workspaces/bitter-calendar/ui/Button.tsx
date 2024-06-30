import styled, { css } from 'styled-components';
import React from 'react';
import { UI_COLOR, UI_SIZE, UI_VARIANT, UiColor, UiSize, UiVariant } from '../types/style';
import Icon from './Icon';

interface ButtonProps {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  size?: UiSize;
  color?: UiColor;
  variant?: UiVariant;
  iconClass?: string;
}

const sizes = {
  [UI_SIZE.SMALL]: css`
    font-size: 12px;
    padding: 4px 8px;
    height: 24px;

    & > ${Icon} {
      display: inline-block;
      font-size: 16px;
      width: 16px;
      height: 16px;
    }
  `,
  [UI_SIZE.MEDIUM]: css`
    font-size: 14px;
    padding: 6px 12px;
    height: 32px;

    & > ${Icon} {
      display: inline-block;
      font-size: 18px;
      width: 18px;
      height: 18px;
    }
  `,
  [UI_SIZE.LARGE]: css`
    font-size: 16px;
    padding: 8px 16px;
    height: 40px;

    & > ${Icon} {
      display: inline-block;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }
  `,
};

const colors = {
  [UI_COLOR.PRIMARY]: css`
    --main-color: #6200ea; /* Vivid Purple */
    background-color: #6200ea;
    color: white;

    &:hover {
      background-color: #3700b3;
    }
  `,
  [UI_COLOR.SECONDARY]: css`
    --main-color: #757575; /* Cool Gray */
    background-color: var(--main-color);
    color: white;

    &:hover {
      background-color: #cccccc;
    }
  `,
  [UI_COLOR.DANGER]: css`
    --main-color: #f44336; /* Vivid Purple */
    background-color: #f44336;
    color: white;

    &:hover {
      background-color: #d32f2f;
    }
  `,
};

const styles = {
  [UI_VARIANT.FILLED]: css`
    border: none;
  `,
  [UI_VARIANT.OUTLINED]: css`
    background-color: transparent;
    border: 1px solid var(--main-color);
    color: var(--main-color);
  `,
  [UI_VARIANT.TEXT]: css`
    background-color: transparent;
    border: none;
    color: var(--main-color);
  `,
};

const DefaultButtonProps = {
  size: UI_SIZE.MEDIUM,
  color: UI_COLOR.PRIMARY,
  variant: UI_VARIANT.FILLED,
};

const StyledButton = styled.button<ButtonProps>`
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-sizing: border-box;

  ${({ size }) => sizes[size || DefaultButtonProps.size]}
  ${({ color }) => colors[color || DefaultButtonProps.color]}
  ${({ variant }) => styles[variant || DefaultButtonProps.variant]}
`;

export default function Button({
  label,
  onClick,
  disabled,
  size,
  color,
  variant,
  iconClass,
}: ButtonProps): React.ReactElement {
  return (
    <StyledButton
      size={size}
      color={color}
      variant={variant}
      onClick={onClick}
      disabled={!!disabled}
    >
      {iconClass && <Icon className={iconClass} />}
      {label}
    </StyledButton>
  );
}
