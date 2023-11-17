import PropTypes from "prop-types";
import { useState } from "react";

export function ButtonVote({ name }) {
  let [votes, setVotes] = useState(0);

  function onClick() {
    setVotes(votes + 1);
    console.log(`Voted for ${name} votes=${votes}`);
  }

  console.log("render ButtonVote", name, votes);
  return (
    <div>
      <button className="btn btn-primary mb-2" onClick={onClick}>
        Vote for {name}
      </button>
      <output>
        {name} has {votes} votes
      </output>
    </div>
  );
}
ButtonVote.propTypes = {
  name: PropTypes.string.isRequired,
};
