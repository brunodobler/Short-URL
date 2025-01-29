import { useContext } from "react";
import { MdOutlineEmail } from "react-icons/md";
import PropTypes from "prop-types";

import { UserContext } from "../../../context/UserProvider";
import FormInputText from "../../../components/FormInputText";
import FormError from "../../../components/FormError";
import Button from "../../../components/Button";
import CustomAlert from "../../../components/CustomAlert";
import { errorsFirebase } from "../../../utils/errorsFirebase";
import { useForm } from "react-hook-form";
import { formValidate } from "../../../utils/formValidate";

const PasswordReset = ({ onClose }) => {
  const { sendPasswordReset } = useContext(UserContext);
  // Hook de useForm para gestionar el estado del formulario y la validación
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  // Validaciones personalizadas para los campos del formulario
  const { required, patternEmail } = formValidate();

  // Función que maneja el envío del formulario
  const onSubmit = async ({ email }) => {
    try {
      await sendPasswordReset(email); // Función para enviar el correo de restablecimiento de contraseña
      CustomAlert({
        title: "Éxito",
        message:
          "Correo de restablecimiento enviado. Verifica tu bandeja de entrada.",
        icon: "success",
        timerProgressBar: true,
      });
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  return (
    <>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Recuperar Contraseña
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input de email */}
        <FormInputText
          type="email"
          label="Ingrese Email"
          placeholder="Ingrese Email"
          {...register("email", { required, pattern: patternEmail })}
          error={errors.email ? true : false}
          name="email"
          icon={
            <MdOutlineEmail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          }
        >
          {<FormError error={errors.email} />}
        </FormInputText>
        <div className="flex justify-between">
          {/* Botón para enviar el correo de restablecimiento */}
          <Button type="submit" color="principal" text="Enviar Correo" />
          {/* Botón para cerrar el formulario y volver al login */}
          <Button
            type="button"
            color="principal"
            variant="outlined"
            text="Volver"
            onClick={onClose}
          />
        </div>
      </form>
    </>
  );
};

PasswordReset.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default PasswordReset;
