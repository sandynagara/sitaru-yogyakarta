// src/components/ProtectedRoute.js
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("authToken");
    console.log(token,"token");
    
  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now())
    
    console.log(payload);
    
    if (payload.exp && payload.exp > now) {
            console.log(payload.exp,now);

      return <Navigate to="/404" replace />;
    }

    const userRole = payload.status;
    if (allowedRoles.length > 0 && !allowedRoles.includes(userRole)) {
      return <Navigate to="/404" replace />;
    }

    return children;

  } catch (err) {
    return <Navigate to="/" replace />;
  }
}