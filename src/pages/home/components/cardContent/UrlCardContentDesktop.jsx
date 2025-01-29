import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";
import PropTypes from "prop-types";

import Button from "../../../../components/Button";

const UrlCardContentDesktop = ({
  item,
  pathURL,
  copy,
  handleClickDelete,
  handleClickEdit,
  handleClickCopy,
  handleClickShare,
}) => {
  return (
    <div className="flex-grow">
      <div>
        {/* Información de la URL */}
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {pathURL}
          {item.id}
        </h5>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {item.url}
        </p>
        <div className="flex space-x-2 mt-2">
          {/* Boton para eliminar una URL */}
          <Button
            type="button"
            text="Eliminar"
            color="delete"
            onClick={() => handleClickDelete(item.id)}
            icon={<MdOutlineDelete className="w-5 h-5" />}
          />
          {/* Boton para editar una URL */}
          <Button
            type="button"
            text="Editar"
            color="complementario2"
            onClick={() => handleClickEdit(item)}
            icon={<MdOutlineModeEdit className="w-5 h-5" />}
          />
          {/* Boton para copiar una URL */}
          <Button
            type="button"
            text={copy[item.nanoid] ? "Copiado" : "Copiar"}
            color="complementario2"
            onClick={() => handleClickCopy(item.id)}
            icon={<FaRegCopy />}
          />
          {/* Boton para compartir una URL */}
          <Button
            type="button"
            text="Compartir"
            color="complementario1"
            onClick={() => handleClickShare(item.id)}
            icon={<IoIosShareAlt />}
          />
        </div>
      </div>
    </div>
  );
};

UrlCardContentDesktop.propTypes = {
  item: PropTypes.object.isRequired,
  pathURL: PropTypes.string.isRequired,
  copy: PropTypes.object.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClickCopy: PropTypes.func.isRequired,
  handleClickShare: PropTypes.func.isRequired,
  isMobileDevice: PropTypes.bool,
};

export default UrlCardContentDesktop;
