import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

import { UserContext } from "../context/UserProvider";
import { errorsFirebase } from "../utils/errorsFirebase";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInputText from "../components/FormInputText";
import Title from "../components/Title";
import Button from "../components/Button";

const Register = () => {
  // Obtenemos la función de registro del contexto de usuario
  const { registerUser } = useContext(UserContext);
  const navegate = useNavigate();
  // Validaciones personalizadas para los campos del formulario
  const { required, patternEmail, minLength, validateTrim, validateEquals } =
    formValidate();
  // Hook de useForm para gestionar el estado del formulario y la validación
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async ({ email, password }) => {
    try {
      setLoading(true);
      await registerUser(email, password); // Intentamos registrar el nuevo usuario
      navegate("/"); // Redirigimos a la página principal en caso de éxito
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, {
        message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Función para redirigir al login en caso de que el usuario quiera volver
  const handlerClick = () => navegate("/login");

  return (
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <Title text="Registrar" />
      <FormError error={errors.firebase} />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input de email */}
        <FormInputText
          type="email"
          placeholder="Ingrese Email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })}
          label="Ingrese Email"
          error={errors.email}
          icon={
            <MdOutlineEmail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          }
        >
          <FormError error={errors.email} />
        </FormInputText>

        {/* Input de contraseña */}
        <FormInputText
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("password", {
            minLength,
            validate: validateTrim,
          })}
          label="Ingrese Contraseña"
          error={errors.password}
          icon={
            <TbLockPassword className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          }
        >
          <FormError error={errors.password} />
        </FormInputText>

        {/* Input de repetir contraseña */}
        <FormInputText
          type="password"
          placeholder="Ingrese Contraseña"
          {...register("repassword", {
            validate: validateEquals(getValues("password")),
          })}
          label="Repite tu Contraseña"
          error={errors.password}
          icon={
            <TbLockPassword className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          }
        >
          <FormError error={errors.repassword} />
        </FormInputText>

        {/* Botón para registrarse o volver a la pestaña anterior */}
        <div className="flex justify-between">
          <Button type="submit" text="Registrar" loading={loading} />
          <Button
            type="button"
            color="principal"
            variant="outlined"
            text="Volver"
            onClick={handlerClick}
          />
        </div>
      </form>
    </div>
  );
};

export default Register;
