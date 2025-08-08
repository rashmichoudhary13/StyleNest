import React, { useState } from "react";

const initialOrders = [
    {
        _id: "67540ced3376121b361a0ed0",
        user: { name: "Admin User" },
        totalPrice: 199.96,
        status: "Delivered",
    },
    {
        _id: "67540d3ca67b4a70e434e092",
        user: { name: "Admin User" },
        totalPrice: 40,
        status: "Processing",
    },
    {
        _id: "675bf2c6ca77bd83eefd7a18",
        user: { name: "Admin User" },
        totalPrice: 39.99,
        status: "Processing",
    },
    {
        _id: "675c24b09b88827304bd5cc1",
        user: { name: "Admin User" },
        totalPrice: 39.99,
        status: "Processing",
    },
];

const OrderManagement = () => {
    const [orders, setOrders] = useState(initialOrders);

    const handleStatusChange = (id, newStatus) => {
        const updated = orders.map((order) =>
            order._id === id ? { ...order, status: newStatus } : order
        );
        setOrders(updated);
    };

    return (
        <div className="max-w-7xl mx-auto mt-10 p-6 ">
            <h2 className="text-2xl font-semibold mb-6">Order Management</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
                            <th className="py-2 px-4 border-b">Order ID</th>
                            <th className="py-2 px-4 border-b">Customer</th>
                            <th className="py-2 px-4 border-b">Total Price</th>
                            <th className="py-2 px-4 border-b">Status</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <tr key={order._id} className="text-sm text-gray-700">
                                    <td className="py-2 px-4 border-b">#{order._id}</td>
                                    <td className="py-2 px-4 border-b">{order.user.name}</td>
                                    <td className="py-2 px-4 border-b">${order.totalPrice}</td>
                                    <td className="py-2 px-4 border-b">
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                                            focus:ring-blue-500 focus:border-blue-500 block p-2.5"
                                        >
                                            <option value="Processing">Processing</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Delivered">Delivered</option>
                                            <option value="Cancelled">Cancelled</option>
                                        </select>
                                    </td>
                                    <td className="py-2 px-4 border-b">
                                        <button
                                            onClick={() => handleStatusChange(order._id, "Delivered")}
                                            className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                                        >
                                            Mark as Delivered
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

export default OrderManagement;
