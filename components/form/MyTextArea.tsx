import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

interface TextAreaAndLabelProps {
  label: string;
  placeholder: string;
  name: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  classs?: string;
}

const TextAreaAndLabel: React.FC<any> = ({
  label,
  placeholder,
  name,
  onChange,
  value,
  classs,
}) => {
  return (
    <TextAreaLabelCon className={classs}>
      <Label>{label}</Label>
      <GreyTextArea
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
    </TextAreaLabelCon>
  );
};

const TextAreaLabelCon = styled.div`
  margin-bottom: 20px;
`;

const GreyTextArea = styled.textarea`
  width: 100%;
  height: 160px;
  border-radius: 12px;
  border: 1px solid var(--grey-200, #b6b7bb);
  background: #fff;
  color: var(--pure-black, #000);
  padding: 12px 16px;
  font-weight: 400;
  font-size: 16px;
  font-family: Poppins;
  outline: none;
`;

const Label = styled.p`
  color: var(--grey-700, #101113);
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  text-transform: capitalize;
  margin-bottom: 8px;
`;

export default TextAreaAndLabel;
