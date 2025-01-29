import { Outlet, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { useFirestore } from "../../pages/home/hooks/useFirestore";
import Spinner from "../Spinner";

// Realiza redirecciones basadas en nanoid pasando en la URL y obtiene URL destino desde Firebase
const LayoutRedirect = () => {
  const [loading, setLoading] = useState(true);
  const { searchUrl } = useFirestore();
  const params = useParams(); // Para obtener los parámetros de la URL, en este caso el nanoid

  useEffect(() => {
    // Función que trae el URL almacenada en Firebase
    searchUrl(params.nanoid).then((res) => {
      if (res.exists()) {
        location.href = res.data().origin; // Redirige si la URL existe
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <>
        <Spinner text="Cargando redirección..." />
      </>
    );
  }

  return <Outlet />;
};

export default LayoutRedirect;
