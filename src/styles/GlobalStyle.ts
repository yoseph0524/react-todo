import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body{
    font-family: 'Stylish', sans-serif;
    background-color: white;
  }
  input{
    font-family: 'Stylish', sans-serif;
  }
`;

export default GlobalStyle;
