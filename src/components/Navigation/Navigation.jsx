import React, { useContext, useState } from "react";
import {
  GiExitDoor,
  GiTwoCoins,
  GiReceiveMoney,
  GiTakeMyMoney,
  GiCancel,
} from "react-icons/gi";
import { AiFillHome, AiFillWechat, AiFillMoneyCollect } from "react-icons/ai";

import { BiBitcoin, BiDonateBlood } from "react-icons/bi";
import styled from "styled-components";
import { ButtonContainer } from "../../styled/Button";
import { useChat } from "../../context/ChatProvider";
import Logo from "../../assets/LOGO.png";
import { LoginButton } from "../../connect-wallet/connectButton";
import { ChatContext } from "../../context/ChatProvider";
import "./Navigation.css";
import { NavBarConnectButton } from "../../connect-wallet/navbar-connectButton";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  display: flex;
  flex-direction: column;
  // width: 14.75em;
  // height: 100vh;
  gap: 30px;
  // border: 1px solid black;
  // align-items: center;
  // padding: 6vh 5px;
  // background: #ebe8e8;
  background: #194185;

  & div {
    justify-content: center;
    width: 100%;
  }

  @media (max-width: 820px) {
    width: 70%;
    justify-content: start;
    height: 100%;
    // flex-direction: row;
    position: absolute;
    top: 0;
    left: 0;
    width: 17.75em;
    // z-index: 99
    // display: none;
  }
`;

const LogoImg = styled.picture`
  padding:10px 30px;
  background-color: white;
  // border-radius: 10px;
  // display: flex;
  // justify-content: space-between;
  // align-items center;


  & img {
    width: 80%;
  }

   @media (max-width: 820px) {
    display: none;
    display:flex;
    align-items: center;
    justify-content: space-between;

    & img{
      width:100%;
      // border: 1px solid black
    }
  }
`;

const CancelIcon = styled.div`
  display: none;
  // border: 1px solid black;
  @media (max-width: 820px) {
    display: inline;
    text-align: end;
    font-size: 16px;
    color: #194185;
  }
`;
const Navigation = ({ openRoomNav }) => {
  const { currentRoom, setCurrentRoom } = useChat();
  const { closeMenu, isMenuOpen, isRoomOpen, setIsMenuOpen } =
    useContext(ChatContext);

  const leaveClickHandler = () => {
    setCurrentRoom(null);
  };

  return (
    <>
      {/* {!isMenuOpen ? ( */}
      <div className={isMenuOpen ? "nav-body" : "hide"}>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            backgroundColor: "#194185",
          }}
        >
          <Nav>
            <LogoImg>
            <Link to="/">
              <div>
                <img src={Logo} alt="Spacetar Logo" />
              </div>
              </Link>
              <CancelIcon
                onClick={() => {
                  setIsMenuOpen(!isMenuOpen);
                }}
              >
                <GiCancel />
              </CancelIcon>
            </LogoImg>

            <ButtonContainer
              active="true"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <Link to="/dashboard">
                <AiFillHome size="25px" />
                <p>
                  <b>Home</b>
                </p>
              </Link>
            </ButtonContainer>

            <ButtonContainer
              active="true"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <Link to="claim">
                <GiTwoCoins size="25px" />
                <p>
                  <b>Claim </b>
                </p>
              </Link>
            </ButtonContainer>

            <ButtonContainer
              active="true"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
              }}
            >
              <Link to="donate">
                <GiReceiveMoney size="25px" />
                <p>
                  <b>Donate </b>
                </p>
              </Link>
            </ButtonContainer>

            <ButtonContainer
              active="true"
              onClick={() => {
                setIsMenuOpen(!isMenuOpen);
                leaveClickHandler();
              }}
            >
              <Link to="#">
                <GiExitDoor size="25px" />
                <p>
                  <b>Exit Room</b>
                </p>
              </Link>
            </ButtonContainer>
          </Nav>
          <div className="connect-btn">
            <NavBarConnectButton />
          </div>
        </div>
      </div>
      {/* ) : null} */}
    </>
  );
};

export default Navigation;
