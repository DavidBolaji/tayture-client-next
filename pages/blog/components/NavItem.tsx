import { useState } from 'react'

interface NavItemProps {}

const NavItem = ({}: NavItemProps) => {
  const [activeButton, setActiveButton] = useState(0)

  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber)
  }

  return (
    <ul className="flex  sm:space-x-2 pb-6">
      <li className="relative flex-shrink-0">
        <button
          className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${activeButton === 0 ? 'bg-black text-white' : 'hover:bg-neutral-100 hover:text-neutral-900'}`}
          onClick={() => handleButtonClick(0)}
        >
          All Items
        </button>
      </li>
      <li className="relative flex-shrink-0">
        <button
          className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${activeButton === 1 ? 'bg-black text-white' : 'hover:bg-neutral-100 hover:text-neutral-900'}`}
          onClick={() => handleButtonClick(1)}
        >
          Administration
        </button>
      </li>
      <li className="relative flex-shrink-0">
        <button
          className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${activeButton === 2 ? 'bg-black text-white' : 'hover:bg-neutral-100 hover:text-neutral-900'}`}
          onClick={() => handleButtonClick(2)}
        >
          Teachers
        </button>
      </li>
      <li className="relative flex-shrink-0">
        <button
          className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${activeButton === 3 ? 'bg-black text-white' : 'hover:bg-neutral-100 hover:text-neutral-900'}`}
          onClick={() => handleButtonClick(3)}
        >
          Students
        </button>
      </li>
    </ul>
  )
}

export default NavItem
