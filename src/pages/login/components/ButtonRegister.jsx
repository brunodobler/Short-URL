import { NavLink } from "react-router-dom";

const ButtonRegister = () => {
  return (
    <div className="text-sm font-medium text-gray-500 dark:text-gray-300 mt-4">
      No estas registrado?
      <NavLink
        to="/register"
        className="text-blue-700 hover:underline dark:text-blue-500"
      >
        Crear una cuenta
      </NavLink>
    </div>
  );
};

export default ButtonRegister;
