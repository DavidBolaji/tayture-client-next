import db from '@/db/db'
import { Axios } from '@/request/request'
import axios from 'axios'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    return user
  } catch (e) {
    console.log((e as Error).message)
  }
}
export const getUserByEmail2 = async (email: string) => {
  try {
    const user = await Axios.get(`/users/email/${email}`)
    return user
  } catch (e) {
    console.log((e as Error).message)
  }
}
export const getUserById = async (id: string) => {
  const user = await db.user.findUnique({
    where: {
      id,
    },
  })
  return user
}

export const sendTextMessage = async (phone: string, msg: string) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_TERMII_URL}/sms/send`,
      {
        api_key: process.env.NEXT_PUBLIC_TERMII_API_KEY,
        to: phone.replace('+', ''),
        from: 'N-Alert',
        sms: `${msg}`,
        type: 'plain',
        channel: 'dnd',
      },
    )
    console.log(result.data)

    console.log('SMS sent succesfully')
    return result.data
  } catch (error: any) {
    console.log('error: ', error)
  }
}
export const sendTextMessageOTP = async (phone: string) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_TERMII_URL}/sms/otp/send`,
      {
        api_key: process.env.NEXT_PUBLIC_TERMII_API_KEY,
        message_type: 'NUMERIC',
        to: phone.replace('+', ''),
        from: 'N-Alert',
        channel: 'dnd',
        pin_attempts: 3,
        pin_time_to_live: 10,
        pin_length: 4,
        pin_placeholder: '< 1234 >',
        message_text: 'Your one time password is < 1234 >',
        pin_type: 'NUMERIC',
      },
    )
    console.log('sending')
    return result
  } catch (error: any) {
    console.log('error: ', error)
    throw new Error((error as Error).message)
  }
}
export const valdateOTP = async ({
  otp,
  pinId,
  email,
}: {
  otp: string
  pinId: string
  email: string
}) => {
  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_TERMII_URL}/sms/otp/verify`,
      {
        api_key: process.env.NEXT_PUBLIC_TERMII_API_KEY,
        pin_id: pinId,
        pin: otp,
      },
    )

    const user = await Axios.get(`/users/email/${email}`)
    if (result.data.verified) {
      const nuser = await Axios.put(`/users/update/${user?.data.user.id}`, {
        validated: 1,
      })
      return result
    } else {
      return result
    }
  } catch (error: any) {
    return { message: 'Server error' }
  }
}

export const sendWelcome = async ({
  firstName,
  email,
}: {
  firstName: string
  email: string
}) => {
  const result = await Axios.post(`/mail/welcome`, { firstName, email })
  try {
    if (result.data.message === 'SMS sent succesfully') {
      const user = await Axios.get(`/users/email/${email}`)
  
      const nuser = await Axios.put(`/users/update/${user.data.user.id}`, {
        first_time: 0,
      })
    }
    return result
  } catch (err) {
    console.log((err as any).message);
  }
}
