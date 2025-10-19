import { useState } from 'react';
import { TbBrandMeta } from 'react-icons/tb';
import { IoLogoInstagram } from 'react-icons/io';
import { RiTwitterXLine } from 'react-icons/ri';
import { FiPhoneCall } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SubscribeEmail } from "../../redux/slice/subscribeSlice";
import { toast } from 'sonner';

const Footer = () => {
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {message, error, loading} = useSelector((state) => state.subscribe);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if(!email) return toast.error("Enter a email");
        dispatch(SubscribeEmail(email));
        setEmail("");
    }

    if(message){
        toast.success(message, { duration: 1000 });
    }

    return (
        <footer className="bg-white border-t text-gray-700 px-8 py-12">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Newsletter */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
                    <p className="text-sm mb-2">Be the first to hear about new products, exclusive events, and online offers.</p>
                    <p className="text-sm font-semibold mb-4">Sign up and get 10% off your first order.</p>
                    <form className="flex">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="border px-3 py-2 w-full rounded-l-md text-sm"
                        />
                        <button onClick={handleSubscribe} className="bg-black text-white px-4 py-2 rounded-r-md text-sm">Subscribe</button>
                    </form>
                </div>

                {/* Shop */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Shop</h3>
                    <ul className="text-sm space-y-2">
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                Men's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                Women's Top Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                Men's Bottom Wear
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                Women's Bottom Wear
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Support</h3>
                    <ul className="text-sm space-y-2">
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                Contact Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                FAQs
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className='hover:text-gray-500 transition-colors'>
                                Features
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Social + Contact */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
                    <div className="flex space-x-4 text-xl mb-4">
                        <a href="https://www.facebook.com" target="_blank" className='hover:text-gray-500'>
                        <TbBrandMeta className="cursor-pointer" />
                        </a>
                        <a href="https://www.facebook.com" target="_blank" className='hover:text-gray-500'>
                         <IoLogoInstagram className="cursor-pointer" />
                        </a>
                       
                        <a href="https://www.facebook.com" target="_blank" className='hover:text-gray-500'>
                        <RiTwitterXLine className="cursor-pointer" />
                        </a>
                    </div>
                    <p className="text-gray-500"> Call us</p>
                    <div className="flex items-center space-x-2 text-sm">
                        <FiPhoneCall />
                        <span className="font-semibold">0123-456-789</span>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="text-center text-xs text-gray-500 mt-12 border-t pt-6">
                © 2024, CompileTab. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;