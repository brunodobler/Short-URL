import PropTypes from "prop-types";
import { IoIosShareAlt } from "react-icons/io";
import { MdOutlineDelete, MdOutlineModeEdit } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";

const UrlCardContentMobile = ({
  item,
  pathURL,
  handleClickDelete,
  handleClickEdit,
  handleClickCopy,
  handleClickShare,
}) => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start">
      {/* Información de la URL */}
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
        {pathURL}
        {item.id}
      </h5>

      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
        {item.url}
      </p>

      <div className="flex space-x-9 mt-2 mb-5">
        {/* Boton para eliminar una URL */}
        <button
          type="button"
          onClick={() => handleClickDelete(item.id)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
        >
          <MdOutlineDelete className="w-10 h-10" />
        </button>
        {/* Boton para editar una URL */}
        <button
          type="button"
          onClick={() => handleClickEdit(item)}
          className="text-[#6A5670] hover:text-[#5F4C65]  focus:outline-none "
        >
          <MdOutlineModeEdit className="w-10 h-10" />
        </button>
        {/* Boton para copiar una URL */}
        <button
          type="button"
          onClick={() => handleClickCopy(item.id)}
          className="text-[#6A5670] hover:text-[#5F4C65]  focus:outline-none"
        >
          <FaRegCopy className="w-10 h-10" />
        </button>
        {/* Boton para compartir una URL */}
        <button
          type="button"
          onClick={() => handleClickShare(item.id)}
          className="text-[#869B5D] hover:text-[#7A8B52] focus:outline-none"
        >
          <IoIosShareAlt className="w-10 h-10" />
        </button>
      </div>
    </div>
  );
};

UrlCardContentMobile.propTypes = {
  item: PropTypes.object.isRequired,
  pathURL: PropTypes.string.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClickCopy: PropTypes.func.isRequired,
  handleClickShare: PropTypes.func.isRequired,
};

export default UrlCardContentMobile;
