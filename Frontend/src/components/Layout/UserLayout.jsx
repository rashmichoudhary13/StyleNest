import React from 'react'
import Header from '../Common/Header'
import Footer from '../Common/Footer'
import { Outlet } from 'react-router-dom'

import { useUser } from "@clerk/clerk-react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../../redux/slice/authSlice";

const UserLayout = () => {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoaded && user) {
      const userData = {
        clerkUserId: user.id,
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName,
      };

      dispatch(addUser(userData));
    }
  }, [isLoaded, user, dispatch]);

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