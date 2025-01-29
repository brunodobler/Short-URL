export const errorsFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use":
      return {
        code: "email",
        message: "Usuario ya registrado",
      };
    case "auth/invalid-email":
      return {
        code: "email",
        message: "Formato email no válido",
      };
    case "auth/invalid-email-verified":
      return {
        code: "email",
        message: "El email no está verificado",
      };
    case "auth/user-not-found":
      return {
        code: "email",
        message: "Usuario no registrado",
      };
    case "auth/invalid-password":
      return {
        code: "password",
        message: "Contraseña mínimo 6 carácteres",
      };
    case "auth/wrong-password":
      return {
        code: "password",
        message: "Contraseña incorrecta",
      };
    case "auth/invalid-credential":
      return {
        code: "email",
        message: "Credenciales inválidas",
      };
    case "auth/missing-email":
      return {
        code: "email",
        message:"Ingrese un email válido"
      };
    default:
      console.log("Ocurrio un error en el server");
      return {
        code: "email",
        message: "Ocurrio un error en el server",
      };
  }
};
