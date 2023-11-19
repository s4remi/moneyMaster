import PropTypes from "prop-types";

export function SearchBar({ query, setQuery }) {
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
    </div>
  );
}
SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};
