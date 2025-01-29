import PropTypes from "prop-types";
import { QRCodeCanvas } from "qrcode.react";

import UrlCardContentMobile from "./cardContent/UrlCardContentMobile";
import UrlCardContentDesktop from "./cardContent/UrlCardContentDesktop";

const UrlCard = ({
  item,
  pathURL,
  copy,
  handleClickDelete,
  handleClickEdit,
  handleClickCopy,
  handleClickShare,
  isMobileDevice,
}) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mb-2 mt-5 flex flex-col sm:flex-row justify-between items-center">
      {isMobileDevice ? (
        // Tarjetas para celulares
        <UrlCardContentMobile
          item={item}
          pathURL={pathURL}
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
          handleClickCopy={handleClickCopy}
          handleClickShare={handleClickShare}
        />
      ) : (
        // Tarjetas para computadoras
        <UrlCardContentDesktop
          item={item}
          pathURL={pathURL}
          copy={copy}
          handleClickDelete={handleClickDelete}
          handleClickEdit={handleClickEdit}
          handleClickCopy={handleClickCopy}
          handleClickShare={handleClickShare}
        />
      )}
      {/*Muesta el QR de la url */}
      <QRCodeCanvas
        value={`${pathURL}${item.id}`}
        size={95}
        className="ml-4 sm:ml-0"
      />
    </div>
  );
};

UrlCard.propTypes = {
  item: PropTypes.object.isRequired,
  pathURL: PropTypes.string.isRequired,
  copy: PropTypes.object.isRequired,
  handleClickDelete: PropTypes.func.isRequired,
  handleClickEdit: PropTypes.func.isRequired,
  handleClickCopy: PropTypes.func.isRequired,
  handleClickShare: PropTypes.func.isRequired,
  isMobileDevice: PropTypes.bool,
};

export default UrlCard;
