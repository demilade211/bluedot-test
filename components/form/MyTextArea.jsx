import React from 'react'
import styled from 'styled-components';

const TextAreaAndLabel = ({label,placeholder,name,onChange,value,classs}) => {
  return (
    <TextAreaLabelCon className={classs}>
        <Label>{label}</Label>
        <GreyTextArea type="textarea" placeholder={placeholder} name={name} onChange={onChange} value={value}></GreyTextArea>
    </TextAreaLabelCon>
  )
}

const TextAreaLabelCon = styled.div`
    margin-bottom:20px;
`;

const GreyTextArea = styled.textarea`
    width:100%;
    height: 160px;
    border-radius: 12px;
    border: 1px solid var(--grey-200, #B6B7BB);
    background: #FFF; 
    color: var(--pure-black, #000);
    padding: 12px 16px; 
    font-weight: 400;
    font-size: 16px; 
    font-family: Poppins;
    outline:none
`;

const Label = styled.p`
  color: var(--grey-700, #101113);
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  text-transform: capitalize;
  margin-bottom:8px;
`;

export default TextAreaAndLabel