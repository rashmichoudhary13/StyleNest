import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSession } from "@clerk/clerk-react";
import axios from 'axios';
import { createProduct } from '../../redux/slice/adminProductSlice';
import { toast } from 'sonner';

const AddProductPage = () => {
  const dispatch = useDispatch();
  const { session } = useSession();
  const { loading, error } = useSelector((state) => state.adminProducts)

  const initialProductData = {
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
    images: [],
  };

  const [productData, setProductData] = useState(initialProductData);

  const [uploading, setUploading] = useState(false); // Image uploaidng state

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

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.log("Error in updating product: ", error)
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const token = await session.getToken();
    await dispatch(createProduct({ productData, token })).unwrap();
    toast.success("Product successfully added!");
    setProductData(initialProductData);
  } catch (err) {
    console.error("Create product error:", err);
    toast.error("Failed to add product");
  }
};


  if (loading) return <p> Loading... </p>
  if (error) return <p> Error: {error} </p>

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6">Add Product</h2>
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
          <label className="block font-semibold">category</label>
          <select
            name="category"
            className="w-full border px-3 py-2 mt-1 rounded"
            value={productData.category}
            onChange={handleChange} >
            <option value=""> -- Select -- </option>
            <option value="Top Wear"> Top Wear </option>
            <option value="Bottom Wear"> Bottom Wear</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">brand</label>
          <input
            name="brand"
            value={productData.brand}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">collection</label>
          <input
            name="collections"
            value={productData.collections}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-semibold">material</label>
          <select
            name="material"
            value={productData.material}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded" >
            <option value=""> -- Select -- </option>
            <option value="Cotton"> Cotton </option>
            <option value="Wool"> Wool </option>
            <option value="Denim"> Denim </option>
            <option value="Polyester"> Polyester </option>
            <option value="Silk"> Silk </option>
            <option value="Linen"> Linen </option>
            <option value="Viscose"> Viscose </option>
            <option value="Fleece"> Fleece </option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">gender</label>
          <select
            name="gender"
            value={productData.gender}
            onChange={handleChange}
            className="w-full border px-3 py-2 mt-1 rounded" >
            <option value=""> -- Select -- </option>
            <option value="Men"> Men </option>
            <option value="Women"> Women </option>
          </select>
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
          {uploading && <p> Uploading image... </p>}
          <div className='flex gap-4 mt-4'>
            {productData.images.map((image, index) => (
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
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProductPage;

