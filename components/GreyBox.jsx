import React from 'react'
import styled from "styled-components";

const GreyBox = ({children,title}) => {
  return (
    <Con>
        <div className='head'>
            <h1>{title}</h1>
        </div>
        {children}
    </Con>
  )
}

const Con = styled.div`
    width: 100%;  
    border-radius: 8px;
    background: var(--grey-grey-50, #F5F5F6);
    .head{
        padding: 16px 16px;
        border-bottom:1px solid #DEDEE0;
        display: flex;
        align-items: center;
        h1{
            color: var(--grey-700, #101113); 
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 30px */
        }
    }

`;

export default GreyBox