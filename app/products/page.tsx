'use client'

import React, { useEffect, useState } from 'react';
import AppLayout from '@/layouts/AppLayout';
import styled from "styled-components";
import MySelect from '@/components/form/MySelect';
import ProductCard from '@/components/ProductCard';
import Quicklinks from '@/components/Quicklinks';
import MySnackBar from '@/components/MySnackBar';
import { getAllProduct, getCategories } from "@/services/product";
import ContentLoader from '@/components/loaders/ContentLoader';
import { useRouter, useSearchParams } from 'next/navigation'
import Pagination from '@mui/material/Pagination';


interface Category {
    name: string;
    subcategories: string[];
}

interface SnackInfo {
    openSnack: boolean;
    type: 'success' | 'error' | 'warning' | 'info';
    message: string;
}

const Products: React.FC = () => {
    const router = useRouter();

    const searchParams = useSearchParams()

    const keyword = searchParams.get('keyword')

    const [snackInfo, setSnackInfo] = useState<SnackInfo>({ openSnack: false, type: "info", message: "" });
    const [loading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState<string>("");
    const [subCategory, setSubCategory] = useState<string>("");
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);

    useEffect(() => {
        fetchProducts();
    }, [keyword, category, subCategory, currentPage]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await getAllProduct(keyword as string||"", currentPage, category);
            const response2 = await getCategories();
            setLoading(false);
            setProducts(response.products);
            setTotalPages(category ? response.filteredProductCount : response.productsCount);
            setCategories(response2.data);
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    };

    const handleOnChange = (searchData: string) => {
        setCategory(searchData);
    };

    const handlePageChange = (event: React.ChangeEvent<unknown>, pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    return (
        <AppLayout>
            <QuickLinkCon>
                <Quicklinks next="All categories" />
            </QuickLinkCon>
            <Con>
                <MySnackBar setSnackInfo={setSnackInfo} snackInfo={snackInfo} />
                <div className='w-full flex items-center justify-between'>
                    <h1 className='p-head'>All categories</h1>
                </div>
                <div className='grid-con'>
                    <Left>
                        <div className='cat mb-5'>
                            <p className={`${"" === category && "active"}`} onClick={() => handleOnChange("")}>All</p>
                        </div>
                        {categories?.map((cat, index) => (
                            <div key={index} className='cat mb-5'>
                                <p className={`${cat.name === category && "active"}`} onClick={() => handleOnChange(cat.name)}>{cat.name}</p>
                                {cat.name === category && (
                                    <div className="sub-categories">
                                        {cat.subcategories.map((subcat, idx) => (
                                            <p key={idx} className={`sub-category ml-3 my-2 ${subcat === subCategory && "active"}`} onClick={() => setSubCategory(subcat)}>{subcat}</p>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </Left>
                    <Right>
                        {loading ? <div className='no-data'><ContentLoader /></div> :
                            products.length === 0 ?
                                <div className='no-data flex justify-center items-center'><p>No Result Found</p></div>
                                :
                                <>
                                    {products.map((val, index) => <ProductCard key={index} setSnackInfo={setSnackInfo} product={val} />)}
                                </>
                        }
                    </Right>
                </div>
                <div className='pag-con flex justify-center w-full mt-6'>
                    <Pagination count={totalPages % 2 === 0 ? Math.round(totalPages / 6) : Math.round(totalPages / 6) + 1} color="primary" onChange={handlePageChange} />
                </div>
            </Con>
        </AppLayout>
    );
};

const Con = styled.div`
    width: 100%; 
    min-height: 50vh;
    padding: 24px 120px 40px 120px;  
    @media (max-width: 1200px) { 
        padding: 24px;
    }
    .p-head{
        color: var(--grey-700, #101113); 
        font-family: Poppins;
        font-size: 24px;
        font-style: normal;
        font-weight: 500;
        line-height: 140%; /* 33.6px */
        margin-bottom:30px;
    }
    .grid-con{
        width: 100%;
        display: grid;
        grid-template-columns:30% 70%;
        column-gap:15px;
        row-gap:10px;
        @media (max-width: 1200px) { 
            grid-template-columns: 100%;
        }
    } 
`;

const QuickLinkCon = styled.div`
    width: 100%; 
    height: 56px;
    padding: 16px 120px;
    margin-top: 98px; 
    background: var(--off-white, #FCFCFC);
    margin-bottom:30px;
    @media (max-width: 1200px) { 
        padding: 24px;
    }
`;

const Left = styled.div`
    width: 100%; 
    height  :100vh ;
    overflow-y:scroll;
    padding: 30px;
    @media (max-width: 1200px) { 
        display: none;
    }
    div{
        cursor: pointer;
        p{
            color: var(--grey-700, #101113);
            font-family: Poppins;
            font-size: 16px;
            font-style: normal;
            font-weight: 400;
            line-height: 150%; /* 24px */
        }
        .active{
            color: #295BFF;
        }
    }
`;

const Right = styled.div`
    width: 100%;   
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 500px 500px 500px;
    column-gap:10px;
    row-gap: 20px;
    justify-content:center;  
    @media (max-width: 700px) { 
      grid-template-columns: 1fr 1fr ;
      column-gap:5px;
    }
    @media (max-width: 450px) { 
      grid-template-columns: 90% ; 
      grid-template-rows: auto auto auto;
    }
    .no-data{ 
        width: 100%;
        height:100%;
        grid-column:1/4;
    }
`;

export default Products;
