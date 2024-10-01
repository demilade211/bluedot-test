import React from 'react'
import styled from 'styled-components';
import CircularProgress from '@mui/material/CircularProgress';
import Head from "next/head";

const AppLoader = () => {
    return (
        <Con>
            <Head>
                <link rel="icon" href="/s.png" />
                <title>Spinel Hub - Your one-stop shop for premium IT hardware</title>
                <meta name="description" content="Spinel Hub Store - Your destination for premium IT hardware products. Browse our wide selection of network cameras, software, network switches, cables, security doors, server, and storage solutions." />
                <meta name="keywords" content="Spinel Hub, IT hardware, network cameras, software, network switches, cables, security doors, server, storage" />
                <meta name="author" content="Spinel Hub" />
                <meta property="og:title" content="Spinel Hub - Your one-stop shop for premium IT hardware" />
                <meta property="og:description" content="Spinel Hub Store - Your destination for premium IT hardware products. Browse our wide selection of network cameras, software, network switches, cables, security doors, server, and storage solutions." />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://example.com/hero-image.jpg" />
            </Head>
            <div className='mb-5 w-[150px]'>
                <img className='logo w-[100%]' src="/images/components/logo.png" alt="img" />
            </div>
            <CircularProgress />
        </Con>
    )
}

const Con = styled.section`  
    width: 100%;      
    height: 100vh; 
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center; 
`;

export default AppLoader