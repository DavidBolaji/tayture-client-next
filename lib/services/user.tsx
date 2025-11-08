import db from '@/db/db'
import { Axios } from '@/request/request'
import axios from 'axios'
import { initialize, sendMessage, sendToken, verifyToken } from '@davidbolaji/termii-node';
import { validateOTPFromDB } from './otp';

initialize(process.env.NEXT_PUBLIC_TERMII_API_KEY as string);

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

    console.log('SMS sent succesfully')
    return result.data
  } catch (error: any) {
    console.log('error: ', error)
  }
}
export const sendTextMessageOTP = async (phone: string, otp: string) => {
  try {
    const result = await sendMessage({
      to: phone.replace('+', ''),
      from: 'N-Alert',
      sms: `${otp}`,
      channel: 'dnd',
      type: "NUMERIC"
    })

    return result
  } catch (error: any) {
    console.log('error: ', error)
    throw new Error((error as Error).message)
  }
}
export const valdateOTP = async ({
  otp,
}: {
  otp: string
}) => {
  try {
    const req = await Axios.post(`/users/validate-otp`, {otp})
    const result = req.data;
    return result
  } catch (error: any) {
    console.log(error.response.data.verified)
    return { message: error.response.data.verified }
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
    console.log((err as any).message)
  }
}
