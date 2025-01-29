import colorsButton from "../themes/colorsButton";

// Funcion generar las clases de estilo para el boton generico
export const getButtonClasses = ({ color, variant, size, isDisabled }) => {
  // Establece el color principal del botón en función a la propiedad color
  const colorClasses = colorsButton;

  // Defina el tamaño del boton
  const sizeClasses = {
    small: "text-sm px-3 py-1.5",
    medium: "text-base px-5 py-2.5",
    large: "text-lg px-7 py-3",
    xl: "w-full px-5 py-2.5",
  };

  // Defina la variante de estilo del boton
  const variantClasses = {
    filled: colorClasses[color] || colorClasses.purple,
    outlined: `border border-${color}-700 text-${color}-700 hover:bg-${color}-100 focus:ring-${color}-300 dark:border-${color}-600 dark:text-${color}-400 dark:hover:bg-${color}-900`,
    text: `text-${color}-700 hover:underline focus:ring-${color}-300 dark:text-${color}-400`,
  };

  // Genera la clases finales para el boton
  const finalClasses = `
 ${variantClasses[variant]} 
 ${sizeClasses[size]} 
 font-medium rounded-lg 
 focus:outline-none focus:ring-4 
 ${isDisabled ? "opacity-50 cursor-not-allowed" : ""}`;

  return finalClasses;
};
