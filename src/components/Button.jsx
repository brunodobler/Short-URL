import { getButtonClasses } from "../utils/ButtonClasses";
import ButtonLoading from "./ButtonLoading";
import PropTypes from "prop-types";

const Button = ({
  text,
  type = "button",
  color = "principal",
  variant = "filled",
  size = "medium",
  icon,
  iconPosition = "left",
  loading = false,
  onClick,
  disabled = false,
}) => {
  // Si el botón está en estado de carga
  const isDisabled = loading || disabled;

  // LLamada a la funcion para generar los estilos del boton
  const finalClasses = getButtonClasses({ color, variant, size, isDisabled });

  // Si el botón está en estado de carga renderiza el boton de carga
  if (loading) return <ButtonLoading finalClasses={finalClasses} />;

  return (
    <button
      type={type}
      className={finalClasses}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
    >
      <span className="flex items-center justify-center">
        {icon && iconPosition === "left" && (
          <span className="mr-2">{icon}</span>
        )}
        {text}
        {icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </span>
    </button>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
  color: PropTypes.oneOf([
    "white",
    "black",
    "delete",
    "principal",
    "complementario1",
    "complementario2",
    "complementario3",
    "complementario4",
  ]),
  variant: PropTypes.oneOf(["filled", "outlined", "text"]),
  size: PropTypes.oneOf(["small", "medium", "large", "xl"]),
  icon: PropTypes.node,
  iconPosition: PropTypes.oneOf(["left", "right"]),
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default Button;
