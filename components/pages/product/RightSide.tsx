import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { UpdateQuantity, addToCart, addToWishList, removeFromCart, removeFromWishList } from "../../../services/product"
import { AddToCart, RemoveFromCart, AddToWish, RemoveFromWish } from "../../../redux/slices/userSlice";
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { useRouter, usePathname, useParams  } from 'next/navigation'

interface Product {
    _id: string;
    name: string;
    price: number;
    description: string;
    images: Array<{ url: string }>;
  }
  
  interface RightSideProps {
    product: Product;
    quantity: number;
    setQuantity: React.Dispatch<React.SetStateAction<number>>;
  }

const RightSide: React.FC<any> = ({ product,quantity,setQuantity }) => {

    const Router = useRouter();

    const { user, status } = useAppSelector((state) => state.userReducer);

    const dispatch = useAppDispatch();

    let isInCart = user?.cartItems.find(item => item?.product._id === product._id);
    let isInWishlist = user?.wishItems.find(item => item?.product._id === product._id);
    const trimmedText = product?.description?.slice(0, 450);
      
 

    const handleQuantity = async (type: 'reduce' | 'increase') => {
        type === 'reduce' ? setQuantity(quantity - 1) : setQuantity(quantity + 1);
        await UpdateQuantity(product._id, { action: type });
      }; 
    
      const handleAddToCart = async () => {
        if (status !== 'Unauthenticated') {
          if (isInCart) {
            dispatch(RemoveFromCart(product._id));
            await removeFromCart(product._id);
          } else {
            dispatch(AddToCart({ product, quantity: 1 }));
            await addToCart(product._id);
          }
        } else {
          Router.push('/auth/login');
        }
      };

    console.log(quantity);

    return (
        <Right>
            <h1>{product.name}</h1>
            <h2>N{product.price}</h2>
            <p className='desc'>
                {trimmedText}...
            </p>
            <div className='flex md:items-center flex-col md:flex-row'>
                <QuantityCon>
                    <CountBtn onClick={() => handleQuantity("reduce")} disabled={quantity < 2}>-</CountBtn>
                    <p className='count'>{quantity}</p>
                    <CountBtn onClick={() => handleQuantity("increase")}>+</CountBtn>
                </QuantityCon>
                <div className="cart-like con md:ml-10 ">
                    <BlueBtn onClick={handleAddToCart}>{`${isInCart ? "Remove" : "Add to cart"}`}</BlueBtn> 
                </div>
            </div>
        </Right>
    )
}

const Right = styled.div`
    width: 100%;        
    padding: 30px;
    @media (max-width: 768px) { 
        padding: 0px;
    }
    h1{
      color: var(--grey-700, #101113); 
      font-family: Poppins;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 27px */
      margin-bottom:25px;
    }
    h2{
      color: var(--grey-700, #101113); 
      font-family: Poppins;
      font-size: 24px;
      font-style: normal;
      font-weight: 500;
      line-height: 140%; /* 33.6px */
      margin-bottom:20px;
    }
    .desc{
      color: var(--grey-500, #494A50); 
      font-family: Poppins;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 24px */
      margin-bottom:20px;
    }
    .cart-like{
      width: 100%;
      display: flex;
      align-items: center; 
      .like-con{
          border-radius: 4px;
          border: 1px solid var(--primary-100, #D9DDFF);
          width: 40px;
          height: 40px; 
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
      }
    } 
`;

const QuantityCon = styled.div` 
    display: flex;
    @media (max-width: 768px) { 
      margin-bottom:20px;
    }
    .count{
        color: #000;
        text-align: center; 
        font-family: Poppins;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 27px */
        margin:0 10px;
    }
`;

const CountBtn = styled.button`  
    width: 24px;
    height: 24px; 
    justify-content:center;
    align-items:center; 
    border:none;
    border-radius: 4px;
    background: #295BFF;
    line-height: normal; 
    color: #FFF; 
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    cursor:pointer;
    outline:none; 
    &:disabled,
    button[disabled]{ 
      background:  #ccd8ff;
      color:white;
    }
`;

const BlueBtn = styled.button`  
    width:84%;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px 16px;  
    border:none;
    border-radius: 4px;
    background: #295BFF;
    line-height: normal; 
    color: #FFF; 
    text-align: center;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
    cursor:pointer;
    outline:none; 
    button[disabled]{ 
      background:  #ccd8ff;
      color:white;
    }
`;

export default RightSide