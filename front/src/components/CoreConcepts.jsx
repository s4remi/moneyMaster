import CoreConcept from "./CoreConcept.jsx";
import { CORE_CONCEPTS } from "../data.js";
//import CoreConceptImg from "../assets/components.png";

export default function CoreConcepts() {
  return (
    <section id="core-concepts">
      <h2>Core Functions</h2>
      <ul>
        {CORE_CONCEPTS.map((contentItem) => (
          <CoreConcept key={contentItem.title} {...contentItem} />
        ))}
      </ul>
    </section>
  );
}
