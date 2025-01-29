import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { auth, db } from "../../../firebase";
import { nanoid } from "nanoid";

// Obtiene todas las URLs del usuario actual
export const fetchUrls = async () => {
  const q = query(
    collection(db, "urls"),
    where("uid", "==", auth.currentUser.uid)
  ); // Query para obtener la coleccion de urls
  const querySnapshot = await getDocs(q); // Ejecuta la consulta y devuelve todas las urls que cumplan con al condicion
  const data = querySnapshot.docs.map((doc) => doc.data()); // Extrae los datos de la consulta y los pasa a una array
  return data;
};

// Crear una nueva URL para el usuario actual
export const createUrl = async (url) => {
  const newUrl = {
    enabled: true,
    nanoid: nanoid(6),
    origin: url,
    uid: auth.currentUser.uid,
  }; // Se crea el nuevo objeto URL
  const docRef = doc(db, "urls", newUrl.nanoid); // Crea el insert
  await setDoc(docRef, newUrl); // Ejecuta el insert a Firestore
  return newUrl;
};

// Elimina una URL del usuario actual
export const removeUrl = async (nanoid) => {
  const docRef = doc(db, "urls", nanoid); // Crea el delete
  await deleteDoc(docRef); // Ejecuta el delete a firestore
};

// Modifica una URL del usuario actual
export const modifyUrl = async (nanoid, newUrl) => {
  const docRef = doc(db, "urls", nanoid); // Crea el update
  await updateDoc(docRef, { origin: newUrl }); // Ejecuta el update a firestore
};

// Busca una URL por su id del usuario actual
export const findUrl = async (nanoid) => {
  const docRef = doc(db, "urls", nanoid); // Crea la cosulta select
  return await getDoc(docRef); // Ejecuta la consulta
};
