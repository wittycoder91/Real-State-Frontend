import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess, logout } from "@/store/authReducer";
import { getCurrentUser, setCurrentUser } from "@/service/mockAuth";

export const GlobalWrapper = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check if user is already logged in from localStorage
    const currentUser = getCurrentUser();
    
    if (currentUser) {
      dispatch(loginSuccess({ 
        userEmail: currentUser.email, 
        userUid: currentUser.uid 
      }));
    } else {
      dispatch(logout());
    }
  }, [dispatch]);

  return (
    <>
      <Outlet />
      <Toaster position="top-right" />
    </>
  );
};
