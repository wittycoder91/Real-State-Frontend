import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authReducer";
import { getCurrentUser } from "@/service/mockAuth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      dispatch(
        loginSuccess({ userEmail: currentUser.email, userUid: currentUser.uid })
      );
    }
    setIsFetching(false);
  }, [dispatch]);

  return { user, isFetching };
};

export default useAuth;
