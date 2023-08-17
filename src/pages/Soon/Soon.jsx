// import RIGHT from '../../assets/grow_img.png';
// import STAR from '../../assets/starz.png';
// import Button from '../Button/Button';
// import design2 from '../../components/Grow/grow.module.css';
import design2 from './Soon.module.css';
import { Link } from 'react-router-dom';
import Timer from '../../components/Countdown/Timer'
import Optin from '../../components/Optin/Optin'
import Preloader from '../../components/Preloader/Preloader'
// import '../../components/Grow/Grow.css'

const Soon = () => {
  return (
    <div className={`${design2.Grow} ${design2.soon} ` }>
      <div className={design2.Grow2}>
      <div  >
      <div className={`${design2.sooncontainer}`}>
        <h1>
          Spacetar is
          <br />
          Coming Soon
        </h1>
        <div className={`${design2.timer}`}>
        <Timer />
        </div>
        <div>
        <Optin />
        </div>
        <div>
        <Preloader />
        </div>
      </div>
    </div>
    
      </div>
    </div>
  );
};

export default Soon;
