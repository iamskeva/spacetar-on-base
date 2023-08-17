import Grow from '../../components/Grow/Grow';
import Navbar from '../../components/Navbar/Navbar';
import Why from '../../components/Why/Why';
import GetStarted from '../../components/GetStarted/GetStarted';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      <Navbar />
      <Grow />
      <Why />
      <GetStarted/>
      <Footer/>
    </div>
  );
};

export default Home;
