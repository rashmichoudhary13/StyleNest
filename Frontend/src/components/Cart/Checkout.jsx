import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton';
import { useUser } from "@clerk/clerk-react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "@clerk/clerk-react";
import axios from 'axios';
import { createCheckoutSession } from "../../redux/slice/checkoutSlice"
import { FaRupeeSign } from "react-icons/fa";

const Checkout = () => {
    const { user } = useUser();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cart, loading, error } = useSelector((state) => state.cart);
    const { getToken } = useAuth()
    console.log("checkout cart: ", cart)

    const [checkoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    useEffect(() => {
        if (!cart || !cart.products || cart.products.length === 0) {
            navigate("/");
        }
    }, [cart, navigate]);

    useEffect(() => {
        console.log("checkoutId in PaypalButton render:", checkoutId);
    }, [checkoutId]);

    const handleCreateCheckout = async (e) => {
        e.preventDefault();
        const token = await getToken();
        if (cart && cart.products.length > 0) {

            const res = await dispatch(
                createCheckoutSession({
                    checkoutdata: {
                        checkoutItems: cart.products,
                        shippingAddress,
                        paymentMethod: "Paypal",
                        totalPrice: cart.totalPrice,
                    },
                    token,
                })
            );
            if (res.payload && res.payload._id) {
                setCheckoutId(res.payload._id); // set Checkout id if the payment is successful
            }
        }
    };

    const handlePaymentSuccess = async (details) => {
        const token = await getToken();
        try {
            console.log("checkoutId before payment success:", checkoutId);
            const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
                { paymentStatus: "Paid", paymentDetails: details },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            await handleFinalizeCheckout(checkoutId); // Finalize checkout if payment is successful.

        } catch (error) {
            console.error(error);
        }
    }

    const handleFinalizeCheckout = async (checkoutId) => {
        const token = await getToken();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            )
            navigate("/order-confirmation");

        } catch (error) {
            console.error(error);
        }
    };

    if (loading) return <p> Loading cart ... </p>;
    if (error) return <p> Error: {error} </p>;
    if (!cart || !cart.products || cart.products.length === 0) {
        return <p> Your cart is empty. </p>;
    }

    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
            {/* Left Section  */}
            <div className='bg-white rounded-lg p-6'>
                <h2 className='text-2xl uppercase mb-6'> Checkout </h2>
                <form onSubmit={handleCreateCheckout}
                    className="max-w-xl mx-auto p-6 space-y-6 bg-white shadow-md rounded-md"
                >
                    <h3 className="text-lg mb-4">Contact Details</h3>

                    <div>
                        <label className="text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user ? user?.primaryEmailAddress.emailAddress : ""}
                            disabled
                            className="mt-2 w-full border rounded px-3 py-2"
                        />
                    </div>

                    <h3 className="text-lg mb-4">Delivery</h3>
                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="text-gray-700">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={shippingAddress.firstName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                                className="border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={shippingAddress.lastName}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                                className="border rounded px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700">Address</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Address"
                            value={shippingAddress.address}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                            className="w-full border rounded px-3 py-2 "
                            required
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mt-2">
                        <div>
                            <label className="text-gray-700">City</label>
                            <input
                                type="text"
                                name="firstName"
                                value={shippingAddress.city}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                className="border rounded px-3 py-2"
                                required
                            />
                        </div>
                        <div>
                            <label className="text-gray-700">Postal Code</label>
                            <input
                                type="text"
                                name="lastName"
                                value={shippingAddress.postalCode}
                                onChange={(e) => setShippingAddress({ ...shippingAddress, postalCode: e.target.value })}
                                className="border rounded px-3 py-2"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700">Country</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Country"
                            value={shippingAddress.country}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, country: e.target.value })}
                            className="w-full border rounded px-3 py-2 "
                            required
                        />
                    </div>

                    <div>
                        <label className="text-gray-700">Phone</label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Phone"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className="w-full border rounded px-3 py-2 "
                            required
                        />
                    </div>


                    <div>
                        {!checkoutId ? (
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
                            >
                                Continue to Payment
                            </button>
                        ) : (
                            <div>
                                Pay with Paypal...
                                {/* Paypal component   */}
                                <PaypalButton amount={Number(cart.totalPrice.toFixed(2))} onSuccess={handlePaymentSuccess} onError={() => alert("Payment failed.")} />
                            </div>
                        )}
                    </div>
                </form>
            </div>

            {/* Right Section */}
            <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg mb-4">Order Summary</h3>
                <div className="border-t py-4 mb-4">
                    {cart.products.map((product, index) => (
                        <div key={index} className="flex items-start justify-between py-2 border-b">
                            <div className="flex items-start">
                                <img src={product.image} alt={product.name} className="w-20 h-24 object-cove mr-4" />
                                <div>
                                    <h3 className='text-md'>{product.name}</h3>
                                    <p className='text-gray-500'> {product.size} </p>
                                    <p className='text-gray-500'> {product.color} </p>
                                </div>
                            </div>
                            <p className='text-xl'> <FaRupeeSign className="inline text-gray-700" />{product.price?.toLocaleString()} </p>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p><FaRupeeSign className="inline text-gray-700" />{cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p> Shipping </p>
                    <p> Free </p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p><FaRupeeSign className="inline text-gray-700" />{cart.totalPrice?.toLocaleString()} </p>
                </div>
            </div>
        </div>
    )
}

export default Checkout