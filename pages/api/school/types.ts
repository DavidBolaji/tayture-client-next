import { SchoolAdmin, Wallet } from '@prisma/client'

export interface ISchAdmin {
  sch_admin_name: string
  sch_admin_phone: string
  sch_admin_email: string
}

export interface ISchDb {
  sch_id?: number
  sch_user?: number
  sch_logo: string
  sch_name: string
  sch_no_emp: string
  sch_address: string
  sch_city: string
  sch_lga: string
  sch_state: string
  sch_url?: string
  sch_phone: string
  sch_admin?: SchoolAdmin[]
  wallet: Wallet
  sch_verified?: number
  sch_participants?: ISchAdmin[]
  // wallet?: string;
  sch_admins_str?: string
  created_at?: Date
}
