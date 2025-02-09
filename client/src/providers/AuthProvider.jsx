import { createContext, useState } from "react";
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const signUp = (email, password) => {
    setLoading(true);
    console.log(email, password);
  }

  const authInfo = {
    loading,
    signUp,
  }

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