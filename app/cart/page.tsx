'use client'

import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/AppLayout';
import styled from 'styled-components';
import GreyBox from '@/components/GreyBox';
import CartProduct from '@/components/pages/cart/CartProduct';
import FullBlueButton from '@/components/FullBlueButton';
import { useAppSelector } from '@/redux/hooks';
import Router from 'next/router';
import { formatPrice } from '@/utils/helpers';

// Define interfaces for User and CartItem
interface Product {
  _id: string;
  price: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface User {
  cartItems: CartItem[];
}

const Cart: React.FC = () => {
  // Get user data, status, and currency from Redux state
  const { user, currency } = useAppSelector((state) => state.userReducer);

  // Calculate the total quantity of items in the cart
  const [iQuantity, setIquantity] = useState<number>(
    user?.cartItems.reduce(
      (accumulator, currentValue:any) => accumulator + currentValue.quantity,
      0,
    ) || 0
  );

  // Calculate the total price of the cart items
  const totalCartPrice = useMemo(() => {
    return user?.cartItems.reduce(
      (accumulator, currentValue:any) => accumulator + currentValue.product.price * currentValue.quantity,
      0
    );
  }, [user]);

  return (
    <AppLayout>
      <Con>
        <div className="grid-con">
          <GreyBox title={`Cart(${user?.cartItems.length || 0})`}>
            <InCartCon>
              {user?.cartItems.map((val) => (
                <CartProduct key={val.product._id} val={val} setIquantity={setIquantity} currency={currency} />
              ))}
            </InCartCon>
          </GreyBox>
          <GreyBox title="Cart Summary">
            <InSumCon>
              <div className="flex items-center justify-between mb-4">
                <p className="top-para">Items total ({iQuantity})</p>
                <p className="top-para">{formatPrice(currency, totalCartPrice || 0)}</p>
              </div>
              <div className="flex items-center justify-between mb-6">
                <p className="bot-left">Subtotal</p>
                <p className="bot-right">{formatPrice(currency, totalCartPrice || 0)}</p>
              </div>
              <FullBlueButton  >Proceed to checkout</FullBlueButton>
            </InSumCon>
          </GreyBox>
        </div>
        <Navi onClick={() => Router.push(`/products`)}>
          <img className="mr-2" src="/images/pages/cart/aleft.svg" alt="img" />
          <p>Go back and continue shopping</p>
        </Navi>
      </Con>
    </AppLayout>
  );
};

const Con = styled.div`
  width: 100%;
  padding: 24px 120px 40px 120px;
  margin-top: 98px;
  @media (max-width: 1200px) {
    padding: 24px;
  }
  .grid-con {
    width: 100%;
    display: grid;
    grid-template-columns: 70% 28%;
    column-gap: 15px;
    row-gap: 15px;
    @media (max-width: 1200px) {
      grid-template-columns: 100%;
    }
  }
`;

const InCartCon = styled.div`
  width: 100%;
  padding: 30px 20px;
  .q-para {
    color: var(--grey-600, #2a2a2e);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-bottom: 20px;
  }
  .four-grid {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr auto;
    column-gap: 10px;
    row-gap: 30px;
    align-items: center;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr 1fr;
    }
    @media (max-width: 448px) {
      grid-template-columns: 1fr;
    }
  }
`;

const InSumCon = styled.div`
  width: 100%;
  padding: 40px 20px;
  .top-para {
    color: var(--grey-700, #101113);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
  .bot-left {
    color: var(--grey-700, #101113);
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
  .bot-right {
    color: var(--grey-700, #101113);
    text-align: center;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
  }
`;

const Navi = styled.div`
  margin: 20px 0;
  display: flex;
  cursor: pointer;
  p {
    color: var(--primary-400, #295bff);
    text-align: center;
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }
`;

export default Cart;
