import { useState, useEffect } from 'react';
import axios from 'axios';



 const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const res = await axios.get(`${apiUrl}/getuser`, {
          headers: { 
            Authorization: `Bearer ${token}`
          },
           withCredentials: true
        });
        if (res.data.success) {
          setCurrentUser(res.data.user.username);
          setCurrentUserEmail(res.data.user.email);
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

  return {currentUser, currentUserEmail}; 
};
export default useCurrentUser