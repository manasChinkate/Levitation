import { useDispatch, useSelector } from 'react-redux';
import logo2 from '../../assets/logo2.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../../app/store';
import { cleanUp } from '../../../app/authslice';

const Navbar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(cleanUp());
    navigate('/login');
  };

  const username = useSelector((state: RootState) => state.auth.username);
  const location = useLocation();

  return (
    <div className='w-full h-full bg-[#1F1F1F] flex  md:flex-row items-center justify-between px-4 md:px-7 py-3'>
      <div className='flex items-center justify-center'>
        <img src={logo2} alt="Logo" className='h-8 md:h-12' />
      </div>
      
      {
        location.pathname === '/add-product' && (
          <h1 className='text-white hidden md:block text-sm md:text-base'>
            Welcome Back, {username}
          </h1>
        )
      }
      <div className='mt-3 md:mt-0'>
        {location.pathname === '/register' ? (
          <button className='bg-[#C4EA78] text-[12px] p-2 rounded-md px-3'>
            Log In
          </button>
        ) : location.pathname === '/add-product' ? (
          <button onClick={handleLogout} className='bg-[#C4EA78] text-[12px] p-2 rounded-md px-3'>
            Log Out
          </button>
        ) : location.pathname === '/login' ? (
          <div className='text-sm border p-2 rounded-md border-[#C4EA78] text-[#C4EA78]'>
            Connect People With Technology
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;
