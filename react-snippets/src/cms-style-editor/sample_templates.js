import React from "react";
import lightBulb from "./light-bulb.svg";
import styled from "styled-components";

const StyledButton = styled.button`
  border-radius: 5px;
  height: 40px;
  width: 100px;
  color: white;
  background: #1e88e5;
  outline: none;
  border: none;
  text-transform: uppercase;
  transition: background 0.3s ease;
  cursor: pointer;

  &:hover {
    background: #1565c0;
  }
`;
const COMPONENTS = {
  SampleIcon: <img height="30px" src={lightBulb} alt="SampleIcon"/>,
  SampleButton: <StyledButton> click me </StyledButton>,
};

export const TEMPLATES = {
  "@Components\\.(\\w+)": ([componentName]) => COMPONENTS[componentName],
};

// <div>Icons made by <a href="https://www.flaticon.com/authors/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
