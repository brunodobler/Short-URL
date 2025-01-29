export const formValidate = () => {
  return {
    required: { value: true, message: "Campo Obligatorio" },
    patternEmail: {
      value:
        /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Formato de email incorrecto",
    },
    patternUrl: {
      value:
        /^(https?:\/\/)?([\w.-]+)(\.[a-zA-Z]{2,6})(:\d+)?(\/[\w.,/?&%=-]*)?$/,
      message: "Formato de url incorrecto",
    },
    minLength: { value: 6, message: "Minimo 6 carácteres" },
    validateTrim: {
      trim: (v) => {
        !v.trim() ? "Escribe algo" : true;
      },
    },
    validateEquals(value) {
      return {
        equals: (v) => v === value || "No coinciden las contraseñas",
      };
    },
  };
};
