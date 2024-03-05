import { useGlobalContext } from '@/Context/store'
import { Grid, Avatar } from 'antd'
import React from 'react'
import { FaPen } from 'react-icons/fa'
import UserModal from '../modal/UserModal/UserModal'

const { useBreakpoint } = Grid

export interface UserCardProps {
  picture: string | null
  fname: string
  lname: string
  summary: string | null
  available: boolean | null
}

const UserCard: React.FC<UserCardProps> = ({
  fname,
  lname,
  summary,
  picture,
  available,
}) => {
  const screen = useBreakpoint()
  const { setUI } = useGlobalContext()

  const handleOpen = () => {
    setUI((prev) => {
      return {
        ...prev,
        userProfileModal: {
          ...prev.userProfileModal,
          visibility: true,
        },
      }
    })
  }
  return (
    <div className="bg-white px-[24px] py-[40px] flex gap-[32px] items-center rounded-[15px] border border-ash_600 relative  hover:shadow transition-all duration-300 overflow-x-auto ">
      <div className="flex items-center justify-center">
        <Avatar
          size={screen.lg ? 150 : 75}
          icon={
            <div className="grid place-items-center h-full">
              {picture ? (
                <img
                  src={picture}
                  alt="profile"
                  className="w-full rounded-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center">
                  <Avatar
                    size={{
                      xs: 75,
                      sm: 75,
                      md: 75,
                      lg: 150,
                      xl: 150,
                      xxl: 150,
                    }}
                    shape="circle"
                    style={{
                      backgroundColor: '#a62a21',
                      border: '1px solid #a62a21',
                    }}
                  >
                    <span className="md:text-[80px]">{fname.split('')[0]}</span>
                  </Avatar>
                  {/* <StyledAvatar width={150} height={150} name={`${auth?.fname}`} /> */}
                </div>
              )}
            </div>
          }
        />
      </div>
      <div>
        <h3
          className="text-black_400 md:text-[24px] text-[16px] 
        font-[600] mb-[8px] md:w-full dsm:w-[170px] truncate whitespace-nowrap text-elipsis"
        >
          {fname} {lname}
        </h3>
        {summary && (
          <p className="max-w-[700px] text-black_200 text-[12px] md:text-[14px] mb-[16px]">
            {summary}
          </p>
        )}
        {available ? (
          <span className="text-[12px] text-black_200 px-[24px] py-[8px] rounded-[15px] bg-success">
            Open to work
          </span>
        ) : (
          <span className="dsm:text-[12px] text-[8px] text-black_200 px-[24px] py-[8px] rounded-[15px] bg-pink-200">
            I&aposm casually looking
          </span>
        )}
      </div>
      <div
        className="absolute transition-transform ease-in duration-200 md:right-10 md:top-10 right-3 top-3 cursor-pointer hover:scale-105"
        onClick={handleOpen}
      >
        <div className="w-[32px] h-[32px] rounded-full bg-ash_200 flex items-center justify-center hover:border hover:border-ash_600 transition-all duration-200">
          <FaPen color="#FFA466" />
        </div>
      </div>
      <UserModal {...{ fname, lname, summary, picture, available }} />
    </div>
  )
}

export default UserCard
