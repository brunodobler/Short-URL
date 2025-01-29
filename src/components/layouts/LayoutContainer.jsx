import { Outlet } from "react-router-dom";

// Contenedor principal de la Aplicación
const LayoutContainer = () => {
  return (
    <div className="w-96 mx-auto mt-10"> 
    <Outlet />
    </div>
  );
}

export default LayoutContainer;
