import PropTypes from "prop-types";

const ButtonPasswordReset = ({ handleOpenPasswordReset }) => {
  return (
    <div className="flex justify-end mb-5">
      <button
        type="button"
        className="text-xs font-medium text-gray-500 dark:text-gray-300"
        onClick={handleOpenPasswordReset}
      >
        ¿Olvidaste tu contraseña?
      </button>
    </div>
  );
};

ButtonPasswordReset.propTypes = {
  handleOpenPasswordReset: PropTypes.func.isRequired,
};

export default ButtonPasswordReset;
