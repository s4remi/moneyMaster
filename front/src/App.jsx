import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  background-color: #fff;
  border-radius: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
  position: relative;
  overflow: hidden;
  width: 768px;
  max-width: 100%;
  min-height: 480px;
  display: flex;
`;

const FormContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50%;
`;

const SignInContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  z-index: 2;
  transform: ${(props) =>
    props.active ? "translateX(100%)" : "translateX(0)"};
`;

const SignUpContainer = styled(FormContainer)`
  left: 0;
  width: 50%;
  opacity: ${(props) => (props.active ? 1 : 0)};
  z-index: ${(props) => (props.active ? 5 : 1)};
  transform: ${(props) =>
    props.active ? "translateX(100%)" : "translateX(0)"};
  animation: ${(props) => (props.active ? "move 0.6s" : "none")};
`;

const ToggleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  border-radius: 150px 0 0 100px;
  z-index: 1000;
  transform: ${(props) =>
    props.active ? "translateX(-100%)" : "translateX(0)"};
`;

const Toggle = styled.div`
  background-color: #512da8;
  height: 100%;
  background: linear-gradient(to right, #5c6bc0, #512da8);
  color: #fff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 200%;
  transform: ${(props) => (props.active ? "translateX(50%)" : "translateX(0)")};
  transition: all 0.6s ease-in-out;
`;

const TogglePanel = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 30px;
  text-align: center;
  top: 0;
  transform: ${(props) =>
    props.active ? "translateX(0)" : "translateX(-200%)"};
  transition: all 0.6s ease-in-out;
`;

const ToggleLeft = styled(TogglePanel)`
  transform: ${(props) =>
    props.active ? "translateX(0)" : "translateX(-200%)"};
`;

const ToggleRight = styled(TogglePanel)`
  right: 0;
  transform: ${(props) =>
    props.active ? "translateX(200%)" : "translateX(0)"};
`;

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
