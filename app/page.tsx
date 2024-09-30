'use client'
 
import DealsSection from "@/components/pages/home/DealsSection";
import AppLayout from "@/layouts/AppLayout";
import styled from 'styled-components';

export default function Home() {
  return (
    <Con>
      <AppLayout> 
        <DealsSection/>
      </AppLayout>
    </Con>
  );
}

const Con = styled.section`  
  width: 100%;   
`;
