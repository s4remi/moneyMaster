import PropTypes from "prop-types";

export function SearchBar({
  query,
  setQuery,
  searchResults,
  onEdit,
  onDelete,
}) {
  function onInput(evt) {
    setQuery(evt.target.value);
  }

  return (
    <div>
      <label className="form-label">
        Search:{" "}
        <input
          id="search"
          className="form-control"
          type="search"
          value={query}
          onInput={onInput}
        ></input>
      </label>
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            {result.name}
            <button onClick={() => onEdit(result.id)}>Edit</button>
            <button onClick={() => onDelete(result.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  searchResults: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
