import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

import { useUser, useAuth } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";
import { mergeCart } from '../../redux/slice/cartSlice';

const UserLayout = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const dispatch = useDispatch();
  const { user: authUser, guestId } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const hadGuestProductsOnLogin = useRef(false);

  useEffect(() => {
    //Sync clerk user to database
    if (isLoaded && user) {
      const userData = {
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName,
      };
      dispatch(addUser(userData));
    }
  }, [isLoaded, user, dispatch]);

  useEffect(() => {
    // When authUser becomes truthy, check if we had guest products
    if (authUser && guestId && cart?.products.length > 0) {
      hadGuestProductsOnLogin.current = true;
    }
  }, [authUser]);

  useEffect(() => {
    // Merge guest cart after login
    const cartMerge = async () => {
      console.log("userlayout guestid: ", guestId)
      if (hadGuestProductsOnLogin.current && authUser && guestId) {
        const token = await getToken();
        console.log("userLayout token: ", token);
        dispatch(mergeCart({ guestId, token }));

        hadGuestProductsOnLogin.current = false;
        localStorage.removeItem("guestId");
      }
    };
    cartMerge();
  }, [authUser, guestId, getToken, dispatch]);

  return (
    <div>
      {/* Header  */}
      <Header />
      {/* Main Content  */}
      <main>
        <Outlet />
      </main>
      {/* Footer  */}
      <Footer />
    </div>
  )
}

export default UserLayout