import { Board } from '../Types'
interface HeaderForms {
    darkMode: boolean
    setDarkMode: (darkmode: boolean) => void
    
}

const Header = ({darkMode  ,setDarkMode, }: HeaderForms) => {
  return (
    <div className={`flex text-sm sm:text-xl ${darkMode ? 'bg-blur1': 'bg-blur2'} duration-600 text-white items-center justify-between pl-6 pr-6 pt-5 pb-5 border-b-[1px] border-[#5a626957]`}>
          <div className=''>
              <a href='/'><i className="fa-solid fa-hippo"></i> PomoTodo</a>
          </div>
          <div className='flex gap-2 items-center'>
              <button className='cursor-pointer' onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
              <span className='ml-1 mr-1'>|</span>
              <h1 className='cursor-pointer'>Login</h1>
          </div>
      </div>
  )
}

export default Header