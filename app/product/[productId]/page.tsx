'use client'
 
import React, { useState, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import styled from 'styled-components';
import Quicklinks from '@/components/Quicklinks';
import RightSide from '@/components/pages/product/RightSide';
import Tab from '@mui/material/Tab';
import { StyledTab, StyledTabs } from '@/utils/CustomStyles';
import { getOneProduct } from '@/services/product';
import { useRouter, usePathname, useParams  } from 'next/navigation'

interface Product {
  images: { url: string }[];
  description?: string;
}

interface SnackInfo {
  openSnack: boolean;
  type: string;
  message: string;
}

const OneProduct: React.FC = () => {
  const router = useRouter();
  const params = useParams()
  const { productId } = params as { productId: string };
  
  const [value, setValue] = useState<string>('one');
  const [snackInfo, setSnackInfo] = useState<SnackInfo>({ openSnack: false, type: '', message: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<Product>({ images: [] });
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedImg, setSelectedImg] = useState<string>('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getOneProduct(productId);
        setLoading(false);
        setProduct(response.product);
        setQuantity(response.cartQuantity);
        setSelectedImg(response.product.images[0]?.url || '');
      } catch (error) {
        setLoading(false);
        alert(error);
      }
    };

    if (productId) {
      fetchProducts();
    }
  }, [productId]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <AppLayout>
      <QuickLinkCon>
        <Quicklinks next="Shop products" />
      </QuickLinkCon>
      <Con>
        <div className="grid-con">
          <Left>
            <div className={`item first-item`}>
              <img src={selectedImg} alt="img" />
            </div>
            {product?.images?.map((val, index) => (
              index < 3 && (
                <div className={`item`} onClick={() => setSelectedImg(val.url)} key={index}>
                  <img src={val.url} alt="img" />
                </div>
              )
            ))}
          </Left>
          <RightSide product={product} quantity={quantity} setQuantity={setQuantity} />
        </div>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="Post Type"
          variant="scrollable"
          scrollButtons="auto"
        >
          <StyledTab value="one" label="Description" />
        </StyledTabs>
        {value === 'one' && <p className="info">{product?.description}</p>}
      </Con>
    </AppLayout>
  );
};

const Con = styled.div`
  width: 100%;
  padding: 24px 120px 40px 120px;
  @media (max-width: 1200px) {
    padding: 24px;
  }
  .grid-con {
    width: 100%;
    display: grid;
    grid-template-columns: 40% 60%;
    row-gap: 15px;
    margin-bottom: 100px;
    @media (max-width: 1200px) {
      grid-template-columns: 100%;
      margin-bottom: 40px;
    }
  }
  .info {
    color: var(--grey-500, #494A50);
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    margin-top: 40px;
  }
`;

const Left = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 9px;
  row-gap: 9px;
  .item {
    height: 122px;
    background: #f5f5f6;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .first-item {
    grid-column: 1/4;
    height: 300px;
  }
`;

const QuickLinkCon = styled.div`
  width: 100%;
  height: 56px;
  padding: 16px 120px;
  margin-top: 98px;
  background: var(--off-white, #fcfcfc);
  margin-bottom: 30px;
  @media (max-width: 1200px) {
    padding: 24px;
  }
`;

export default OneProduct;
