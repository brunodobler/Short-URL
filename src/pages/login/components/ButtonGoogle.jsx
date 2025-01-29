import { FcGoogle } from "react-icons/fc";
import PropTypes from "prop-types";

const ButtonGoogle = ({ onSubmitGoogle }) => {
  return (
    <div className="flex justify-center mt-2 ">
      <button
        onClick={onSubmitGoogle}
        type="button"
        className="flex items-center justify-center w-full p-2 border rounded-lg hover:bg-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <FcGoogle />
        Acceder con Google
      </button>
    </div>
  );
};

ButtonGoogle.propTypes = {
  onSubmitGoogle: PropTypes.func.isRequired,
};

export default ButtonGoogle;
