import styled from "styled-components";

export const ButtonContainer = styled.div`
    display: ${(props) => (props.device === "mobile" ? "none" : "flex")};
    // flex: ${(props) => (props.flex ? props.flex : "1")};
    align-items: flex-end;

    @media (max-width: 820px) {
        display: flex;
        align-items: center;
        justify-content: center;

        & a, button { 
            justify-content: center;
        }
    }

    & a, button { 
        display: flex;
        // justify-content: center;
        align-items: center;
        padding: ${(props) => (props.padding ? props.padding : "1em")};
        width: ${(props) => (props.size ? props.size : "13em")};
        height: ${(props) => (props.size ? "auto" : "2.9em")};
        border: none;
        border-radius: ${(props) =>
          props.borderRadius ? props.borderRadius : "0.3em"};
        background: ${(props) =>
          props.active
            ? // "var(--blue-active-color)"
              "white"
            : "var(--secondry-color-dark-palette)"};
        box-shadow: ${(props) =>
          props.active ? "rgba(32, 112, 198, 0.7) 0 0 10px" : null};
        aspect-ratio: 1/1;
        transition: .3s ease-in-out all;
        cursor: pointer;


        @media (max-width: 820px) {
            padding: 0.7em;
        }
    }
    
    & svg{
        fill: ${(props) => (props.active ? "#194185" : "#737373")};
        // transition: .3s ease-in-out all;
    }

    & p{
        border: 1px solid black
        color: #194185;
        margin-left: 0.5em;
        font-size: 0.9em;
        fill: ${(props) => (props.active ? "#194185" : "#737373")};
        // color:  "#737373"
    }

    & a p{
    color: #194185;
    }

    & a:hover svg {
        fill: #3C95F4;
    }
`;