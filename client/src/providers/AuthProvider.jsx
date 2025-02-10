import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import auth from "../../firebase.config";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const googleProvider = new GoogleAuthProvider();

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
      setLoading(false);
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