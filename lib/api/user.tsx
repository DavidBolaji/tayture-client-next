// import { auth, signOut } from "@/auth";

import { ILogin } from '@/pages/auth/LoginForm/LoginForm'
import { IRegister } from '@/pages/auth/registerGroup/RegisterForm/RegisterForm'
import { Axios } from '@/request/request'
import axios from 'axios'
import { signOut } from 'next-auth/react'

export type IValidate = { otp: string; id: string }

export const loginUser = async (data: ILogin) => {
  const user = await axios.post('/api/users/login/login', data)
  return user
}

export const registerUser = async (
  data: IRegister & { skip?: boolean; path?: string },
) => {
  const user = await axios.post('/api/users/register/register', data)
  return user
}
export const sendText = async (data: { otp: string; phone: string }) => {
  const result = await axios.post('/api/sms', data)
  return result
}
export const validateUser = async (data: IValidate) => {
  const result = await axios.put('/api/users/validate/validate', data)
  return result
}

export const getUser = async () => {
  const user = await Axios.get('/users/me')
  return user
}
export const getUserAndValidate = async () => {
  const user = await Axios.get('/users/me/validate')
  return user
}
export const handleSignout = async () => {
  const session = await signOut()
}
export const userSignout = async () => {
  const user = await Axios.get('/users/signout')
  return user
}

export const updateUser = async (data: string[]) => {
  const user = await Axios.put('/users/update/me', {
    path: JSON.stringify(data),
  })
  return user
}
