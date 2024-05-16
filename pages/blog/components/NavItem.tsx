import { Axios } from '@/request/request'
import { Categories } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

interface NavItemProps {}

const NavItem = ({}: NavItemProps) => {
  const [activeButton, setActiveButton] = useState('all')
  const { data: categories } = useQuery({
    queryKey: ['allCategory'],
    queryFn: async () => {
      const req = await Axios.get('/categories')
      return req.data.category as Categories[]
    },
  })

  const handleButtonClick = (buttonNumber: any) => {
    setActiveButton(buttonNumber)
  }

  return (
    <ul className="flex  sm:space-x-2 pb-6">
      <li className="relative flex-shrink-0">
        <button
          className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${
            activeButton === 'all'
              ? 'bg-black text-white'
              : 'hover:bg-neutral-100 hover:text-neutral-900'
          }`}
          onClick={() => handleButtonClick('all')}
        >
          All Items
        </button>
      </li>
      {categories &&
        categories.map((category) => (
          <li className="relative flex-shrink-0">
            <button
              className={`text-neutral-500 flex items-center justify-center font-[600] px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full ${
                activeButton === category.id
                  ? 'bg-black text-white'
                  : 'hover:bg-neutral-100 hover:text-neutral-900'
              }`}
              onClick={() => handleButtonClick(category.id)}
            >
              {category.title}
            </button>
          </li>
        ))}
    </ul>
  )
}

export default NavItem
