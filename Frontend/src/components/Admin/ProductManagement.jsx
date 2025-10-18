import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from "@clerk/clerk-react";
import { deleteProduct, fetchAdminProducts } from '../../redux/slice/adminProductSlice';
import { useDispatch, useSelector } from 'react-redux';
import { FaRupeeSign } from "react-icons/fa";

const ProductManagement = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.adminProducts)
    const { session } = useSession();
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            const token = await session.getToken();
            dispatch(fetchAdminProducts(token))
        }
        getProducts();
    }, [dispatch]);

    const handleDelete = async (id) => {
        const token = await session.getToken();
        if (window.confirm("Are you sure you want to delete the Product?")) {
            dispatch(deleteProduct({ id, token }))
        }
    };

    const filterProducts = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.sku.toLowerCase().includes(search.toLowerCase())
    )

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error} </p>

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className='flex justify-between'>
                <h2 className="text-2xl font-bold mb-6">Product Management</h2>

                {/* Search Bar  */}
                <div className='relative w-1/2'>
                    <input type="text"
                        placeholder='Search'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className='bg-gray-100  py-2 rounded-lg pl-2 pr-12 focus:outline-none w-full placeholder:text-gray-700' />
                </div>
            </div>


            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full table-auto">
                    <thead className="bg-gray-100 text-left text-sm font-semibold uppercase tracking-wider">
                        <tr>
                            <th className="px-6 py-3">Name</th>
                            <th className="px-6 py-3">Price</th>
                            <th className="px-6 py-3">SKU</th>
                            <th className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm divide-y">
                        {
                            search != null ?
                                filterProducts.length > 0 ? (
                                    filterProducts.map(product => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4"><FaRupeeSign className="inline text-gray-700" />{product.price.toFixed(2)}</td>
                                            <td className="px-6 py-4">{product.sku}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <Link
                                                    to={`/admin/products/${product._id}/edit`}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))

                                ) : (
                                     <tr>
                                        <td colSpan={4} className='p-4 text-center text-gray-500'>
                                            No Products found.
                                        </td>
                                    </tr>
                                )
                                : products.length > 0 ? (
                                    products.map(product => (
                                        <tr key={product._id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4">{product.name}</td>
                                            <td className="px-6 py-4"><FaRupeeSign className="inline text-gray-700" />{product.price.toFixed(2)}</td>
                                            <td className="px-6 py-4">{product.sku}</td>
                                            <td className="px-6 py-4 space-x-2">
                                                <Link
                                                    to={`/admin/products/${product._id}/edit`}
                                                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                                                >
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(product._id)}
                                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))) : (
                                    <tr>
                                        <td colSpan={4} className='p-4 text-center text-gray-500'>
                                            No Products found.
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
