import { forwardRef } from "react";
import PropTypes from "prop-types";

// "forwardRef" es para hacer compatible con React Hook Form
const FormInputText = forwardRef(
  (
    { type, placeholder, onChange, onBlur, error, name, label, children, icon },
    ref
  ) => {
    // Si exite un error el input se realta de rojo
    const errorClassInput = error
      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500 pl-10"
      : "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pl-10";
    // Si exite un error el input se realta de rojo
    const errorClassLabel = error
      ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500 pl-1"
      : "block mb-2 text-sm font-medium text-gray-900 dark:text-white pl-1";

    return (
      <div className="mb-6 ">
        <label htmlFor="email" className={errorClassLabel}>
          {label}
        </label>

        {/* Contenedor del input con icono */}
        <div className="relative mb-6">
          {icon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              {icon}
            </div>
          )}

          {/* Input principal */}
          <input
            className={errorClassInput}
            type={type}
            placeholder={placeholder}
            ref={ref}
            onChange={onChange}
            onBlur={onBlur}
            name={name}
          />
        </div>
        {children}
      </div>
    );
  }
);
FormInputText.displayName = "FormInputText";

FormInputText.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  children: PropTypes.node,
  icon: PropTypes.node,
};

export default FormInputText;
