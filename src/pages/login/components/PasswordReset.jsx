import { useContext, useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import PropTypes from "prop-types";

import { UserContext } from "../../../context/UserProvider";
import FormInputText from "../../../components/FormInputText";
import FormError from "../../../components/FormError";
import Button from "../../../components/Button";

const PasswordReset = ({ onClose }) => {
  const { sendPasswordReset } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);

  // Función que maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordReset(email); // Función para enviar el correo de restablecimiento de contraseña
      setMessage(
        "Correo de restablecimiento enviado. Verifica tu bandeja de entrada."
      );
    } catch (error) {
      setMessage(
        "No se pudo enviar el correo electrónico de restablecimiento de contraseña"
      );
      setError();
      console.error(
        "Error al enviar correo electrónico de restablecimiento de contraseña:",
        error
      );
    }
  };

  return (
    <>
      <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Recuperar Contraseña
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Input de email */}
        <FormInputText
          type="email"
          label="Ingrese Email"
          placeholder="Ingrese Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={error}
          name="email"
          icon={
            <MdOutlineEmail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          }
        >
          {<FormError error={message} />}
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
