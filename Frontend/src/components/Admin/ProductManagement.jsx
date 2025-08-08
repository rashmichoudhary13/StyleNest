import React from 'react';
import { Link } from 'react-router-dom';

const products = [
    { _id: "1", name: "Printed Resort Shirt", price: 29.99, sku: "PRNT-RES-004" },
    { _id: "2", name: "Chino Pants", price: 55.0, sku: "BW-005" },
    { _id: "3", name: "Cargo Pants", price: 50.0, sku: "BW-008" },
    { _id: "4", name: "Long-Sleeve Thermal Tee", price: 27.99, sku: "LST-THR-009" },
    { _id: "5", name: "Pleated Midi Skirt", price: 55.0, sku: "BW-W-004" },
    { _id: "6", name: "Graphic Print Tee", price: 30.0, sku: "TW-W-006" },
    { _id: "7", name: "Ribbed Long-Sleeve Top", price: 55.0, sku: "TW-W-007" },
    { _id: "8", name: "Slim-Fit Stretch Shirt", price: 29.99, sku: "SLIM-SH-002" },
    { _id: "9", name: "Cargo Joggers", price: 45.0, sku: "BW-002" }
];


const ProductManagement = () => {

    const handleEdit = (id) => {
        alert(`Edit product with ID: ${id}`);
    };

    const handleDelete = (id) => {
        alert(`Delete product with ID: ${id}`);
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>

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
                        {products.length > 0 ? (
                            products.map(product => (
                                <tr key={product._id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4">{product.name}</td>
                                    <td className="px-6 py-4">${product.price.toFixed(2)}</td>
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
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProductManagement;
