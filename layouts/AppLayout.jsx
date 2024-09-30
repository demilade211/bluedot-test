import React from 'react'
import styled from 'styled-components';
import Navbar from "../components/Navbar"
import Footer from '../components/Footer';
import Head from "next/head";

const AppLayout = ({ children }) => {
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
      <Navbar />
      {children}
      <Footer />
    </Con>
  )
}

const Con = styled.div`  
  width: 100%;   
  overflow:hidden;
`;

export default AppLayout