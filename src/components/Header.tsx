import { Link } from 'react-router-dom';
import { useState } from 'react';
interface HeaderForms {
    darkMode: boolean
    setDarkMode: (darkmode: boolean) => void
    user: any;
    handleSignOut: () => void
}

const Header = ({darkMode  ,setDarkMode, user,  handleSignOut}: HeaderForms) => {
    const [openLogInOut, setOpenLogInOut] = useState(false) 
  return (
    <div className={`flex text-sm sm:text-xl ${darkMode ? 'bg-blur1': 'bg-blur2'} duration-600 text-white items-center justify-between pl-6 pr-6 pt-5 pb-5 border-b-[1px] border-[#5a626957]`}>
          <div className=''>
              <a href='/'><i className="fa-solid fa-hippo"></i> PomoTodo</a>
          </div>
          <div className='flex gap-2 items-center'>
                {user ? (<div className="hidden"></div>
                ) : (
                <button className='cursor-pointer' onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>)
                }

              {user ? (
              <div className="hidden"></div>
              ) : (
              <span className='ml-1 mr-1'>|</span>)
              }
              <div className=" relative flex flex-col gap-2 items-center">
                <h1 onClick={() => {setOpenLogInOut(!openLogInOut)}} className={`${user ? 'block' : 'hidden'} rounded-xl p-2 hover:bg-[#5d5f61] duration-500 cursor-pointer`}>{user ? user.email : ''}</h1>
                {user ? (
                  <div className={` bg-[#3b3e42] z-10 rounded-md pt-2 pb-2 pl-2 pr-2 flex flex-col gap-2 absolute right-0.5 ${openLogInOut ? 'top-12 opacity-100 pointer-events-auto ' : ' top-5 opacity-0 pointer-events-none'} duration-300`}>
                   <Link to={'/'}><h1 onClick={handleSignOut} className={`hover:underline underline-offset-4 duration-200 cursor-pointer`}>Logout</h1></Link> 
                    <button className='cursor-pointer hover:underline underline-offset-4 duration-200' onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
                  </div>
                  
                ) : (
                  <Link to={'/auth'}><h1  className=' cursor-pointer'>Login</h1></Link>
                )}
                
              </div>
          </div>
      </div>
  )
}

export default Header