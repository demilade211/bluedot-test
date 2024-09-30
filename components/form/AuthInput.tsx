import React from 'react';
import styled from "styled-components";

interface AuthInputProps {
  place: string;
  label: string;
  withIcon?: boolean;
  image?: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  value: string;
  errors?: {
    inputName: string;
    isError: boolean;
    message: string;
  };
  className?: string;
}

const AuthInput: React.FC<any> = ({ 
  place, 
  label, 
  withIcon, 
  image, 
  type, 
  onChange, 
  name, 
  value, 
  errors, 
  className 
}) => {
  return (
    <InputLabelContainer className={className}>
      <Label>{label}</Label>
      <InputContainer>
        {withIcon && <img src={image} alt="icon" />}
        <input 
          type={type} 
          placeholder={place} 
          onChange={onChange} 
          name={name} 
          value={value} 
        />
      </InputContainer>
      {errors?.inputName === name && errors?.isError && 
        <ErrorMessage>{errors.message}</ErrorMessage>
      }
    </InputLabelContainer>
  );
};

const InputLabelContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const Label = styled.p`
  color: var(--grey-700, #101113);
  font-family: Poppins, sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%; /* 24px */
  text-transform: capitalize;
  margin-bottom: 8px;
`;

const ErrorMessage = styled.div`
  color: red;
  font-family: Montserrat, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: normal;
  margin-top: 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 47px;
  display: flex;
  align-items: center;
  border-radius: 12px;
  border: 1px solid var(--grey-200, #B6B7BB);
  background: #FFF;
  padding: 12px 16px;

  img {
    margin-right: 10px;
    width: 25px;
    height: 25px;
  }

  input {
    width: 100%;
    background: none;
    border: none;
    outline: none;
    color: var(--pure-black, #000);
    font-family: Poppins, sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px; /* 100% */

    &::placeholder {
      color: var(--grey-400, #6B6C74);
      font-family: Poppins, sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 150%; /* 21px */
    }
  }
`;

export default AuthInput;
