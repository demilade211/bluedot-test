import React from 'react'
import styled from 'styled-components';

const Footer = () => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    return (
        <Con>
            <FirstRow>
                <div className='first'>
                    <div>
                        <img className='logo' src="/images/components/logo.svg" alt="img" />
                    </div>
                    <p className='first-p'>
                        © {currentYear} SpinelHub <br />All Rights Reserved
                    </p>
                </div>
                <div className='second'>
                    <h4>About us</h4>
                    <p> About us </p>
                    <p> Store Location </p>
                    <p>Contact</p>
                    <p>Orders tracking</p>
                </div>
                <div className='second'>
                    <h4>Useful links</h4>
                    <p> Returns </p>
                    <p> Support policy</p>
                    <p>Size guide</p>
                    <p>FAQs</p>
                </div>
                <div className='second'>
                    <h4>follow us</h4>
                    <p> Facebook </p>
                    <p>Twitter</p>
                    <p>Instagram</p>
                    <p>Youtube</p>
                </div>

            </FirstRow>
        </Con>
    )
}

const Con = styled.section`  
    width: 100%;      
    padding: 64px 120px;
    background: var(--grey-grey-50, #F5F5F6); 
    display: flex;
    flex-direction:column;
    align-items:center;
    justify-content: center;
    @media (max-width: 600px) { 
        padding: 50px 30px;
    }
    p{ 
        color: var(--grey-500, #494A50);
        font-family: Poppins;
        font-size: 15px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 24px */
        @media (max-width: 1200px) { 
            text-align: left;
        }
    }
`;

const FirstRow = styled.div`  
    width: 90%;    
    display: grid;
    grid-template-columns:1fr 1fr 1fr 1fr;  
    @media (max-width: 1000px) { 
        grid-template-columns:1fr ; 
    }
    @media (min-width: 1400px) {  
        width: 70%;
    }
    .first{      
        display: flex;
        flex-direction:column; 
        justify-content: center;
        @media (max-width: 1200px) { 
            display: flex;
            flex-direction:column; 
            width: 100%;
            margin-bottom:40px;
        } 
        .logo{
            margin-bottom:10px; 
        }  
    }
    .second{   
        display:flex;
        flex-direction:column;  
        @media (max-width: 1200px) {  
            margin-bottom:40px;
        }
        h4{
            color: var(--grey-700, #101113);
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%;  
            margin-bottom:20px;
            text-transform: uppercase;
            @media (max-width: 1200px) { 
                text-align: left;
            }
        } 
        p{
            margin-bottom:15px;
        }
    } 
    
`;

export default Footer