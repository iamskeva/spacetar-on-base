import { useState } from "react";
import styled from "styled-components";
import DonateDetails from "./DonateDetails";
import usdc from "../assets/usdc.png"
import tether from "../assets/tether.png"
import ethereum from "../assets/ethereum.png"
import avax from "../assets/avax.png"

function Donate() {
  const [cryptoCoin, setCryptoCoin] = useState("AVAX");
  const [cryptoShort, setCrpto] = useState("AVAX");
  const [active, setActive] = useState(true);
  const [activeTab, setActiveTab] = useState(1);

  const handleTabClick = (tabindex) => {
    setActiveTab('')
    setActiveTab( activeTab && tabindex);
    console.log(activeTab)
  };
  
  return (
    <>
      <DonatePage>
        <h1>Support What we're building</h1>
        <div style={{ display: 'flex',  justifyContent: 'center' }}>
          <DonateButton
            onClick={() => {
              setCryptoCoin("AVAX");
              setCrpto("AVAX");
              setActive(true);
              handleTabClick(1);
            }}
          >
            <img src={avax}
           alt="" 
            style={{
            width: '28%',
          }}
          />
          </DonateButton>

          <DonateButton
            onClick={() => {
              setCryptoCoin("Ethereum");
              setCrpto("ETH");
              setActive(true);
              handleTabClick(2);
            }}
          >
          <img src={ethereum}
           alt="" 
            style={{
            width: '18%',
            marginLeft: '-270px'
          }}
          />
          </DonateButton>

          <DonateButton
            onClick={() => {
              setCryptoCoin("Tether");
              setCrpto("USDT");
              setActive(true);
              handleTabClick(3);
            }}
          >
          <img src={tether}
           alt="" 
            style={{
            width: '30%',
            marginLeft: '-500px'
          }}
          />
          </DonateButton>

          <DonateButton
            onClick={() => {
              setCryptoCoin("USD Coin");
              setCrpto("USDC");
              setActive(true);
              handleTabClick(4);
            }}
          >
            <img src={usdc}
           alt="" 
            style={{
            width: '30%',
            marginLeft: '-650px'
          }}
          />
          </DonateButton>
        </div>
        <Detail>
          {activeTab === 1 && <DonateDetails cryptoCoin={cryptoCoin} cryptoShort={cryptoShort} />}
          {activeTab === 2 && <DonateDetails cryptoCoin={cryptoCoin} cryptoShort={cryptoShort} />}
          {activeTab === 3 && <DonateDetails cryptoCoin={cryptoCoin} cryptoShort={cryptoShort} />}
          {activeTab === 4 && <DonateDetails cryptoCoin={cryptoCoin} cryptoShort={cryptoShort} />}
        </Detail>
      </DonatePage>
    </>
  );
}

export default Donate;

const DonatePage = styled.section`
  // border: 1px solid black;
  height: 100%;
  border-radius: 5px;
  background: white;
  display: flex;
  flex-direction: column;
  // align-items:center;
  justify-content: center;
  padding: 0 40px;

  & h1 {
    margin-bottom: 20px;
    font-size: 25px;
    color: #161616;
  }
`;

const DonateButton = styled.button`
  padding: 15px 40px;
  border: none;
  background: ${(props) => (props.activeTab === 1 ? "#f0f0f0" : "transparent")};
`;

const Detail = styled.div`
  display: flex;
  align-items: center;
  background: #f0f0f0;
  padding: 20px;
  color: grey;

  & img {
    width: 100%;
  }

  & h2 {
    margin-bottom: 10px;
    color: #161616;
  }
  & p {
    margin-bottom: 10px;
  }

  & span {
    font-size: 20px;
    font-weight: bold;
    color: #161616;
  }
`;
