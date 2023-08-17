import { useState } from "react";
import styled from "styled-components";
import ClaimDetails from "./ClaimDetails";

function Claim() {

  const [activeTab, setActiveTab] = useState(1);
  
  return (
    <>
      <DonatePage>
        <div>
        </div>
        <Detail>
          {activeTab === 1 && <ClaimDetails />}
        </Detail>
      </DonatePage>
    </>
  );
}

export default Claim;

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
