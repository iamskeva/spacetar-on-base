import React, { useMemo, useContext } from "react";
import styled from "styled-components";
import { useChat } from "../context/ChatProvider";
import useDebounce from "../hooks/useDebounce";
import { Description } from "../styled/Description";
import { GiHamburgerMenu, GiCancel, GiCoins, GiTwoCoins } from "react-icons/gi";
import { ChatContext } from "../context/ChatProvider";

const RoomListContainer = styled.div`
  --space: 1em;
  --horizontal-space: 2vw;

  display: flex;
  flex-direction: column;
  width: 26%;
  height: 100%;
  padding-top: var(--vertical-padding);
  overflow: auto;
  // border-top-left-radius: 45px;
  // border-bottom-left-radius: 45px;
  // background: var(--blue-gradient);
  background: #194185;
  color: #fff;
  position: absolute;
  right: 0%;

  & h3 {
    font-size: 1.2em;
    font-weight: 500;
    padding: 0.9em var(--horizontal-space);
  }

  @media (max-width: 820px) {
    position: absolute;
    // opacity: ${(props) => (props.open ? "1" : "0")};
    // pointer-events: ${(props) => (props.open ? "null" : "none")};
    right: 0;
    width: 100%;
    border-radius: 0;
    z-index: 99;
    // display:none;
  }
`;

const Room = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const RoomItem = styled.li`
  display: flex;
  gap: 1vw;
  width: 100%;
  flex: 1;
  padding: var(--space) var(--horizontal-space);
  list-style: none;
  background: ${(props) =>
    props.active ? "var(--blue-active-color)" : "transparent"};
  cursor: pointer;
  transition: all 0.05s;

  &:hover {
    background: var(--blue-active-color);
  }

  & img {
    height: 3vw;
    width: 3vw;
    border-radius: 20px;
    object-fit: cover;
  }

  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & span {
    font-weight: 500;
    font-size: 0.8em;
  }
`;

// Static rooms in the chat
const rooms = [
  {
    id: 1,
    name: "Breaking Free from Abuse",
    src: "./rooms-images/Breaking Free from Abuse.jpg",
    description:
      "A safe space to share experiences, resources, and strategies for breaking free from abusive situations and seeking help.",
  },

  {
    id: 2,
    name: "Hope & Healing Hub",
    src: "./rooms-images/Hope & Healing Hub.jpg",
    description:
      "Fostering hope and healing, offering encouragement, coping strategies and breaking mental health stigmas",
  },

  {
    id: 3,
    name: "Path to Recovery",
    src: "./rooms-images/Path to Recovery.jpg",
    description:
      "Community offering hope, understanding, and support for addiction recovery journeys.",
  },

  {
    id: 4,
    name: "Empowerment Circle",
    src: "./rooms-images/Empowerment Circle.jpg",
    description:
      " Sharing stories of triumph, motivating others to take control of their mental health journey.",
  },

  {
    id: 5,
    name: "Wellness Warriors",
    src: "./rooms-images/Wellness Warriors.jpg",
    description:
      "A community committed to self-improvement, exploring wellness techniques for a healthy lifestyle.",
  },

  {
    id: 6,
    name: "Inner Strength Sanctuary",
    src: "./rooms-images/Inner Strength Sanctuary.jpg",
    description:
      "Building resilience, offering emotional support and self-reflection to face life's challenges.",
  },
];

const RoomList = ({ query, isNavOpen, setIsNavOpen }) => {
  const debouncedSearch = useDebounce(query, 350);
  const { currentRoom, setCurrentRoom, userName } = useChat();

  const { isOpen, setIsRoomOpen, isRoomOpen } = useContext(ChatContext);

  const filteredRooms = useMemo(() => {
    const filter = rooms.filter((room) => {
      const includesCaseInsensitive = {
        name: room.name.toLowerCase(),
        description: room.description.toLowerCase(),
      };

      const { name, description } = includesCaseInsensitive;

      return (
        name.includes(debouncedSearch.toLowerCase()) ||
        description.includes(debouncedSearch.toLowerCase())
      );
    });

    return filter;
  }, [debouncedSearch]);

  const handleRoomClick = (roomID) => {
    if (currentRoom?.id === roomID) {
      return;
    }

    const selectedRoom = rooms.find((room) => room.id === roomID);
    setCurrentRoom(selectedRoom);
    // setIsNavOpen(false);
  };

  return (
    <RoomListContainer>
      <Room>
        <h3>
          <b>Help Rooms</b>
        </h3>
        <GiCancel
          size="25px"
          onClick={() => {
            setIsRoomOpen(!isRoomOpen);
          }}
        />
      </Room>

      <ul>
        {filteredRooms.map((room) => (
          <RoomItem
            key={room.id} // Add unique key prop here
            // active={currentRoom?.id === room.id}
            onClick={() => {
              setIsRoomOpen(false);
              handleRoomClick(room.id);
            }}
          >
            <img alt="room-img" src={room.src} />

            <div>
              <span>{room.name}</span>
              <Description color="rgba(254,254,254,0.5)" size="0.7em">
                {room.description}
              </Description>

              <div
                style={{
                  border: "1px solid rgba(254,254,254,0.1)",
                  marginTop: "10px",
                  paddingLeft: "10px",
                }}
              ></div>
            </div>
          </RoomItem>
        ))}
      </ul>
    </RoomListContainer>
  );
};

export default RoomList;
