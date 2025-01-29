import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updateEmail,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

// Reautenticar al usuario
export const reauthenticateUser = async (currentPassword) => {
  const user = auth.currentUser; // Obtenemos el usuario actual
  if (!user) throw new Error("No hay un usuario autenticado");

  const credential = EmailAuthProvider.credential(user.email, currentPassword); // Creamos las credenciales de reautenticación

  try {
    await reauthenticateWithCredential(user, credential); // Funcion de reautenticación de Firebase
    console.log("Reautenticación exitosa");
  } catch (error) {
    console.error("Error en la reautenticación:", error.message);
    throw error;
  }
};

// Actualizar el correo del usuario
export const updateUserEmail = async (nuevoEmail) => {
  const user = auth.currentUser; // Obtenemos el usuario actual
  if (!user) throw new Error("No hay un usuario autenticado");

  try {
    await updateEmail(user, nuevoEmail); // Función de Firebase que actualiza el correo
    await sendVerificationEmail(user); // Función para envíar un correo de verificación
    console.log("Correo actualizado con éxito");
  } catch (error) {
    console.error("Error al actualizar el correo:", error.message);
    throw error;
  }
};

// Enviar un correo de verificación
export const sendVerificationEmail = async (user) => {
  try {
    await sendEmailVerification(user); // Función de Firebase que envía un correo de verificación
    console.log("Correo enviado con éxito");
  } catch (error) {
    console.error("Error al verificar el correo:", error.message);
    throw error;
  }
};
