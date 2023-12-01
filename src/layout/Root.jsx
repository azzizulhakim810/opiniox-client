
import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const Root = () => {
  const location = useLocation();
  // console.log(location);
  const noHeaderFooterSignin = location.pathname.includes('signin');
  const noHeaderFooterSignup = location.pathname.includes('signup');
  return (
    <div>
      { (noHeaderFooterSignin || noHeaderFooterSignup)  || <Header></Header>}
     
      <Outlet></Outlet>
      { (noHeaderFooterSignin || noHeaderFooterSignup) || <Footer></Footer>}
      
    </div>
  );
};

export default Root;