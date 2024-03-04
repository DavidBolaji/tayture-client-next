import { IJobSchDb, IJobSchedule } from '../job/types'

export type ISession = {
  id: string
  sessionToken: string
  userId: string
  expires: Date
  user: IUser
}
export type IProfile = {
  profile_id: string
}
export type IUser = {
  id: string
  role: 'ADMIN' | 'SUPER_ADMIN' | 'USER'
  path: string | null
  fname: string
  lname: string
  email: string
  password: string
  phone: string
  validated: number | null
  first_time: number | null
  //   profile: IProfile[];
  //   school: ISchool;
  password_reset_token: string | null
  password_reset_expires: number | null
  validation_token: string | null

  applied?: IJobSchDb[]
  schedule?: IJobSchedule[]
  //   blog_likes: IBlog[];
  //   comment_likes: IComment[];
  //   blog_comments: IBlog[];
  //   comment_comments: IComment[];
  //   wallet: IWallet;
  //   job: IJob[];
  //   notification: INotification[];
  //   sessions: ISession[];

  createdAt: Date
  updatedAt: Date
}
