import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";

import { UserContext } from "../context/UserProvider";
import MobileMenu from "./navbar/MobileMenu";
import DesktopMenu from "./navbar/DesktopMenu";
import Logo from "./navbar/Logo";

const Navbar = () => {
  const { user, signOutUser } = useContext(UserContext);
  const navegate = useNavigate();

  // Metodo para cerrar sesion
  const handleLogout = async () => {
    try {
      await signOutUser();
      navegate("/login");
    } catch (error) {
      console.log(error.code);
    }
  };

  return (
    <>
      {!user ? (
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
          {/* Logo si no inicio sesion  */}
          <Logo />
        </div>
      ) : (
        <Disclosure
          as="nav"
          className="bg-white border-gray-200 dark:bg-gray-900 border-b border-gray-300 dark:border-gray-700"
        >
          {({ open }) => (
            <>
              <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between">
                <Logo />
                <div className="md:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                {/* Componente navbar para computadoras  */}
                <DesktopMenu handleLogout={handleLogout} />
              </div>
              {/* Componente navbar para celulares  */}
              <MobileMenu handleLogout={handleLogout} />
            </>
          )}
        </Disclosure>
      )}
    </>
  );
};

export default Navbar;
