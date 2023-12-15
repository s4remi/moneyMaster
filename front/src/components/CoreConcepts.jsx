import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.js";
import "./CoreConcepts.css";
//import CoreConceptImg from "../assets/components.png";

export default function CoreConcepts() {
  return (
    <div>
      <h2>Available Functions</h2>
      <section id="core-concepts">
        <ul>
          {CORE_CONCEPTS.map((contentItem) => (
            <CoreConcept key={contentItem.title} {...contentItem} />
          ))}
        </ul>
      </section>
    </div>
  );
}
