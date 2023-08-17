import React, { useRef } from 'react';
import RIGHT from '../../assets/grow_img.png';
import STAR from '../../assets/starz.png';
import Button from '../Button/Button';
import design from './grow.module.css';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { LoginButton } from '../../connect-wallet/connectButton';

const Grow = () => {
  const { address, isConnected } = useAccount();

  return (
    <div className={`${design.Grow} `}>
      <div className={design.Grow2}>
        <div className={design.Grow_left}>
          <img src={STAR} alt='' />
          <p>Trusted by 3456+ users worldwide</p>
          <div className={design.Grow_left_middle}>
            <h1>
              Share Your Story with <span>Spacestar</span>
            </h1>
            <p>
              A safe haven where you can freely share your thoughts, emotions, and experiences,
              knowing that you are not alone.
            </p>
          </div>
          <div className={design.Navbar}>
            {/* Conditionally render the button */}
            {isConnected ? (
              <Link to='/dashboard'>
                <Button content='Launch dApp' />
              </Link>
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
        <div className={design.Grow_right}>
          <img src={RIGHT} alt='' />
        </div>
      </div>
    </div>
  );
};

export default Grow;
