import React, { useRef } from 'react';
import design from './why.module.css';
import Button from '../Button/Button';
import Green from '../../assets/green.png';
import Blue from '../../assets/blue.png';
import Orange from '../../assets/orange.png';
import Purple from '../../assets/purple.png';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { LoginButton } from '../../connect-wallet/connectButton';

const Why = () => {

  const { address, isConnected } = useAccount();

  return (
    <div className={design.Why}>
      <div className={design.Why_cards}>
        <div className={`${design.Why_card} ${design.Why_card_green}`}>
          <img src={Green} />
          <h3>Engage in community</h3>
        </div>
        <div className={`${design.Why_card} ${design.Why_card_blue}`}>
          <img src={Blue} />
          <h3>Discover new connections</h3>
        </div>
        <div className={`${design.Why_card} ${design.Why_card_orange}`}>
          <img src={Orange} />
          <h3>Share ideas and creativity</h3>
        </div>
        <div className={`${design.Why_card} ${design.Why_card_purple}`}>
          <img src={Purple} />
          <h3>Access information and news</h3>
        </div>
      </div>
      <div className={design.Why_right}>
        <h1>
          Why <span>Spacestar</span>
        </h1>
        <p>
        Spacetar connects you with a compassionate community for support. 
        Earn reward tokens by actively participating and engaging with others. 
        Share, seek advice, and receive uplifting feedback from caring members.
        </p>
        {isConnected ? (
              <Link to='/dashboard'>
                <Button content='Launch dApp' />
              </Link>
            ) : (
              <LoginButton label={"Get Started"}/>
            )}
      </div>
    </div>
  );
};

export default Why;
