import LOGO from '../../assets/LOGO.png';
import design from './navbar.module.css';
import { NavBarConnectButton } from '../../connect-wallet/navbar-connectButton';

const Navbar = () => {
  return (
    <>
    <div className={design.Navbar}>
      <img src={LOGO} alt='' />
      <NavBarConnectButton />
    </div>
    </>
  );
};

export default Navbar;
