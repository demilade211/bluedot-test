import React, { useState } from 'react'
import styled from 'styled-components';
import { UpdateQuantity, removeFromCart } from "../../../services/product"
import { AddToCart, RemoveFromCart, AddToWish, RemoveFromWish } from "../../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "../../../utils/helpers"
import Router from "next/router"

const CartProduct = ({ val, setIquantity, currency }) => {

    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(val.quantity)

    const trimmedName = val.product.name.slice(0, 25);

    const handleQuantity = async (type) => {
        type === "reduce" ? setQuantity(quantity - 1) : setQuantity(quantity + 1)
        type === "reduce" ? setIquantity(prev => prev - 1) : setIquantity(prev => prev + 1)
        await UpdateQuantity(val.product._id, { action: type })

    }

    const handleCart = async (e) => {
        dispatch(RemoveFromCart(val.product._id))
        await removeFromCart(val.product._id)

    }

    return (
        <Con>
            <div className='left flex flex-col items-start'>
                <div className='flex items-center justify-between mb-3 cursor-pointer' onClick={() => Router.push(`/product/${val.product._id}`)}>
                    <div className='img-con'>
                        <img className="" src={val.product.images[0].url} alt="img" />
                    </div>
                    <div>
                        <h2 className='p-name'>{trimmedName}</h2>
                        <p className='avail'>{`${Number(val.product.stock) >= 1 ? "In Stock" : "Out Of Stock"}`}</p>
                    </div>
                </div>
                <p className='price'>{formatPrice(currency, val.product.price)}</p>
            </div>
            <div className='right flex items-center justify-between'>
                <QuantityCon>
                    <CountBtn onClick={() => handleQuantity("reduce")} disabled={quantity < 2}>-</CountBtn>
                    <p className='count'>{quantity}</p>
                    <CountBtn onClick={() => handleQuantity("increase")}>+</CountBtn>
                </QuantityCon>
                <DelCon onClick={handleCart}>
                    <img className="mr-3" src="/images/pages/cart/trash.svg" alt="img" />
                    <p className='text'>Remove</p>
                </DelCon>
            </div>
            <div className='mob-right flex items-center justify-between'>
                <DelCon onClick={handleCart}>
                    <img className="mr-3" src="/images/pages/cart/trash.svg" alt="img" />
                    <p className='text'>Remove</p>
                </DelCon>
                <QuantityCon>
                    <CountBtn onClick={() => handleQuantity("reduce")} disabled={quantity < 2}>-</CountBtn>
                    <p className='count'>{quantity}</p>
                    <CountBtn onClick={() => handleQuantity("increase")}>+</CountBtn>
                </QuantityCon>
            </div>
        </Con>
    )
}

const Con = styled.div`
    width: 100%;
    display: flex;
    flex-wrap:wrap;  
    margin-bottom:20px;
    @media (max-width: 950px) { 
        flex-direction:column;
    }
    .left{
        width: 50%;
        @media (max-width: 950px) { 
            width: 100%;
        } 
        div{
            .img-con{
                width: 103.4px;
                height: 68.933px; 
                margin-right:10px;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .p-name{ 
            color: var(--grey-700, #101113);
            font-family: Poppins;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 24px */
        }
        .avail{ 
            color: var(--grey-700, #101113); 
            font-family: Poppins;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%; /* 21px */
        }
        .price{ 
            color: var(--grey-700, #101113);
            text-align: center; 
            font-family: Poppins;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: 150%; /* 30px */
        }
    }
    .right{
        width: 50%; 
        padding-left: 80px;
        @media (max-width: 950px) { 
            display: none;
        } 
    }
    .mob-right{
        width: 100%; 
        padding-left: 80px;
        display: none;
        margin-top:20px;
        @media (max-width: 950px) { 
            display: flex;
            padding-left:0;
        } 
    }
     

`;
const QuantityCon = styled.div` 
    display: flex;
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

const DelCon = styled.span` 
    display: flex;
    align-items: center;
    cursor: pointer;
    .text{
        color: var(--secondary-300, #FF6229);
        text-align: center; 
        font-family: Poppins;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%; /* 24px */
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

export default CartProduct