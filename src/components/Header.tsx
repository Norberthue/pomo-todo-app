import React from 'react'

interface HeaderForms {
    darkMode: boolean
    setDarkMode: (darkmode: boolean) => void
}

const Header = ({darkMode  ,setDarkMode}: HeaderForms) => {
  return (
    <div className='flex text-sm sm:text-2xl items-center justify-between p-10 border-b-[1px] border-[#5a626957]'>
        <div className=''>
            <a href='/'>PomoTodo</a>
        </div>
        <div className='flex gap-2'>
            <button onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
            <h1>| Login</h1>
        </div>
    </div>
  )
}

export default Header