import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import { fetchProductDetails } from '../../redux/slice/productSlice';
import { updateProduct } from '../../redux/slice/adminProductSlice';

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getToken } = useAuth();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector((state) => state.products)

  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: 0,
    countInStock: 0,
    sku: '',
    category: '',
    brand: '',
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [ ],
  });

  const [uploading, setUploading] = useState(false); // Image uploaidng state

  useEffect(() => {
    if(id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id])

  useEffect(() => {
    if(selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try{
      setUploading(true);
      const {data} = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, {url: data.imageUrl, altText: ""}],
      }));
      setUploading(false);
    } catch (error) {
      console.log("Error in updating product: ", error)
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    dispatch(updateProduct({id, productData, token}));
    navigate("/admin/products");
  };

  if (loading) return <p> Loading... </p>
  if (error) return <p> Error: {error} </p>

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block font-semibold">Product Name</label>
          <input
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={5}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Price</label>
          <input
            name="price"
            type="number"
            value={productData.price}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Count in Stock</label>
          <input
            name="countInStock"
            type="number"
            value={productData.countInStock}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">SKU</label>
          <input
            name="sku"
            type='text'
            value={productData.sku}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">Sizes (comma-separated)</label>
          <input
            name="sizes"
            type='text'
            value={productData.sizes.join(",")}
            onChange={(e) =>  
                setProductData({
                ...productData, 
                sizes: e.target.value.split(",").map((size) => size.trim()),
            })}
            className="w-full border px-3 py-2 mt-1 rounded"
            placeholder="e.g. S, M, L, XL"
          />
        </div>

        <div>
          <label className="block font-semibold">Colors (comma-separated)</label>
          <input
            name="colors"
            value={productData.colors.join(",")}
            onChange={(e) =>  
                setProductData({
                ...productData, 
                colors: e.target.value.split(",").map((color) => color.trim()),
            })}
            className="w-full border px-3 py-2 mt-1 rounded"
            placeholder="e.g. Red, Blue, Yellow"
          />
        </div>

        {/* Image Upload  */}
        <div>
          <label className="block font-semibold">Upload Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="mt-1"
          />
          { uploading && <p> Uploading image... </p>}
          <div className='flex gap-4 mt-4'>
            {productData.images.map((image,index) => (
                <div key={index}>
                    <img src={image.url} alt={image.altText || "Product Image"}
                    className='w-20 h-20 object-cover rounded-md shadow-md' />
                </div>
            ))

            }
          </div>
      
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;

