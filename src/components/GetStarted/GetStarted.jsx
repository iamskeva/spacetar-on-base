import React from 'react'
import design from './getStarted.module.css'
import img from '../../assets/getstartedimg.png'
import Button from '../Button/Button'
import { Link } from 'react-router-dom'
import { LoginButton } from '../../connect-wallet/connectButton'
import { useAccount } from 'wagmi';

const GetStarted = () => {
    const { address, isConnected } = useAccount();
  return (
    <>
    <div className={design.getstarted}>
        <div className={design.getstartedheader}>
            <h2>
                How To Get Started
            </h2>
            <p>
            Join us and embark on a journey towards improved mental well-being, where your voice matters and your experiences contribute to building a stronger, more resilient community.
            </p>
        </div>
    
        <div className={design.getstardedcard}>
            <div className={design.card}>
                <p className={design.step}>
                    Step 1
                </p>
                <h3>
                    Sign Up
                </h3>
                <p>
                Connect your AVAX wallet and discover a place where compassion, support, and understanding intersect.
                </p>
            </div>
            <div className={design.card}>
                <p className={design.step}>
                    Step 2
                </p>
                <h3>
                    Set up profile
                </h3>
                <p>
                Customize your space and get started sharing your experiences, struggles, journey, advice and earn crypto rewards.
                </p>
            </div>
            <div className={design.card}>
                <p className={design.step}>
                    Step 3
                </p>
                <h3>
                    Start connecting
                </h3>
                <p>
                We believe that together, we can make a difference in each other's lives because sharing is caring.
                </p>
            </div>
        </div>
    </div>
    <div className={design.ready}>
        <div className={design.readytext}>
            <h2>
                Ready to get started?
            </h2>
            <p>
            Start connecting and sharing your thoughts while earning incentives. Claim and stake your rewards for more rewards.
            </p>
            {isConnected ? (
              <Link to='/dashboard'>
                <Button content='Launch dApp' />
              </Link>
            ) : (
              <LoginButton />
            )}
        </div>
        <div className={design.getstartedimg}>
            <img src={img} alt=""  />
        </div>
    </div>
    </>
  )
}

export default GetStarted