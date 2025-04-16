import { useState } from 'react'
import { Link } from 'react-router-dom'


interface Header2Froms {
    user:any
    search: string;
    setSearch: (search:string) => void;
    setDarkMode: (darkmode: boolean) => void
    darkMode: boolean;
    handleSignOut: () => void
}

const Header2 = ({ handleSignOut ,user, search, setSearch, darkMode, setDarkMode}:Header2Froms) => {
    const [openLogInOut, setOpenLogInOut] = useState(false) 
  
    return (
    <div className="flex  sm:gap-0  justify-evenly items-center  mt-10 ">
          <Link to='/'>
            <h1 className="text-sm sm:text-xl flex-1 justify-center"><i className="fa-solid fa-hippo"></i> PomoTodo</h1>
          </Link>
          <div className="hidden sm:block">
            <form className="relative">
                <input placeholder="Search templates" value={search} onChange={(e) => {setSearch(e.target.value)}} className={`placeholder-gray-500  focus:ring-2 focus:ring-blue-500 duration-100 
                  w-[300px] rounded-sm pt-2 pb-2 pl-7 border-1 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'}  outline-none `}></input>
                <i className="fa-solid fa-magnifying-glass text-[#5a626957]  absolute left-1 top-3 pl-1"></i>
            </form>
          </div>
          <div className='flex gap-2 items-center text-sm sm:text-xl'>
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
                <h1 onClick={() => {setOpenLogInOut(!openLogInOut)}} className={`${user ? 'block' : 'hidden'} rounded-xl p-2 ${darkMode ? 'hover:bg-[#424344]' : 'hover:bg-[#ececec]'} duration-500 cursor-pointer`}>{user ? user.email : ''}</h1>
                {user ? (
                  <div className={`${darkMode ? 'bg-[#292a2c]' : 'bg-gray-200'} z-10 rounded-md pt-2 pb-2 pl-2 pr-2 flex flex-col gap-2 absolute right-0.5 ${openLogInOut ? 'top-12 opacity-100 pointer-events-auto ' : ' top-5 opacity-0 pointer-events-none'} duration-300`}>
                    <Link to={'/'}><h1 onClick={handleSignOut} className={` hover:underline underline-offset-4 duration-200  cursor-pointer`}>Logout</h1></Link> 
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

export default Header2