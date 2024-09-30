import React from 'react'
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation'

const Quicklinks: React.FC<any> = ({ next }) => {
    const Router = useRouter();
    return (
        <Con>
            <span onClick={() => Router.push(`/`)}>Home</span>
            <span className='mx-2'>/</span>
            <span className='dark'>{next}</span>
        </Con>
    )
}

const Con = styled.div` 
    display: flex;
    align-items: center; 
    span{
        color: var(--grey-700, #6B6C74); 
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
         cursor: pointer;
        &:hover {
            color: var(--brand-color, #DB0F31); /* Remove background color on hover */  
            transition: 400ms ease-in;
        }
        &.dark{
            color: var(--grey-700, #101113); 
        }
    }
`;

export default Quicklinks