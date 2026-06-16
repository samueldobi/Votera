import axios from "axios";

export const getUser = async ()=>{
    try{
        const apiUrl = import.meta.env.VITE_API_URL;
        const token = localStorage.getItem('userToken');
        const response = await axios.get(`${apiUrl}/getuser`, {
          headers: { 
            Authorization: `Bearer ${token}`
          },
           withCredentials: true
        });
        return response.data;
    } catch(err){
        console.log(err)
    }
}