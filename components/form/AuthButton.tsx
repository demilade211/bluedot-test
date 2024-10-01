import React from 'react';
import styled from 'styled-components';

interface AuthButtonProps {
  content: string;
  onClick: () => void;
  disabled?: boolean;
}

const AuthButton: React.FC<any> = ({ content, onClick, disabled }) => {
  return (
    <Btn onClick={onClick} disabled={disabled}>
      {content}
    </Btn>
  );
};

const Btn = styled.button`
  width: 100%;
  height: 44px; 
  color: white;
  border-radius: 12px;
  background: #295BFF;
  color: var(--White, #FFF);
  text-align: center;
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  margin-bottom: 20px;
  transition: 300ms ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:disabled,
  button[disabled] { 
    background: #ccd8ff;
    color: white;
  }
`;

export default AuthButton;
