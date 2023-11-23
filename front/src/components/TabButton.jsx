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
