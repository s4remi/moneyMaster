import React, { useState } from "react";

const App = () => {
  //basic test to see of we can get data from the back
  async function testBack() {
    console.log("Testing back...");
    const response = await fetch("/api/data");
    const data = await response.json();
    console.log("in APP.jsx, got data from back-end!\n ", data);
  }

  testBack();
  const [active, setActive] = useState(false);

  const handleRegisterClick = () => {
    setActive(true);
  };

  const handleLoginClick = () => {
    setActive(false);
  };

  return (
    <Container>
      <SignInContainer active={!active}>{/* Sign In Form */}</SignInContainer>
      <SignUpContainer active={active}>{/* Sign Up Form */}</SignUpContainer>
      <ToggleContainer active={active}>
        <Toggle active={active}>
          <ToggleLeft active={!active}>{/* Sign In Content */}</ToggleLeft>
          <ToggleRight active={active}>{/* Sign Up Content */}</ToggleRight>
        </Toggle>
      </ToggleContainer>
    </Container>
  );
};

export default App;
