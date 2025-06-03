import React from 'react'
import { useState, useEffect } from 'react';
import axios from "axios";

const useCurrentUser = () => {
    // API URL FOR BACKEND CALLS
    const apiUrl = import.meta.env.VITE_API_URL;
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`${apiUrl}/getuser`, {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    console.log(user)
                    setUser(response.data.user);
                } else {
                    setUser(null);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);
    
  return (
   { user, loading }
  )
}

export default useCurrentUser