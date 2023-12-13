import PropTypes from "prop-types";
import "./CoreConcept.css";
export default function CoreConcept(props) {
  return (
    <li className="core-concept-item">
      <img src={props.image} alt={props.description} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </li>
  );
}
CoreConcept.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
