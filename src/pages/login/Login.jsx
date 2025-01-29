import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

import { UserContext } from "../../context/UserProvider";
import { errorsFirebase } from "../../utils/errorsFirebase";
import FormError from "../../components/FormError";
import FormInputText from "../../components/FormInputText";
import { formValidate } from "../../utils/formValidate";
import Title from "../../components/Title";
import Button from "../../components/Button";
import PasswordReset from "./components/PasswordReset";
import ButtonGoogle from "./components/ButtonGoogle";
import ButtonPasswordReset from "./components/ButtonPasswordReset";
import ButtonRegister from "./components/ButtonRegister";

const Login = () => {
  const { loginUser, loginWithGoogle } = useContext(UserContext);
  const navegate = useNavigate();
  // Validaciones personalizadas para los campos del formulario
  const { required, patternEmail, minLength, validateTrim } = formValidate();
  // Hook de useForm para gestionar el estado del formulario y la validación
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  // Estado para manejar la visibilidad del formulario de restablecimiento de contraseña
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  // Funciones para mostrar u ocultar el formulario de restablecimiento
  const handleOpenPasswordReset = () => setShowPasswordReset(true);
  const handleClosePasswordReset = () => setShowPasswordReset(false);

  // Enviar el formulario para hacer login
  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await loginUser(email, password); // Llama a la función para loguearse
      navegate("/"); // Redirige al usuario logueado a la página del Home
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  // Función para hacer login con Google
  const onSubmitGoogle = async () => {
    try {
      setLoading(true);

      await loginWithGoogle(); // Se llama a la función de login con Google
      navegate("/"); // Redirige al usuario logueado a la página del Home
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-screen-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      {showPasswordReset ? (
        <PasswordReset onClose={handleClosePasswordReset} />
      ) : (
        <>
          <Title text="Login" />
          <FormError error={errors.firebase} />
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Input de email */}
            <FormInputText
              type="email"
              label="Ingrese Email"
              placeholder="Ingrese Email"
              {...register("email", {
                required,
                pattern: patternEmail,
              })}
              error={errors.email ? true : false}
              icon={
                <MdOutlineEmail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              }
            >
              <FormError error={errors.email} />
            </FormInputText>

            {/* Input de contraseña */}
            <FormInputText
              type="password"
              label="Ingrese Contraseña"
              placeholder="Ingrese Contraseña"
              {...register("password", {
                minLength,
                validate: validateTrim,
              })}
              error={errors.password}
              icon={
                <TbLockPassword className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              }
            >
              <FormError error={errors.password} />
            </FormInputText>
            {/* Botón para el restablecimiento de contraseña*/}
            <ButtonPasswordReset
              handleOpenPasswordReset={handleOpenPasswordReset}
            />
            {/* Botón para enviar el formulario */}
            <div className="flex justify-center">
              <Button
                color="principal"
                size="medium"
                type="submit"
                text="Acceder"
                loading={loading}
              />
            </div>

            <span className="flex justify-center mt-2 text-sm font-medium text-gray-500 dark:text-gray-300">
              o iniciar sesión con
            </span>
            {/* Botón para iniciar sesión con Google */}
            <ButtonGoogle onSubmitGoogle={onSubmitGoogle} />
            {/* Botón para registrarse */}
            <ButtonRegister />
          </form>
        </>
      )}
    </div>
  );
};

export default Login;
