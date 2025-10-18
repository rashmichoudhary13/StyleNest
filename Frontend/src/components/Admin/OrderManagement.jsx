import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slice/adminOrderSlice";
import { useSession } from "@clerk/clerk-react";
import { FaRupeeSign } from "react-icons/fa";

const OrderManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { session } = useSession();

    const { user } = useSelector((state) => state.auth);
    const { orders, loading, error } = useSelector((state) => state.adminOrders);

    useEffect(() => {
        const getOrders = async () => {
            const token = await session.getToken();

            if(!user || user.role !== "admin"){
                navigate("/");
            } else {
                dispatch(fetchAllOrders(token));
            }
        }
        getOrders();
    },[dispatch, user, navigate]);

    const handleStatusChange = async (id, newStatus) => {
        const token = await session.getToken();
        dispatch(updateOrderStatus({id, status: newStatus, token}))
    };

    if (loading) return <p> Loading... </p>
    if (error) return <p> Error: {error} </p>

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
                                    <td className="py-2 px-4 border-b"><FaRupeeSign className="inline text-gray-700" />{order.totalPrice.toFixed(2)}</td>
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
