import { useState, useEffect } from 'react';
import axios from 'axios';



 const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchUser = async () => {
      try {
        // console.log("About to fetch /getuser");
        const token = localStorage.getItem('userToken');
        const res = await axios.get(`${apiUrl}/getuser`, {
          headers: { 
            Authorization: `Bearer ${token}`
          },
           withCredentials: true
        });
        if (res.data.success) {
          setCurrentUser(res.data.user.username);
          console.log('it worked')
        } else {
          setCurrentUser(null);
        }
      } catch (err) {
        console.error('Fetch user error:', err);
        setCurrentUser(null);
      } 
    };

    fetchUser();
  }, []);

  return currentUser; // Very Important 
};
export default useCurrentUser