import { useEffect, useState } from "react";
import { getUser } from "../services/user.service";
import { useAuthStore } from "../stores/auth.store";

export const useAuth = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUser();
        if (data?.success && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { loading };
};
