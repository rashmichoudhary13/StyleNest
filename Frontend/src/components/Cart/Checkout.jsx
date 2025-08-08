import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaypalButton from './PaypalButton';

const cart = {
    products: [{
        name: "Stylish Jacket",
        size: "M",
        color: "Black",
        price: 120,
        image: "https://picsum.photos/150?random=1",
    }, {
        name: "Casual Sneakers",
        size: "42",
        color: "White",
        price: 75,
        image: "https://picsum.photos/150?random=2",
    },],
    totalPrice: 195,
};

const Checkout = () => {
    const navigate = useNavigate();

    const [CheckoutId, setCheckoutId] = useState(null);
    const [shippingAddress, setShippingAddress] = useState({
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
    });

    const handleCreateCheckout = (e) => {
        e.preventDefault();
        setCheckoutId(123)
    }

    const handlePaymentSuccess = (details) => {
        console.log("payment success")
        navigate("/order-confirmation")
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
                            value="xyz@gmail.com"
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
                            placeholder="Address"
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
                            placeholder="Address"
                            value={shippingAddress.phone}
                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                            className="w-full border rounded px-3 py-2 "
                            required
                        />
                    </div>


                    <div>
                        {!CheckoutId ? (
                            <button
                                type="submit"
                                className="w-full bg-black text-white py-3 rounded hover:bg-gray-900"
                            >
                                Continue to Payment
                            </button>
                        ) : (
                            <div>
                                {/* Paypal component   */}
                                <PaypalButton amount={100} onSuccess={handlePaymentSuccess} onError={() => alert("Payment failed.")} />
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
                            <p className='text-xl'> ${product.price?.toLocaleString()} </p>
                        </div>
                    ))}
                </div>

                <div className='flex justify-between items-center text-lg mb-4'>
                    <p>Subtotal</p>
                    <p>${cart.totalPrice?.toLocaleString()}</p>
                </div>
                <div className='flex justify-between items-center text-lg'>
                    <p> Shipping </p>
                    <p> Free </p>
                </div>
                <div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
                    <p>Total</p>
                    <p>${cart.totalPrice?.toLocaleString()} </p>
                </div>
            </div>
        </div>
    )
}

export default Checkout