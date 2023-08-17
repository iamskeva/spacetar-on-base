import React from "react";
import claimPoints from '../assets/claimPoints.png'
import styled from "styled-components";
import { useContractRead } from 'wagmi'
import {ContractABI} from '../utils/SpacestarABI'
import { useAccount } from 'wagmi';

const ClaimDetails = () => {

    const { address } = useAccount();

    const { data } = useContractRead({
        address: import.meta.env.VITE_AVALANCHE_CONTRACT,
        abi: ContractABI,
        functionName: 'userPoints',
        args: [address],
    
      });


  return (
    <>
      <DonateStyle>
        {/* <QrCodeImg>
          <img src={claimPoints} alt="" />
        </QrCodeImg> */}
        <article>
          <h2>
          You've earned: <b>{Number.isNaN(data) || data < 1 ? 0 : Number(data)}</b> Points
          </h2>
          <br/>
          <p>
          You'll be able to swap your Spacestar point to <b>$SPACESTAR</b> community token and receive 1:1 airdrop upon Mainnet Launch. 
          </p>
          <br/>
          <p>
          For now keep contributing and keep earning those point incentive.
          </p>
        </article>
      </DonateStyle>
    </>
  );
};

export default ClaimDetails;

const DonateStyle = styled.div`
  @media (max-width: 920px) {
    text-align: center;
  }
  @media (min-width: 920px) {
    display: flex;
  }
`;

const QrCodeImg = styled.div`
  width: 200px;
  height: 200px;
  margin-right: 40px;

  @media (max-width: 920px) {
    margin: 0 auto;
    margin-bottom: 30px; 
  }
`;

