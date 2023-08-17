import React, { useRef, useState } from "react";
import styled from "styled-components";
import { IoIosSend } from "react-icons/io";
import { Spinner } from "@chakra-ui/react";
import { ButtonContainer } from "../styled/Button";
import { useChat } from "../context/ChatProvider";
import { 
  useContractWrite, 
  usePrepareContractWrite,
  useWaitForTransaction 
 } from "wagmi";
import { ContractABI } from "../utils/SpacestarABI";

const MessageForm = styled.form`
  padding: 0.5vw 0;
  display: flex;
  align-items: center;
  height: 10%;
  border-top: 1px solid rgba(0, 0, 0, 0.08);

  & input {
    flex: 1;
    height: 100%;
    width: 100%;
    border: none;
  }
`;

const Button = styled.button`
  border: none;
  background: transparent;
`;

const ChatForm = () => {
  const inputRef = useRef(null);
  const { currentRoom } = useChat();
  const [chatMessage, setChatMessage] = useState("");

  const { config } = usePrepareContractWrite({
    address: import.meta.env.VITE_BASE_CONTRACT,
    abi: ContractABI,
    functionName: "sendGroupChatMessage",
    args: [chatMessage, currentRoom?.name],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);
  const { isLoading: waitTransaction } = useWaitForTransaction({
    hash: data?.hash,
    timeout: 10_000, // 
  })
  const onSubmit = (e) => {
    e.preventDefault();

    if (chatMessage.trim() === "") {
      return; // Prevent sending empty messages
    }
    setChatMessage(""); // Clear input after submitting
    if (write) {
      write();
    }
  };

  return (
    <MessageForm onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Share your Story or Contribute here"
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
      />

      {/* <ButtonContainer flex="0" padding="0" active="true" size="2.2em"> */}
      <Button
        onClick={onSubmit}
        disabled={isLoading || waitTransaction || chatMessage.trim() === ""}
      >
      
        {isLoading || waitTransaction ? (
          <Spinner speed="0.65s" color="blue" size="lg" />
        ) : (
          <IoIosSend fill="blue" size="1.5em" />
        )}
      </Button>
      {/* </ButtonContainer> */}
    </MessageForm>
  );
};

export default ChatForm;
