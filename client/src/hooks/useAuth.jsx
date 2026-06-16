import { useEffect } from "react";
import { getUser } from "../services/user.service";
import { useAuthStore } from "../stores/auth.store";

export const useAuth = () => {
  const setUsername = useAuthStore((state) => state.setUsername);
  const setEmail = useAuthStore((state) => state.setEmail);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser();
        if (user) {
          setUsername(user.username);
          setEmail(user.email);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

};
