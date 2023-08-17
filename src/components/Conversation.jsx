import { getFirstLetter, getUser } from '../helper';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components'; 
import { useContractRead } from 'wagmi'
import { ContractABI } from '../utils/SpacestarABI'
import { useChat } from '../context/ChatProvider';
import { useAccount } from 'wagmi';
import { generateAvatarUrl } from '../utils/avatarGenerator';

const ConversationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
  flex: 1;
  padding: 20px 0;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 20px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey;
    border-radius: 10px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: red;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #b30000;
  }
`;

const MessageContent = styled.div`
  display: flex;
  font-size: 0.8em;
  font-weight: 300;
  padding: 0.8em 1em;
  width: fit-content;
  height: fit-content;
  `;

const MessageContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: 1rem;
  padding-right: 1.5em;
`

const OutgoingMessageContainer = styled(MessageContainer)`
  flex-direction: row-reverse;

  ${MessageContent} {
    background: rgba(0, 0, 0, 0.05);
    border: none;
    color: #000;
    box-shadow: rgba(0, 0, 0, 0.15) 2px 3px 15px;
    border-radius: 8px 0 8px 8px;
  }
`;

const IncomingMessageContainer = styled(MessageContainer)`
  flex-direction: row;

  ${MessageContent} {
    background: var(--blue-gradient);
    border: none;
    color: #fff;
    box-shadow: rgba(32, 112, 198, 0.4) 2px 3px 15px;
    border-radius: 0 8px 8px 8px;
  }
`;


const UserProfile = styled.div`
  display: flex;
  position: relative;
  height: 100%;

  &::before {
    content: '';
    display: grid;
    place-content: center;
    padding: 0.5em;
    width: 1.3em;
    height: 1.3em;
    border-radius: 50%;
    background: var(--secondry-color-dark-palette);
    background-image: url('${(props) => generateAvatarUrl(props.content)}');
    background-size: cover;
  }
`;


const BotMessage = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 0.85em 1.7em;
  font-size: 0.7em;
  text-align: center;
  border-radius: 2em;
  background: rgba(0, 0, 0, 0.05);
`;

const Conversation = () => {

  const [chatMessages, setChatMessages] = useState([]);
  const { currentRoom } = useChat();
  const chatConversation = useRef(null);
  const { address, isConnected } = useAccount();

  const groupName = currentRoom?.name;

  const { data, isError, isLoading, refetch } = useContractRead({
    address: import.meta.env.VITE_BASE_CONTRACT,
    abi: ContractABI,
    functionName: 'getGroupChats',
    args: groupName ? [groupName] : [], 
    enabled: !!groupName, 

  });

  useEffect(() => {
    if (data) {
      setChatMessages(data);
    }
  }, [data]);

  useEffect(() => {
    const conversationRef = chatConversation.current;

    if (conversationRef) {
      conversationRef.scrollTo(0, conversationRef.scrollHeight);
    }
    
  }, [chatMessages]);

  // Automatically refetch data every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch({ throwOnError: false, cancelRefetch: false });
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);



  if (!groupName) {
    return <div> <MessageContainer>{"Please select a group"}</MessageContainer></div>;
  }

  if (isLoading) {
return <div> <MessageContainer>{"Loading..."}</MessageContainer></div>;
  }

  if (isError) {
    return <div  style={{color:'red',}}><MessageContainer>{"Error occurred while fetching data!"}</MessageContainer></div>
  }


  return (
    <ConversationContainer ref={chatConversation}>
      {chatMessages.map((m, index) => {
        const { chatMessage, user, timestamp } = m;
        var fixedTime = new Date(Number(timestamp) * 1000);
        fixedTime = fixedTime.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
         if (user === address) {
          return (
            <OutgoingMessageContainer key={index}>
              <UserProfile content={user} />
              <div className="flex-container">
                <MessageContent>{chatMessage}</MessageContent>
                <p style={{ color: 'grey', fontSize: '9px', marginTop: '5px', marginLeft: '10px' }}>{fixedTime}</p>
              </div>
            </OutgoingMessageContainer>
          );
        } else {
          return (
            <IncomingMessageContainer key={index}>
              <UserProfile content={user} />
              <div className="flex-container">
                <MessageContent>{chatMessage}</MessageContent>
                <p style={{ color: 'grey', fontSize: '9px', marginTop: '5px', marginLeft: '10px' }}>{fixedTime}</p>
              </div>
            </IncomingMessageContainer>
          );
        }
      })}
    </ConversationContainer>
  );
};

export default Conversation;
