import { Disclosure } from "@headlessui/react";
import PropTypes from "prop-types";

import NavItem from "./NavItem";

const MobileMenu = ({ handleLogout }) => {
  // Estilo si está seleccionado el botón
  const activeClass =
    "block w-full py-2 text-center text-white bg-[#B43BDD] rounded";
  // Estilo si esta de seleccionado el botón
  const inactiveClass =
    "block w-full py-2 text-center text-gray-900 rounded hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700";

  return (
    <Disclosure.Panel className="md:hidden">
      <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-50 dark:bg-gray-800">
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
          className="block w-full text-white bg-[#6A5670] hover:bg-[#5F4C65] focus:ring-4 focus:outline-none focus:ring-[#6A5670] font-medium rounded-sm text-sm px-4 py-2 text-center"
        >
          Logout
        </button>
      </div>
    </Disclosure.Panel>
  );
};

MobileMenu.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

export default MobileMenu;
