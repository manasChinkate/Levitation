
import logo2 from '../../assets/logo2.png'
import { useLocation } from 'react-router-dom';
const Navbar = () => {

  const location = useLocation();
  return (
    <div className=' w-full h-full bg-[#1F1F1F] flex items-center justify-between px-7 '>
        <div>
          <img src={logo2} alt="" />
        </div>
        <div>
          {
            location.pathname === '/register' ? <button className=' bg-[#C4EA78] text-[12px] p-2  rounded-md mr-6 px-3'>
            Log In
          </button> : location.pathname === '/product-page' ? <button className=' bg-[#C4EA78] text-[12px] p-2  rounded-md mr-6 px-3'>
              Log Out
            </button> : location.pathname === '/Login' ? <div className=' text-sm border p-2 rounded-md border-[#C4EA78] text-[#C4EA78]'>Connect People With Technology</div> : <></>
          }
            {/* <button className=' bg-[#C4EA78] text-[12px] p-2  rounded-md mr-6'>
              Log In
            </button> */}
        </div>
    </div>
  )
}

export default Navbar