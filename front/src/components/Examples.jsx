import { useState } from "react";
import { Coming_up } from "../data.js";
import TabButton from "./TabButton.jsx";
import Section from "./Header/Section.jsx";
import Tabs from "./Tabs.jsx";

export default function Examples() {
  const [currentTab, setCurrentTab] = useState();

  function handleSelect(selectButton) {
    setCurrentTab(selectButton);
    //console.log(selectButton);
    //console.log(currentTab);
  }
  let tabContent = <p>Please select the topic.</p>;
  if (currentTab) {
    tabContent = (
      <div id="tab-content">
        <h3>{Coming_up[currentTab].title}</h3>
        <p>{Coming_up[currentTab].description}</p>
        <pre>
          <code>{Coming_up[currentTab].code}</code>
        </pre>
      </div>
    );
  }
  return (
    <Section title="Future - functions" id="examples">
      <Tabs
        buttonsContainer="menu"
        buttons={
          <>
            <TabButton
              isSelected={currentTab === "Profile"}
              onClick={() => handleSelect("components")}
            >
              Profile
            </TabButton>
            <TabButton
              isSelected={currentTab === "History"}
              onClick={() => handleSelect("jsx")}
            >
              History
            </TabButton>
            <TabButton
              isSelected={currentTab === "Pie_charts"}
              onClick={() => handleSelect("props")}
            >
              Pie_charts
            </TabButton>
            <TabButton
              isSelected={currentTab === "news"}
              onClick={() => handleSelect("state")}
            >
              News
            </TabButton>
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
