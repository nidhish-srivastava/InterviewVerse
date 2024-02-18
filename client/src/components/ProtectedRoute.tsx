import { PropsWithChildren, useEffect,  useState } from "react";
import { useTrackerContext } from "../context/context";
import {  useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: PropsWithChildren<{}>) {
  const { loggedInUser, isAuthenticated } = useTrackerContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true); // Introduce loading state

  useEffect(() => {
    // Use loggedInUser data to determine isAuthenticated status
    if (loggedInUser) {
      setIsLoading(false); // Set loading state to false
    }
  }, [loggedInUser]);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate('/login', { replace: true });
    }
  }, [navigate, isLoading, isAuthenticated]);

  // Return loading indicator if still loading
  if (isLoading) {
    return null
  }

  return <>{children}</>;
}

export default ProtectedRoute;
