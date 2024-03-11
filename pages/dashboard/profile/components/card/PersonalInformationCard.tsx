import { useGlobalContext } from '@/Context/store'
import CardWrapper from '@/components/Dashboard/CardWrapper'
import React from 'react'
import PersonalModal from '../modal/PersonalModal/PersonalModal'

export interface PersonalInformationCardProp {
  picture?: string | null
  email: string
  phone: string
  address: string | null
  city: string | null
  state: string | null
  lga: string | null
  workplace: string | null
}

const PersonalInformationCard: React.FC<PersonalInformationCardProp> = ({
  email,
  phone,
  address,
  city,
  state,
  lga,
  workplace,
}) => {
  const { setUI } = useGlobalContext()

  const handleOpen = () => {
    setUI((prev) => {
      return {
        ...prev,
        personalModal: {
          ...prev.personalModal,
          visibility: true,
        },
      }
    })
  }
  return (
    <>
      <CardWrapper title="Personal Information" onClick={handleOpen}>
        <div className="grid grid-cols-5 gap-10 mb-[16px]">
          <h3 className="col-span-1">Email</h3>
          <h3 className="col-span-4">{email}</h3>
        </div>
        <div className="grid grid-cols-5 gap-10 mb-[16px]">
          <h3 className="col-span-1">Phone No</h3>
          <h3 className="col-span-4">{phone ? phone : '-'}</h3>
        </div>
        <div className="grid grid-cols-5 gap-10 mb-[16px]">
          <h3 className="col-span-1">Current Location</h3>
          <h3 className="col-span-4">
            {address && city && state && lga ? (
              <>
                {address} <span>at </span>
                {lga} <span>at </span>
                {city}, {state}
              </>
            ) : (
              '-'
            )}
          </h3>
        </div>
        <div className="grid grid-cols-5 gap-10 mb-[16px]">
          <h3 className="col-span-1">Current Workplace</h3>
          <h3 className="col-span-4">{workplace ? workplace : '-'}</h3>
        </div>
      </CardWrapper>
      <PersonalModal
        {...{
          email,
          phone,
          address,
          city,
          state,
          lga,
          workplace,
        }}
      />
    </>
  )
}

export default PersonalInformationCard
