export interface IJobSchDb {
  job_id: string
  jobId: string
  job_role: string
  job_active: string
  job_title: string
  job_desc: string
  job_min_sal: string
  job_max_sal: string
  job_exp: string
  job_qual: string
  job_resumption: string
  job_no_hires: string
  jobSchoolId: string
  assessmentId: string
  jobUserzId: String
  createdAt: Date | string
  updatedAt?: Date
  tag: string
  school: {
    sch_id: string
    sch_city: string
    sch_state: string
    sch_lga: string
    sch_address: string
    landmark: string
  }
  applied: { id: string }[]
}

export interface IinvitedDb {
  sel_interview_address?: string
  sel_interview_city?: string
  sel_interview_date?: Date
  sel_interview_lga?: string
  sel_interview_reason?: string
  sel_interview_state?: string
  sel_interview_status?: string
  sel_interview_time?: Date
  sel_interview_mode?: string
  job?: IJobSchDb
}

export interface IJobSchedule {
  id: String
  date: string
  mode: 'virtal' | 'in-person'
  time: string
  status: 'PENDING' | 'ACCEPTED'
  city?: string
  state?: string
  lga?: string
  address?: string
  link?: string
  hiredAdmin?: boolean
}
