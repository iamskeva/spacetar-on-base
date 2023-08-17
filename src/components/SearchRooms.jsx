import React, { useContext } from "react";
import { BiReset } from "react-icons/bi";
import styled from "styled-components";
import { ButtonContainer } from "../styled/Button";
import { LoginButton } from "../connect-wallet/connectButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { ChatContext } from "../context/ChatProvider";

const SearchRoomsMain = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  padding: 10px;
`;

const SearchRoomsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #194185;
  width: 45%;
  padding: 0.5em;
  border-radius: 1.2em;
  margin-right: 12em;
  // float: right;

  & input {
    width: 85%;
    background: transparent;
    border: none;

  }  
  & ::placeholder {
  color: #ffff;
  opacity: 1; 
}

  @media (max-width: 820px) {
    // display: none;
  }
`;

const GiHamburger = styled.div`
  visibility: hidden;
  

  @media (max-width: 820px) {
    visibility: visible;
  }
`;

const ViewRoom = styled.button`
  padding: 10px 20px;
  background: #194185;
  border: none;
  color: #ffffffd8;
  border-radius: 5px;
`;

const SearchRooms = ({ query, setQuery }) => {
  const { isMenuOpen, openMenu, closeMenu, setIsRoomOpen, isRoomOpen, setIsMenuOpen} = useContext(ChatContext);

  return (
    <SearchRoomsMain>
      <GiHamburger>
        <GiHamburgerMenu size="25px" onClick={()=>{
          setIsMenuOpen(!isMenuOpen)
        }}/>
      </GiHamburger>
      <SearchRoomsContainer>
        <input
          type="text"
          placeholder="Search Group"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ color: 'white' }}
        />

        {/* <ButtonContainer padding="0" active= 'true'  size="3em" > */}
        <a href="#">
          <BiReset fill="#FFFFFF" size={"1.1em"}></BiReset>
        </a>
        {/* </ButtonContainer> */}
      </SearchRoomsContainer>
      <ViewRoom
        onClick={() => {
          setIsRoomOpen(true);
        }}
      >
        Open Rooms
      </ViewRoom>
    </SearchRoomsMain>
  );
};

export default SearchRooms;
