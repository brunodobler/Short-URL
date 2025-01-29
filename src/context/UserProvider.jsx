import { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

import { userAdapter } from "../adapters/user.adapters";

export const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState(false);

  // Permite escuchar los cambios en el estado de autenticación, como cuando un usuario inicia o cierra sesión
  useEffect(() => {
    // onAuthStateChanged funcion de Firebase para ver si el estado de autenticación cambio
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(userAdapter(user));
      } else {
        setUser(null);
      }
    });
    return () => unsuscribe();
  }, []);

  // Crea un nuevo usuario con correo electrónico y contraseña, funcion de Firebase
  const registerUser = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // Inicia sesión de un usuario con correo electrónico y contraseña, funcion de Firebase
  const loginUser = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  // Cierra la sesión del usuario, funcion de Firebase
  const signOutUser = () => signOut(auth);

  // Envía un correo electrónico de restablecimiento de contraseña, funcion de Firebase
  const sendPasswordReset = (email) => sendPasswordResetEmail(auth, email);

  // Autenticación con cuenta de Google
  const googleProvider = new GoogleAuthProvider();
  const loginWithGoogle = async () => {
    googleProvider.setCustomParameters({ prompt: "select_account" }); // Parámetro para seleccionar cuentas de google
    return signInWithPopup(auth, googleProvider);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        registerUser,
        loginUser,
        signOutUser,
        loginWithGoogle,
        sendPasswordReset,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserProvider;
