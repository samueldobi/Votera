import { useLocation, useNavigate } from 'react-router-dom';

export const useRedirectAfterAuth = (fallbackPath = '/') => {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || fallbackPath;

  const redirect = () => {
    navigate(from, { replace: true });
  };

  return redirect;
};