import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null); // null: loading, false: not authorized, true: authorized

  useEffect(() => {
    const checkAuthorization = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/users/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include"
        });

        if (response.ok) {
          setIsAuthorized(true);
          const data = await response.json();
          console.log("User profile:", data);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        console.error("Error during authorization:", error);
        setIsAuthorized(false);
      }
    };

    checkAuthorization();
  }, []);

  if (isAuthorized === null) {
    // Tampilkan loader atau indikator sementara menunggu hasil otorisasi
    return <div>Loading...</div>;
  }

  return isAuthorized ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
