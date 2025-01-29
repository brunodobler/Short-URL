import NavItem from "./NavItem";
import PropTypes from "prop-types";

const DesktopMenu = ({ handleLogout }) => {
  // Estilo si está seleccionado el botón
  const activeClass =
    "block py-2 px-3 md:p-0 text-white bg-[#AB23D8] rounded md:bg-transparent md:text-[#AB23D8] md:dark:text-[#9B20C5]";
  // Estilo si esta de seleccionado el botón
  const inactiveClass =
    "block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9B20C5] md:dark:hover:text-[#9B20C5] dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700";

  return (
    <div className="hidden md:flex md:items-center md:space-x-4">
      <NavItem
        to="/"
        isActiveClass={activeClass}
        isInactiveClass={inactiveClass}
      >
        Inicio
      </NavItem>
      <NavItem
        to="/perfil"
        isActiveClass={activeClass}
        isInactiveClass={inactiveClass}
      >
        Perfil
      </NavItem>
      <button
        onClick={handleLogout}
        className="text-white bg-[#6A5670] hover:bg-[#5F4C65] focus:ring-4 focus:outline-none focus:ring-[#6A5670] font-medium rounded-lg text-sm px-4 py-2"
      >
        Logout
      </button>
    </div>
  );
};

DesktopMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default DesktopMenu;
