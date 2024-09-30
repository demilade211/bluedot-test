import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';

interface FullBlueButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
}

const FullBlueButton: FC<FullBlueButtonProps> = ({ children, type = 'button', onClick, disabled }) => {
  return (
    <BlueBtn type={type} onClick={onClick} disabled={disabled}>
      {children}
    </BlueBtn>
  );
};

const BlueBtn = styled.button`
  width: 100%;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 12px 16px;
  border: none;
  border-radius: 4px;
  background: #295bff;
  line-height: normal;
  color: #fff;
  text-align: center;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  cursor: pointer;
  outline: none;

  &:disabled,
  button[disabled] {
    background: #ccd8ff;
    color: white;
  }
`;

export default FullBlueButton;
