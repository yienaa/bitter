import React from 'react';
import styled from 'styled-components';
import { UiSize, UiColor, UiVariant, UI_SIZE, UI_COLOR, UI_VARIANT } from '../types/style';

interface ButtonProps {
  variant?: UiVariant;
  color?: UiColor;
  size?: UiSize;
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
  label?: string;
  iconClass?: string;
}

const StyledButton = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: ${({ size = UI_SIZE.MEDIUM }) => 
    size === UI_SIZE.SMALL ? '6px 12px' :
    size === UI_SIZE.LARGE ? '12px 24px' : 
    '8px 16px'
  };
  font-size: ${({ size = UI_SIZE.MEDIUM }) => 
    size === UI_SIZE.SMALL ? '14px' :
    size === UI_SIZE.LARGE ? '16px' : 
    '14px'
  };
  width: ${({ fullWidth }) => fullWidth ? '100%' : 'auto'};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  ${({ variant = UI_VARIANT.FILLED, color = UI_COLOR.PRIMARY }) => {
    switch (variant) {
      case UI_VARIANT.OUTLINED:
        return `
          background: transparent;
          border: 1px solid ${color === UI_COLOR.PRIMARY ? '#1A73E8' : 
                            color === UI_COLOR.SECONDARY ? '#5F6368' : 
                            '#D93025'};
          color: ${color === UI_COLOR.PRIMARY ? '#1A73E8' : 
                  color === UI_COLOR.SECONDARY ? '#5F6368' : 
                  '#D93025'};
          &:hover {
            background: rgba(0, 0, 0, 0.04);
          }
        `;
      case UI_VARIANT.TEXT:
        return `
          background: transparent;
          border: none;
          color: ${color === UI_COLOR.PRIMARY ? '#1A73E8' : 
                  color === UI_COLOR.SECONDARY ? '#5F6368' : 
                  '#D93025'};
          &:hover {
            background: rgba(0, 0, 0, 0.04);
          }
        `;
      default: // FILLED
        return `
          background: ${color === UI_COLOR.PRIMARY ? '#1A73E8' : 
                      color === UI_COLOR.SECONDARY ? '#5F6368' : 
                      '#D93025'};
          border: none;
          color: white;
          &:hover {
            background: ${color === UI_COLOR.PRIMARY ? '#1557B0' : 
                        color === UI_COLOR.SECONDARY ? '#3C4043' : 
                        '#B31412'};
          }
        `;
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    &:hover {
      background: ${({ variant = UI_VARIANT.FILLED, color = UI_COLOR.PRIMARY }) => 
        variant === UI_VARIANT.FILLED ? 
          (color === UI_COLOR.PRIMARY ? '#1A73E8' : 
           color === UI_COLOR.SECONDARY ? '#5F6368' : 
           '#D93025') : 
        'transparent'
      };
    }
  }
`;

function Button({
  variant = UI_VARIANT.FILLED,
  color = UI_COLOR.PRIMARY,
  size = UI_SIZE.MEDIUM,
  fullWidth = false,
  disabled = false,
  onClick,
  children,
  label,
  iconClass,
  ...props
}: ButtonProps) {
  return (
    <StyledButton
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {iconClass && <i className={iconClass} />}
      {label || children}
    </StyledButton>
  );
}

export default Button;
