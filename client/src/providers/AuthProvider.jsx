import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase.config";
import useAxiosSecure from "../hooks/useAxiosSecure";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const axiosInstance = useAxiosSecure();

  const signUp = ({ email, password }) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = ({ email, password }) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signInwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  }

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  }

  const authInfo = {
    user,
    loading,
    signUp,
    login,
    logout,
    signInwithGoogle,
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("Current User", currentUser);
      const user = { email: currentUser?.email };

      if (currentUser?.email) {
        axiosInstance.post("/jwt", user, { withCredentials: true })
          .then(response => {
            console.log(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      } else {
        axiosInstance.post("/logout", {}, { withCredentials: true })
          .then(response => {
            console.log(response.data);
            setLoading(false);
          })
          .catch(error => {
            console.error(error);
          });
      }

      setUser(currentUser);
    });

    return () => unSubscribe();
  }, [])

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};


AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;