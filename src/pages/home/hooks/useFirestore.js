import { useState } from "react";
import {
  createUrl,
  fetchUrls,
  findUrl,
  modifyUrl,
  removeUrl,
} from "../services/firestoreUrls.service";
import { adapterUrls } from "../../../adapters/url.adapters";

// Hook para manejar la interacciones con la base de datos
export const useFirestore = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  // Funcion para obtener todas las URLs
  const getUrls = async () => {
    try {
      setLoading(true);
      const urls = await fetchUrls(); // Obtenemos las urls
      setData(adapterUrls(urls)); // Usamos adapterUrls para adaptar el formato al utilizado por la app
    } catch (error) {
      setLoading(false);
      console.Error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funcion para agregar una nueva URL
  const addUrl = async (url) => {
    try {
      setLoading(true);
      const newUrl = await createUrl(url); // Crea una nueva URL en Firebase
      setData((prev) => [...prev, adapterUrls([newUrl])[0]]); // Agregar en la data la nueva URL
    } catch (error) {
      setLoading(false);
      console.Error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funcion para eliminar una URL
  const deleteUrl = async (nanoid) => {
    try {
      setLoading(true);
      await removeUrl(nanoid); // Elimina una URL en Firebase
      setData((prev) => prev.filter((item) => item.id != nanoid)); // Saca de la data la URL eliminada
    } catch (error) {
      setLoading(false);
      console.Error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funcion para modificar una URL
  const updateUrl = async (nanoid, newURL) => {
    try {
      setLoading(true);
      await modifyUrl(nanoid, newURL); // Modifica una URL en Firebase
      setData((prev) =>
        prev.map((item) =>
          item.id === nanoid
            ? adapterUrls([
                {
                  nanoid: item.id,
                  origin: newURL,
                  enabled: item.isEnabled,
                  uid: item.uid,
                },
              ])[0]
            : item
        )
      ); // Modifica la url en la data ya existente
    } catch (error) {
      setLoading(false);
      console.Error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Funcion para Buscar una URL por id
  const searchUrl = async (nanoid) => {
    try {
      setLoading(true);
      return await findUrl(nanoid); // Busca una URL en Firebase
    } catch (error) {
      setLoading(false);
      console.Error(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    error,
    loading,
    getUrls,
    addUrl,
    deleteUrl,
    updateUrl,
    searchUrl,
  };
};
