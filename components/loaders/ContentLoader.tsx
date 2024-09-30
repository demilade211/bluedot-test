import React from 'react'
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';

const ContentLoader = () => {
    return (
        <Con> 
            <CircularProgress />
        </Con>
    )
}

const Con = styled.section`  
    width: 100%; 
    height:100%;      
    display: flex; 
    align-items:center;
    justify-content: center;  
`;

export default ContentLoader