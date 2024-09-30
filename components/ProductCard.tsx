import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import { useRouter, usePathname } from 'next/navigation'
import { useAppSelector, useAppDispatch } from '@/redux/hooks'
import { addToCart, removeFromCart, addToWishList, removeFromWishList } from "../services/product"
import { AddToCart, RemoveFromCart, AddToWish, RemoveFromWish } from "../redux/slices/userSlice";
import {formatPrice} from "../utils/helpers"

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: { url: string }[];
}

interface ProductCardProps {
  product: Product;
}


const ProductCard: React.FC<any> = ({ product }) => {

  const Router = useRouter();

  const { user, status,currency } = useAppSelector((state) => state.userReducer);

  const dispatch = useAppDispatch();

  let isInCart = user?.cartItems.find(item => item?.product._id.toString() === product._id.toString());
  let isInWishlist = user?.wishItems.find(item => item?.product._id.toString() === product._id.toString());
  const trimmedText = product.description.slice(0, 25);
  const trimmedName = product.name.slice(0, 25);

  const handleAddToWish = async (e: MouseEvent<HTMLDivElement>) => {
    if (status !== "Unauthenticated") {
      if (isInWishlist) {
        dispatch(RemoveFromWish(product._id))
        await removeFromWishList(product._id)
      } else {
        dispatch(AddToWish({ product }))
        await addToWishList(product._id)

      }
    } else {
      Router.push("/auth/login");
    }

  }

  const handleAddToCart = async (e: MouseEvent<HTMLButtonElement>) => {
    if (status !== "Unauthenticated") {
      if (isInCart) {
        dispatch(RemoveFromCart(product._id))
        await removeFromCart(product._id)
      } else {
        dispatch(AddToCart({ product, quantity: 1 }))
        await addToCart(product._id)

      }
    } else {
      Router.push("/auth/login");
    }

  }
  return (
    <Con key={product._id} >
      <div className="img-con" onClick={() => Router.push(`/product/${product._id}`)}>
        <img className="" src={product.images[0].url} alt="img" />
      </div>
      <h1 onClick={() => Router.push(`/product/${product._id}`)}>{trimmedName}</h1>
      <p onClick={() => Router.push(`/product/${product._id}`)}>{trimmedText}...</p>
      <h2>{formatPrice(currency, product.price)}</h2>
      <div className="cart-like con">
        <BlueBtn onClick={handleAddToCart}>{`${isInCart ? "Remove" : "Add to cart"}`}</BlueBtn> 
      </div>
    </Con>
  )
}

const Con = styled.section`  
  width: 100%;  
  padding: 12px 8px;   
  cursor: pointer;
  .img-con{
    width: 100%;  
    height: 188px;
    margin-bottom:20px;
    background: var(--grey-grey-50, #F5F5F6);
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 100%;
      height: 100%;
    }
  }
  h1{
    color: var(--grey-700, #101113); 
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 24px */
  }
  p{
    color: var(--grey-500, #494A50); 
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    text-align: left;
    margin-bottom:10px;
    
  }
  h2{
    color: var(--grey-700, #101113); 
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%; /* 30px */
    margin-bottom:10px;
  }
  .cart-like{
    width: 100%;
    display: flex;
    align-items: center;
    visibility: hidden;
    @media (max-width: 1200px) { 
        visibility: visible;
    }
    .like-con{
        border-radius: 4px;
        border: 1px solid var(--primary-100, #D9DDFF);
        width: 40px;
        height: 40px; 
        display: flex;
        justify-content: center;
        align-items: center;
    }
  }
  &:hover{
    box-shadow: 0px 30px 60px 0px rgba(41, 91, 255, 0.15);
    .con{
        visibility: visible;
    }
  }
`;
const BlueBtn = styled.button`  
    width:100%;
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
`;

export default ProductCard