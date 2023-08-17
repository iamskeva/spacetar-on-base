import React from 'react';
import styled from 'styled-components';
import ChatContainer from './ChatContainer';
import Home from '../pages/Home/Home';
import { useAccount } from 'wagmi';

const WrapperContainer = styled.div`
  display: grid;
  height: 100vh;
  place-items: center;
`;

const Wrapper = () => {

    const { address, isConnected } = useAccount();

    return (
        <WrapperContainer>
            {
                ! isConnected
                ?
                <Home />
                : 
                <ChatContainer />
            }
        </WrapperContainer>
    );
};

export default Wrapper;