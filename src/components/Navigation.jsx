import React from 'react';
import { GiExitDoor } from "react-icons/gi"
import { 
    AiFillHome, 
    AiFillWechat, 
} from "react-icons/ai"   

import { 
    BiBitcoin,
    BiDonateBlood
} from "react-icons/bi" 
import styled from 'styled-components';
import { ButtonContainer } from '../styled/Button';
import { useChat } from '../context/ChatProvider';
import { NavBarConnectButton } from '../connect-wallet/navbar-connectButton';

const Nav = styled.nav`
    display: flex;
    width: 6.75em;
    gap: 20px;
    align-items: center;
    flex-direction: column;
    padding: 6vh 5px;
    background: #ebe8e8;
    
    & div {
        justify-content: center;
        width: 100%;
    }

    @media (max-width: 820px) {
        width: 100%;
        height: 5%;
        flex-direction: row;
    }
`;

const Navigation = ({ openRoomNav }) => {
    const { currentRoom, setCurrentRoom } = useChat();

    const leaveClickHandler = () => {
        setCurrentRoom(null);
    }

    return (
       
        
        <Nav>
            <ButtonContainer active='true' >
                    <a href="/">
                        <AiFillHome size='100%' />
                    </a>
            </ButtonContainer>
            <p><b>Home</b></p>


            <ButtonContainer device='mobile' onClick={ openRoomNav }>
                <a href='/'>
                    <AiFillWechat size='100%' />
                </a>
            </ButtonContainer>


            <ButtonContainer active='true'>
                    <a href="/claim">
                        <BiBitcoin  size='100%' />
                    </a>
            </ButtonContainer>
            <p><b>Claim </b></p>

            <ButtonContainer active='true'>
                    <a href="/donate">
                        <BiDonateBlood size='100%' />
                    </a>
            </ButtonContainer>
            <p><b>Donate </b></p>
    

            <ButtonContainer active={true}  onClick={ leaveClickHandler }>
                    <a href="#">
                        <GiExitDoor size='100%' />
                    </a>
            </ButtonContainer>
            <p><b>Exit Room</b></p>

            <ButtonContainer>
                <NavBarConnectButton />
            </ButtonContainer>

            <NavBarConnectButton />


        </Nav>
    );
};

export default Navigation;