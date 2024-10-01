import React, { useState, ChangeEvent, MouseEvent, FormEvent } from "react";
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'
import Router from "next/router";
import Badge from '@mui/material/Badge';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { StyledMenu } from '../utils/CustomStyles';
import Avatar from '@mui/material/Avatar';
import { stringAvatar } from "../utils/helpers";
import { useAppSelector, useAppDispatch } from '@/redux/hooks' 
import { SetCurrency } from "../redux/slices/userSlice";
import cookie from "js-cookie"

interface User {
  name: string;
  cartItems: any[];
  wishItems: any[];
}

const Navbar: React.FC = () => {
  const { user, status, currency } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch()
  const cartValue = status === "Authenticated" ? user?.cartItems.length : 0;
  const wishValue = status === "Authenticated" ? user?.wishItems.length : 0;

  const [showNav, setShowNav] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl1, setAnchorEl1] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const [keyword, setKeyword] = useState("");
  const open = Boolean(anchorEl);
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

  const Router = useRouter();

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick1 = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl1(event.currentTarget);
  };

  const handleClose1 = () => {
    setAnchorEl1(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      Router.push(`/products?keyword=${keyword}`);
    } else {
      Router.push(`/`);
    }
  };

  const logOut = () => {
    cookie.remove("token");
    window.location.href = "/auth/login" 
}

  //const isActive = (route: string) => router.pathname === route;

  return (
    <>
      <Con>
        <div className="left">
          <img className="mob-ham mr-2" src="/images/components/ham.svg" alt="img" onClick={() => setShowNav(!showNav)} />
          <img className="cursor-pointer" src="/images/components/logo.png" alt="img" onClick={() => Router.push(`/`)} />
        </div>
        <div className="right flex items-center">
          <SearchCon onSubmit={handleSubmit}>
            <input type="text" placeholder="Search for a product" onChange={(e: ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)} />
            <img src="/images/components/Search.svg" alt="img" />
          </SearchCon>

          <CurrencyCon onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl2(event.currentTarget)} id="basic-button">
            <div className="flex items-center">
              <img className="" src="/images/components/Bill.svg" alt="img" />
              <p className="mx-2">{currency}</p>
            </div>
            <div className="img"><img src="/images/components/drop.svg" alt="img" /></div>
          </CurrencyCon>

          <StyledMenu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={() => setAnchorEl2(null)}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => {
              dispatch(SetCurrency("Naira"));
              setAnchorEl2(null);
            }}>
              Naira
            </MenuItem>
            <MenuItem onClick={() => {
              dispatch(SetCurrency("Dollar"));
              setAnchorEl2(null);
            }}>Dollar</MenuItem>
          </StyledMenu>

          <div className="per-cart-love flex items-center">
            <div className="icon mr-3">
              <Badge badgeContent={cartValue} color="secondary">
                <img onClick={() => Router.push(`/cart`)} src="/images/components/cart.svg" alt="img" />
              </Badge>
            </div> 
            <div className="icon">
              {status === "Authenticated" ? 
                <Avatar onClick={handleClick1} {...stringAvatar(user?.name)} /> : 
                <img onClick={handleClick} className="" src="/images/components/Profile.svg" alt="img" />}
              
              <StyledMenu
                id="basic-menu1"
                anchorEl={anchorEl1}
                open={open1}
                onClose={handleClose1}
              >
                <MenuItem onClick={() => Router.push(`/profile`)}>Profile</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </StyledMenu>

              <StyledMenu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              >
                <MenuItem onClick={() => Router.push(`/auth/login`)}>Login</MenuItem>
                <MenuItem onClick={() => Router.push(`/auth/signup`)}>Sign Up</MenuItem>
              </StyledMenu>
            </div>
          </div>
        </div>
      </Con>
    </>
  );
}

const Con = styled.div` 
    width:100%;     
    min-height: 90px;
    display: flex;
    justify-content: space-between;
    align-items:center; 
    padding: 20px 120px; 
    position: fixed;
    background-color:white;
    z-index: 2;
    @media (max-width: 1200px) { 
        padding: 20px 20px; 
    }
    @media (min-width: 1400px) {  
        padding: 20px 120px;
    }
    .left{  
        width: 150px;
        height: 30px; 
        display: flex;
        align-items: center; 
        .mob-ham{
            display: none;
            @media (max-width: 1200px) { 
                display:block; 
            } 
        }
        img{
          width: 100%; 
        }
    }
    .right{
        width: 80%; 
        @media (max-width: 1000px) { 
            display:none; 
        } 
        .per-cart-love{
            .icon{
                height:100%;
                cursor: pointer;
                img{
                    width:40px; 
                }
            }
        }
    }
    .mobile-right{ 
        display:none; 
        .icon{
            img{
                width:30px;
            }
        }
        @media (max-width: 1000px) { 
            display:flex;
            align-items:center; 
        }
    }
    .mobile-nav{ 
        border: 1px solid black;
        position: fixed;
        width: 100%;
        top: -100%; /* Start above the viewport */
        left: 0;
        display: block; /* Change to 'none' when you want to hide it */ 
        border: 0.5px solid rgba(255, 255, 255, 0.04);
        background: var(--grey-grey-50, #F5F5F6); 
        padding: 20px 30px;
        opacity: 0; /* Start fully transparent */
        transition: 900ms ease-in;
        transform: translateY(0); /* Start at the original position */ 
        z-index:500;
        &.active {
            /* Add a class 'active' when you want to show the navigation */
            top: 0; /* Move it to the original position */
            opacity: 1; /* Make it fully visible */
            transform: translateY(0); /* Ensure it's at the original position */
        }
        .close{
            display:flex;
            justify-content:flex-end;
            align-items:center;
            margin-bottom:40px;
        }
        ul{
            li{
                text-align:left;
                list-style-type:none;
                margin-bottom:30px; 
                color: var(--grey-500, #494A50);
                font-family: Poppins;
                font-size: 15px;
                font-style: normal;
                font-weight: 400;
                line-height: 150%; /* 24px */
            }
        }
        @media (max-width: 1200px) { 
            display:block;  
        }
    }
`;

const SearchCon = styled.form` 
    width:100%;
    height: 56px;
    padding: 12px 16px;
    border-radius: 12px;
    border: 1px solid var(--grey-200, #B6B7BB);
    display:flex;  
    img{
        margin-right:10px;
    }
    input{
        width:100%;
        background:none;
        border:none;
        outline:none;  
        font-size: 14px; 
        color: var(--grey-400, #6B6C74); 
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%; /* 24px */
    }
    @media (max-width: 800px) {
        margin-bottom:10px;
    }
`;

const CurrencyCon = styled.div` 
    border-radius: 24px;
    padding: 8px; 
    border: 1px solid var(--grey-200, #B6B7BB);
    margin: 0 20px;
    display:flex;
    justify-content:space-between;
    align-items: center;
    cursor:pointer;
    @media (max-width: 1200px) {
        width: auto;
        height: auto;
        margin: 0;
        margin-bottom:20px;

    }
    .img{
        width: 40px;
        height: 20px; 
        img{
            width:100%;
            height: 100%;
        }
    }
`;

export default Navbar;



