import React, { useState, useEffect } from "react";
import QRCode from "qrcode"; 
import styled from "styled-components";

const DonateDetails = ({ cryptoCoin, cryptoShort }) => {
  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    alert("Wallet address copied to clipboard!");
  };

  const walletAddress = "0x546A5cB5c0AdD53efbC60000644AA70204B20576";
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const generateQRCode = async () => {
    try {
      const dataUrl = await QRCode.toDataURL(walletAddress);
      setQrCodeDataUrl(dataUrl);
    } catch (error) {
      console.error("QR Code Generation Error:", error);
    }
  };


  useEffect(() => {
    generateQRCode(); 
  }, []);


  return (
    <>
      <DonateStyle>
        <QrCodeImg>
          {qrCodeDataUrl ? (
            <img src={qrCodeDataUrl} alt="QR Code" />
          ) : (
            <p>Loading QR code...</p>
          )}
        </QrCodeImg>
        <article>
          <h2>Donate {cryptoCoin} to this address</h2>
          <p>
            Scan the QR code or copy the address below into your wallet to send
            some {cryptoCoin}
          </p>
          <p>
            <span>Tag/Note:-</span> {cryptoShort} Donations
          </p>
          <WalletAddress>{walletAddress}</WalletAddress>
          <CopyButton onClick={() => handleCopy(walletAddress)}>
            Copy
          </CopyButton>
        </article>
      </DonateStyle>
    </>
  );
};

export default DonateDetails;

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

const WalletAddress = styled.p`
  background: white;
  padding: 10px;
  border-radius: 3px;
`;

const CopyButton = styled.button`
  padding: 10px;
  text-transform: uppercase;
  background: #161616;
  color: white;
  border: none;
  cursor: pointer;
`;
