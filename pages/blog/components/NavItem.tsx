import { Categories } from '@prisma/client';
import useInsightHook from '../hooks/useInsightHook'

interface NavItemProps {
  activeButton: string;
  handleClick: (arg: string) => void;
  categories: Categories[]
}

const NavItem:React.FC<NavItemProps> = ({activeButton, handleClick, categories}) => {
 
  return (
    <ul className="flex  sm:space-x-2 pb-6">
      <li className="relative flex-shrink-0">
        <button
          className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${
            activeButton === 'all'
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          onClick={() => handleClick('all')}
        >
          All Items
        </button>
      </li>
      {categories &&
        categories.map((category) => (
          <li key={category.id} className="relative flex-shrink-0">
            <button
              className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${
                activeButton === category.id
                  ? 'bg-black text-white'
                  : 'hover:bg-neutral-100 hover:text-neutral-900'
              }`}
              onClick={() => handleClick(category.id)}
            >
              {category.title}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default NavItem
