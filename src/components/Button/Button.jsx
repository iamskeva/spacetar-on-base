import PropTypes from 'prop-types';
import design from './button.module.css';

const Button = ({ content, style }) => {
  return (
    <button style={style} className={design.btn}>
      {content}
    </button>
  );
};
Button.propTypes = {
  content: PropTypes.string.isRequired,
  //style: PropTypes.object.isRequired,
};
export default Button;
