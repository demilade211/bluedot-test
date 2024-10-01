import React from 'react'
import styled from "styled-components";
import AuthInput from '../../form/AuthInput';
import AuthButton from '../../form/AuthButton';

const AccountInfo: React.FC<any> = ({user}) => {
  return (
    <Con>
      <div className='grid-con'>
        <AuthInput place="Full Name" type="text" classs="first-item" value={user.name}/>
        <AuthInput place="Email address" type="email" value={user.email}/>
        <AuthInput place="Phone" type="tel" />
      </div>
      <AuthButton content="Save Changes" />
    </Con>
  )
}

const Con = styled.div`
  width: 100%; 
  .grid-con{
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 10px;
    @media (max-width: 1200px) { 
      grid-template-columns:100%; 
    } 
    .first-item{
      grid-column:1/3;
      @media (max-width: 1200px) { 
        grid-column:1/2;
    } 
    }
  }
`;

export default AccountInfo