import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const NavItem = ({ to, children, isActiveClass, isInactiveClass }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => (isActive ? isActiveClass : isInactiveClass)}
    >
      {children}
    </NavLink>
  );
};

NavItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  isActiveClass: PropTypes.string.isRequired,
  isInactiveClass: PropTypes.string.isRequired,
};

export default NavItem;
