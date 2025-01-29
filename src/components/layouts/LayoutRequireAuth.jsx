import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { UserContext } from "../../context/UserProvider";

// Contenedor que verifica si el usuario está autenticado antes de permitir el acceso a las rutas protegidas
const LayoutRequireAuth = () => {
  const { user } = useContext(UserContext);

  // Verifica si existe un usuario autenticado
  if (!user || !user.accessToken) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};

export default LayoutRequireAuth;
