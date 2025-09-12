import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, fetchusers, updateUser } from "../../redux/slice/adminSlice";
import { useAuth } from "@clerk/clerk-react";

const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getToken } = useAuth();

    const { user } = useSelector((state) => state.auth);
    const { users, loading, error } = useSelector((state) => state.admin);

    useEffect(() => {
        if (user && user.role !== "admin") {
            navigate("/");
        }
    }, [user, navigate]);

    useEffect(() => {
        const getAllUser = async () => {
            const token = await getToken();

            if (user && user.role === "admin") {
                dispatch(fetchusers(token));
            }
        }
        getAllUser();
    }, [dispatch, user])

    const handleRoleChange = async (userId, newRole) => {
        const token = await getToken();
        dispatch(updateUser({ id: userId, role: newRole, token }))
    }

    const handleDeleteUser = async (userId) => {
        const token = await getToken();
        if (window.confirm("Are you sure you want to delete this user?")) {
            dispatch(deleteUser({ id: userId, token }));
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">User List</h2>
            {loading && <p> Loading... </p>}
            {error && <p> Error: {error} </p>}

            {/* User List management  */}
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <table className='min-w-full text-left text-gray-500'>
                    <thead className='bg-gray-100 text-xs uppercase text-gray-700'>
                        <tr>
                            <th className='py-3 px-4'> Name </th>
                            <th className='py-3 px-4'> Email </th>
                            <th className='py-3 px-4'> Role </th>
                            <th className='py-3 px-4'> Actions </th>
                        </tr>
                    </thead>


                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className='border-b hover:bg-gray-50 cursor-pointer'>
                                <td className='p-4 font-medium text-gray-900 whitespace-nowrap'> {user.name} </td>
                                <td className='p-4'> {user.email} </td>
                                <td className='p-4'>
                                    <select value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="p-2 border rounded">
                                        <option value="customer"> Customer </option>
                                        <option value="admin"> Admin </option>
                                    </select>
                                </td>
                                <td className='p-4'>
                                    <button onClick={() => handleDeleteUser(user._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement