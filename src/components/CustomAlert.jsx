import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CustomAlert = ({ title, message, icon, timer = 2000, ...props }) => {
  Swal.fire({
    title,
    text: message,
    icon,
    timer: timer,
    ...props,
  });
};

CustomAlert.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  icon: PropTypes.oneOf(["success", "error", "warning", "info", "question"]),
  timer: PropTypes.number,
};

export default CustomAlert;
