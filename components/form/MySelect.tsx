import React from 'react';
import styled from 'styled-components';
import { selectStyle, selectStyle2 } from "../../utils/CustomStyles";
import Select from 'react-select';

// Define the types for props
interface MySelectProps {
  label: string;
  options: { label: string; value: string }[];
  onChange: (selectedOption: any) => void;
  value: any;
  place?: string;
  big?: boolean;
  isDisabled?: boolean;
}

const MySelect: React.FC<MySelectProps> = ({ label, options, onChange, value, place, big, isDisabled }) => {
  const sel = big ? selectStyle2 : selectStyle;

  return (
    <InputLabelCon>
      {big ? <Label2>{label}</Label2> : <Label>{label}</Label>}
      <Select
        options={options}
        isDisabled={isDisabled}
        styles={sel}
        value={value}
        onChange={onChange}
        placeholder={place || "Select an option"}
      />
    </InputLabelCon>
  );
};

const InputLabelCon = styled.div`
  margin-bottom: 30px;
`;

const Label = styled.div`
  color: var(--grey-700, #101113); 
  font-family: Poppins;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  margin-bottom: 10px;
`;

const Label2 = styled.div`
  color: var(--grey-700, #101113); 
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 21px */
  margin-bottom: 10px;
`;

export default MySelect;
