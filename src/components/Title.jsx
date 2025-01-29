import PropTypes from "prop-types";

const Title = ({ text, tag: Tag = "h1", style = false }) => {
  return (
    <Tag className={style ? style : "text-center my-5 text-3xl"}>{text}</Tag>
  );
};

Title.propTypes = {
  text: PropTypes.string.isRequired,
  tag: PropTypes.elementType,
  style: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

export default Title;
