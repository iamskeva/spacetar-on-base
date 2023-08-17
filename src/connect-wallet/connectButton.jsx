import { ConnectButton } from '@rainbow-me/rainbowkit';
import './button.css'

export const LoginButton = () => {
  return <ConnectButton label={"Get Started"} showBalance={false} />;
};