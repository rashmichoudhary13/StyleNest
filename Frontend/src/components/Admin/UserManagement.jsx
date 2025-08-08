import { useState } from "react"
import React from 'react'

const UserManagement = () => {
    const users = [
        {
            _id: 123,
            name: "Mongo Doe",
            email: "hello@gmail.com",
            role: "admin",
        }
    ]

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'Customer',
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        });
        console.log("Form submitted:", formData);
    };

    const handleRoleChange = (userId, newRole) => {
        console.log({id: userId, role: newRole});
    }

    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure you want to delete this user?")) {
            console.log("delete")
        }
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h2 className="text-2xl font-semibold mb-6">User Management</h2>

            <div className="p-6 rounded-lg mb-6">
                <h3 className="text-lg font-bold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="mt-1 w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Add User
                        </button>
                    </div>
                </form>
            </div>

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
                            )) }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default UserManagement