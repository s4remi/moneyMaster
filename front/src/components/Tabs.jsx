import PropTypes from "prop-types";

export default function Tabs({ children, buttons, buttonsContainer }) {
  const ButtonsContainer = buttonsContainer;
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  buttons: PropTypes.node.isRequired,
  buttonsContainer: PropTypes.node.isRequired,
};
