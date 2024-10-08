import React, { ReactNode } from 'react';
import styled from 'styled-components';
import Navbar from "../components/Navbar";
import Footer from '../components/Footer';
import Head from "next/head";
import AppGuard from '@/guards/AppGuard';

interface AppLayoutProps {
  children?: ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <Con> 
      <AppGuard>
        <Navbar />
        {children}
        <Footer />
      </AppGuard> 
    </Con>
  );
};

const Con = styled.div`
  width: 100%;
  max-width: 1500px; /* Set a max-width to limit how wide the content can get */
  margin: 0 auto; /* Centers the content */
  padding: 0 16px; /* Adds some space around the content */
  overflow: hidden;
`;

export default AppLayout;
