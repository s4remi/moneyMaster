import PropType from "prop-types";
export default function TabButton({ children, isSelected, ...props }) {
  // add event listener
  return (
    <li>
      <button className={isSelected ? "active" : undefined} {...props}>
        {children}
      </button>
    </li>
  );
}
TabButton.propTypes = {
  children: PropType.node.isRequired,
  onClick: PropType.func,
  isSelected: PropType.bool,
  ...PropType.object,
};
