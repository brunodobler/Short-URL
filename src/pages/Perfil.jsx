import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { MdOutlineEmail } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { AiOutlineMail } from "react-icons/ai";

import FormInputText from "../components/FormInputText";
import Button from "../components/Button";
import { UserContext } from "../context/UserProvider";
import FormError from "../components/FormError";
import { errorsFirebase } from "../utils/errorsFirebase";
import { formValidate } from "../utils/formValidate";
import Title from "../components/Title";
import { reauthenticateUser, updateUserEmail } from "../helpers/auth.helpers";
import CustomAlert from "../components/CustomAlert";
import { isMobile } from "../utils/isMobile";

const Perfil = () => {
  // Traemos el usuario actual y la función para enviar el correo de restablecimiento de contraseña
  const { user, sendPasswordReset } = useContext(UserContext);
  // Hook de useForm para gestionar el estado del formulario y la validación
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm();
  // Validaciones personalizadas para los campos del formulario
  const { required, patternEmail } = formValidate();
  const [loading, setLoading] = useState(false);
  const isMobileDevice = isMobile();

  // Prellenar el campo del email si ya existe un usuario autenticado
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
  }, [user, setValue]);

  // Función para actualizar el email del usuario
  const onSubmit = async ({ email, currentPassword }) => {
    setLoading(true);

    try {
      // Reautenticamos al usuario con la contraseña actual
      await reauthenticateUser(currentPassword);

      if (email && email !== user.email) {
        await updateUserEmail(email); // Actualizamos el email del usuario
        CustomAlert({
          title: "Éxito",
          message:
            " Te hemos enviado un correo de verificación. Por favor verifica tu nuevo correo",
          icon: "success",
          timerProgressBar: true,
        });
      } else {
        CustomAlert({
          title: "Error",
          message: " Por favor ingrese otro corro disinto...",
          icon: "error",
          timerProgressBar: true,
        });
      }
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    } finally {
      setLoading(false);
    }
  };

  // Función para el restablecimiento de la contraseña del usuario
  const handleResetPassword = async ({ currentPassword }) => {
    setLoading(true);
    try {
      // Reautenticamos al usuario con la contraseña actual
      await reauthenticateUser(currentPassword);

      // Enviamos un correo para restablecer la contraseña
      await sendPasswordReset(user.email);
      CustomAlert({
        title: "Éxito",
        message:
          " Te hemos enviado un correo para restablecer tu contraseña. Por favor revisa tu bandeja de entrada",
        icon: "success",
        timerProgressBar: true,
      });
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      console.Error("Error: " + code + " " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={
        isMobileDevice
          ? "profile-container max-w-sm mx-auto"
          : "profile-container max-w-3xl mx-auto"
      }
    >
      <Title text="Modificar Perfil Usuario" />

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
        {/* Input de correo */}
        <FormInputText
          type="email"
          placeholder="Ingrese Email"
          {...register("email", { required, pattern: patternEmail })}
          label="Correo"
          error={errors.email ? true : false}
          icon={<MdOutlineEmail className="w-5 h-5 text-gray-500" />}
        >
          <FormError error={errors.email} />
        </FormInputText>

        {/* Botón para restablecer contraseña */}
        <div className="mt-6">
          <h3
            className={
              isMobileDevice
                ? "text-gray-600 text-sm mb-2 text-center"
                : "text-gray-600 text-sm mb-2"
            }
          >
            ¿Quieres restablecer tu contraseña? Haz clic en el botón y recibirás
            un correo.
          </h3>
          <Button
            text="Enviar correo para restablecer contraseña"
            loading={false}
            onClick={handleResetPassword}
            color="complementario4"
            icon={<AiOutlineMail className="w-5 h-5" />}
            size={isMobileDevice ? "xl" : "medium"}
          />
        </div>

        {/* Input de contraseña actual */}
        <FormInputText
          type="password"
          placeholder="Contraseña Actual"
          {...register("currentPassword", { required })}
          label="Contraseña Actual"
          error={errors.currentPassword}
          icon={<TbLockPassword className="w-5 h-5 text-gray-500" />}
        >
          <FormError error={errors.currentPassword} />
        </FormInputText>

        {/* Botón para actualizar correo */}
        <Button
          type="submit"
          text="Actualizar Correo"
          loading={loading}
          size={isMobileDevice ? "xl" : "medium"}
        />
      </form>
    </div>
  );
};

export default Perfil;
