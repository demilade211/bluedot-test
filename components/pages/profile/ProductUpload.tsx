import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import AuthInput from '../../form/AuthInput';
import MySelect from '../../form/MySelect';
import MyTextArea from '../../form/MyTextArea';
import AuthButton from '../../form/AuthButton';
import MyUpload from '../../form/MyUpload';
import { uploadProduct, getCategories } from '../../../services/product';
import MySnackBar from '../../MySnackBar';
import catchErrors from '../../../utils/catchErrors';

interface Product {
  name: string;
  price: string;
  inStock: string;
  description: string;
}

interface CategoryOption {
  label: string;
  value: string;
  subCategories?: string[];
}

interface SnackInfo {
  openSnack: boolean;
  type: string;
  message: string;
}

const ProductUpload: React.FC = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [swich, setSwich] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackInfo, setSnackInfo] = useState<SnackInfo>({ openSnack: false, type: '', message: '' });
  const [product, setProduct] = useState<Product>({
    name: '',
    price: '',
    inStock: '',
    description: '',
  });
  const [category, setCategory] = useState<CategoryOption>({ label: '', value: '' });
  const [subCategory, setSubCategory] = useState<CategoryOption>({ label: '', value: '' });
  const [subCategories, setSubCategories] = useState<CategoryOption[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response2 = await getCategories();
      setLoading(false);
      setCategories(response2.data.map((val: any) => ({ label: val.name, value: val.name, subCategories: val.subcategories })));
    } catch (error) {
      setLoading(false);
      console.error(error);
      // Handle error
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleCat = (selectedCategory: CategoryOption) => {
    setCategory(selectedCategory);
    const cate = categories?.filter(val => val.value === selectedCategory.value);
    if (cate.length > 0) {
      setSubCategories(cate[0].subCategories!.map(val => ({ label: val, value: val })));
    }
    setSubCategory({ value: '', label: '' });
  };

  const handleSubCat = (selectedSubCategory: CategoryOption) => {
    setSubCategory(selectedSubCategory);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles([...selectedFiles, ...Array.from(e.target.files!)]);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('stock', product.inStock);
    formData.append('category', category.value);
    formData.append('subCategory', subCategory.value);
    formData.append('price', product.price);
    formData.append('description', product.description);

    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append(`image${i + 1}`, selectedFiles[i]);
    }

    setButtonDisabled(true);
    setLoading(true);

    try {
      const response = await uploadProduct(formData);
      setLoading(false);
      setButtonDisabled(false);
      const { success, message } = response;
      if (success) {
        setSnackInfo({ openSnack: true, type: 'success', message: 'Product Upload Successful' });
        setProduct({
          name: '',
          price: '',
          inStock: '',
          description: '',
        });
        setSelectedFiles([]);
        setCategory({ value: '', label: '' });
        setSubCategory({ value: '', label: '' });
      } else {
        setSnackInfo({ openSnack: true, type: 'warning', message });
      }
    } catch (error) {
      setLoading(false);
      setButtonDisabled(false);
      setSnackInfo({ openSnack: true, type: 'error', message: catchErrors(error) });
    }
  };

  return (
    <Con>
      <MySnackBar setSnackInfo={setSnackInfo} snackInfo={snackInfo} />
      <div className="grid-con">
        <AuthInput label="Product name" type="text" classs="first-item" onChange={handleChange} name="name" value={product.name} />
        <MySelect label="Category" options={categories} big={true} onChange={handleCat} value={category} />
        <MySelect label="Sub Category" options={subCategories} big={true} onChange={handleSubCat} isDisabled={category.value === ''} value={subCategory} />
        <AuthInput label="In stock" type="number" onChange={handleChange} name="inStock" value={product.inStock} />
        <AuthInput label="Price(NGN)" type="number" onChange={handleChange} name="price" value={product.price} />
        <MyTextArea label="Description" classs="first-item" onChange={handleChange} name="description" value={product.description} />
        <MyUpload label="Product image" classs="first-item" inputRef={inputRef} setSelectedFiles={setSelectedFiles} selectedFiles={selectedFiles} onChange={handleFileChange} />
        <div className="w-full flex justify-end first-item">
          <div className="w-full md:w-1/4">
            <AuthButton disabled={buttonDisabled} content={`${loading ? 'Uploading...' : 'Upload Product'}`} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </Con>
  );
};

const Con = styled.div`
  width: 100%;   
  display: flex;
  flex-direction: column;
  align-items: center;
  .grid-con {
    width: 100%;
    display: grid;
    grid-template-columns: 69% 30%;
    column-gap: 10px;
    margin-top: 30px;
    @media (max-width: 1200px) {
      grid-template-columns: 100%;
    }
    .first-item {
      grid-column: 1 / 3;
      @media (max-width: 1200px) {
        grid-column: 1 / 2;
      }
    }
  }
`;

export default ProductUpload;
