import axios from 'axios';
import { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router';

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
})

const useAxiosSecure = () => {
  const auth = useAuth();
  const logout = auth?.logout;
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      console.log("Error in interceptor", error);

      if (error.status === 401 || error.status === 403) {
        console.log("Error 401/403", error);
        logout()
          .then(() => {
            console.log("Logged out");
            navigate("/login");
          })
          .catch(error => {
            console.error(error);
          });
      }

      return Promise.reject(error);
    });
  }, [])


  return axiosInstance;
};

export default useAxiosSecure;