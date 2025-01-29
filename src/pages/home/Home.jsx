import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoIosLink } from "react-icons/io";

import Title from "../../components/Title";
import Button from "../../components/Button";
import FormInputText from "../../components/FormInputText";
import FormError from "../../components/FormError";
import Spinner from "../../components/Spinner";
import CustomAlert from "../../components/CustomAlert";
import UrlCard from "./components/UrlCard";
import { useFirestore } from "./hooks/useFirestore";
import { formValidate } from "../../utils/formValidate";
import { errorsFirebase } from "../../utils/errorsFirebase";
import { isMobile } from "../../utils/isMobile";

const Home = () => {
  // Funciones para interactuar con la base de datos (Firestore).
  const { data, error, loading, getUrls, addUrl, deleteUrl, updateUrl } =
    useFirestore();
  // Validaciones personalizadas para los campos del formulario
  const { required, patternUrl } = formValidate();
  // Hook de useForm para gestionar el estado del formulario y la validación
  const {
    register,
    handleSubmit,
    setError,
    resetField,
    setValue,
    formState: { errors },
  } = useForm();
  const isMobileDevice = isMobile();
  const [newURLId, setNewURLId] = useState();
  const [copy, setCopy] = useState({});

  // Carga las URLs al renderizar el componente
  useEffect(() => {
    getUrls();
  }, []);

  // Muestra un spinner de carga
  if (loading) return <Spinner />;

  // Si existe un error se muestra en mensaje
  if (error) {
    CustomAlert({
      title: "Error",
      message: error.message,
      icon: "error",
      timer: 3000,
      timerProgressBar: true,
    });
    return null;
  }

  // Funcion para crear o modificar URL
  const onSubmit = async ({ url }) => {
    try {
      if (newURLId) {
        await updateUrl(newURLId, url); // Funcion que actualiza la url
        setNewURLId("");
        CustomAlert({
          title: "Éxito",
          message: !newURLId
            ? "URL creada exitosamente!"
            : "URL modificada exitosamente!",
          icon: "success",
          timerProgressBar: true,
        });
      } else {
        await addUrl(url); // Funcion que crea una nueva url
      }
      resetField("url"); // Borra el campo después de agregar o editar
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  // Funcion para eliminar URL
  const handleClickDelete = async (nanoid) => {
    await deleteUrl(nanoid);
    CustomAlert({
      title: "Éxito",
      message: "URL eliminada exitosamente!",
      icon: "success",
      timerProgressBar: true,
    });
  };

  // Funcion para cargar URL a editar
  const handleClickEdit = async (item) => {
    setValue("url", item.url);
    setNewURLId(item.id);
  };

  // Funcion para poder copiar una URL
  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid); // Copia la URL al portapapeles
    setCopy({ [nanoid]: true }); // Marca la URL como copiada
    CustomAlert({
      title: "Éxito",
      message: "URL Copiada exitosamente!",
      icon: "success",
      timer: 3000,
      timerProgressBar: true,
    });
  };

  // Funcion para compartir URL
  const handleClickShare = (nanoid) => {
    const shareUrl = `${window.location.href}${nanoid}`;
    if (navigator.share) {
      navigator
        .share({
          title: "Compartir URL",
          text: "¡Mira esta URL acortada!",
          url: shareUrl,
        })
        .catch((error) => console.log("Error al compartir:", error));
    } else {
      window.open(
        `mailto:?subject=Compartir URL&body=Mira esta URL: ${shareUrl}`,
        "_blank"
      );
    }
  };

  const pathURL = window.location.href;

  return (
    <div
      className={
        isMobileDevice
          ? "profile-container max-w-min mx-auto"
          : "profile-container max-w-6xl mx-auto"
      }
    >
      <Title text="URLs" />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Input para ingresar URL */}
        <FormInputText
          type="text"
          label="Ingrese tu URL"
          placeholder="http://www.a.org"
          {...register("url", {
            required,
            pattern: patternUrl,
          })}
          error={errors.url ? true : false}
          icon={<IoIosLink />}
        >
          <FormError error={errors.url} />
        </FormInputText>

        {newURLId ? (
          // Boton para guardar URL modificada
          <Button
            type="submit"
            text="Guardar URL"
            color="principal"
            size={isMobileDevice ? "xl" : "medium"}
          />
        ) : (
          // Boton para agregar una nueva URL
          <Button
            type="submit"
            text="Añadir URL"
            color="principal"
            size={isMobileDevice ? "xl" : "medium"}
          />
        )}
      </form>

      {/* Lista de URL */}
      {data.map((item) => (
        // Componente que mustra los datos de la url en una card
        <UrlCard
          key={item.id}
          item={item}
          pathURL={pathURL}
          copy={copy}
          isMobileDevice={isMobileDevice}
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
          handleClickCopy={handleClickCopy}
          handleClickShare={handleClickShare}
        />
      ))}
    </div>
  );
};

export default Home;
