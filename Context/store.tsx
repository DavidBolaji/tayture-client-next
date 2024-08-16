'use client'
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  PropsWithChildren,
  useEffect,
} from 'react'
import { IUser } from '@/pages/api/users/types'
import { ques as quesData } from './data'
import { useQueryClient } from '@tanstack/react-query'

const INIT = {
  fname: '',
  lname: '',
  email: '',
  phone: '',
}
export interface IProfile extends IUser {
  id: ''
  picture: ''
  pass?: ''
  pinId?: ''
}
export type ISchData = {
  sch_no_emp: string
  sch_address: string
  sch_city: string
  sch_state: string
  sch_lga: string
  sch_url: string
  sch_phone: string
  sch_name: string
  sch_logo: string
  sch_admin: string
  sch_id?: string
}

type UIkeyz =
  | 'attentionModal'
  | 'applyModal'
  | 'paymentModal'
  | 'OTPModal'
  | 'applyLandingModal'
  | 'postLandingModal'
  | 'scheduleModal'
  | 'userProfileModal'
  | 'uploadModal'
  | 'personalModal'
  | 'educationModal'
  | 'education2Modal'
  | 'experienceModal'
  | 'experienceEditModal'
  | 'skillModal'
  | 'createSchoolModal'

interface IUi {
  attentionModal: {
    visibility: boolean
    data?: any
  }
  applyModal: {
    visibility: boolean
    data?: any
  }
  paymentModal: {
    visibility: boolean
    data?: any
  }
  OTPModal: {
    visibility: boolean
    data?: any
  }
  applyLandingModal: {
    visibility: boolean
    data?: any
  }
  postLandingModal: {
    visibility: boolean
    data?: any
  }
  scheduleModal: {
    visibility: boolean
    data?: any
  }
  userProfileModal: {
    visibility: boolean
    data?: any
  }
  uploadModal: {
    visibility: boolean
    data?: any
  }
  personalModal: {
    visibility: boolean
    data?: any
  }
  educationModal: {
    visibility: boolean
    data?: any
  }
  education2Modal: {
    visibility: boolean
    data?: any
  }
  experienceModal: {
    visibility: boolean
    data?: any
  }
  experienceEditModal: {
    visibility: boolean
    data?: any
  },
  skillModal: {
    visibility: boolean
    data?: any
  ,}
  createSchoolModal: {
    visibility: boolean
    data?: any
  }
}

const uiInit: IUi = {
  attentionModal: {
    visibility: false,
  },
  applyModal: {
    visibility: false,
  },
  paymentModal: {
    visibility: false,
  },
  OTPModal: {
    visibility: false,
  },
  applyLandingModal: {
    visibility: false,
  },
  postLandingModal: {
    visibility: false,
  },
  scheduleModal: {
    visibility: false,
  },
  userProfileModal: {
    visibility: false,
  },
  uploadModal: {
    visibility: false,
  },
  personalModal: {
    visibility: false,
  },
  educationModal: {
    visibility: false,
  },
  education2Modal: {
    visibility: false,
  },
  experienceModal: {
    visibility: false,
  },
  experienceEditModal: {
    visibility: false,
  },
  skillModal: {
    visibility: false,
  },
  createSchoolModal: {
    visibility: false,
  },
}

export interface Iques {
  id: string
  question: string
  type: 'checkbox' | 'radio' | 'slider' | 'input'
  options?: string[]
  answer?: any
  input_type?: string
  input_placeholder?: string
  min?: number
  max?: number
  required?: boolean
  score?: 0
}

export interface IQGroup {
  teacher: Iques[]
  parent: Iques[]
  'school admin': Iques[]
}

export type Ipath = ('teacher' | 'parent' | 'school admin')[]
export type Iscore = number[]

type UIState = Partial<Record<UIkeyz, { visibility: boolean; data?: any }>>

type ContextProps = {
  user: Partial<IProfile>
  message: string
  setMessage: Dispatch<SetStateAction<string>>
  setUser: Dispatch<SetStateAction<Partial<IProfile>>>
  setUI: Dispatch<SetStateAction<UIState>>
  ques: any
  setQues: any
  ui: UIState
  img: string
  setImg: Dispatch<SetStateAction<string>>
  setCreateSch: Dispatch<SetStateAction<Partial<ISchData> | null>>
  createSch: Partial<ISchData> | null
  count: number
  setCount: Dispatch<SetStateAction<number>>
  name: string
  setName: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  colorList: {
    background: string
    foreground: string
    textOne: string
    textTwo: string
    colorParagraph: string
  }
  setColors: Dispatch<
    SetStateAction<{
      background: string
      foreground: string
      textOne: string
      textTwo: string
      colorParagraph: string
    }>
  >
  defaultSchool: number,
  setDefaultSchool: Dispatch<SetStateAction<number>>
  access: boolean,
  setSchAccess: Dispatch<SetStateAction<boolean>>
}

const GlobalContext = createContext<ContextProps>({
  user: INIT,
  message: '',
  setMessage: (): string => '',
  setUser: () => {},
  setUI: () => {},
  ui: uiInit,
  setImg: (): string => '',
  img: '',
  createSch: null,
  setCreateSch: () => {},
  count: 0,
  setCount: (): number => 0,
  ques: {},
  setQues: () => {},
  name: '',
  setName: () => '',
  email: '',
  setEmail: () => '',
  colorList: {
    background: '#102a73',
    foreground: '#ffffff',
    textOne: '#ffffff',
    textTwo: '#102a73',
    colorParagraph: '#000000',
  },
  setColors: () => {},
  defaultSchool: 0,
  setDefaultSchool: () => {},
  access: false,
  setSchAccess: (data) => data
})

export const GlobalContextProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
  const [user, setUser] = useState<Partial<IProfile>>(INIT)
  const [defaultSchool, setDefaultSchool] = useState<number>(0)
  const [message, setMessage] = useState<string>('')
  const [ui, setUI] = useState<UIState>({})
  const [img, setImg] = useState<string>('')
  const [createSch, setCreateSch] = useState<Partial<ISchData> | null>(null)
  const [count, setCount] = useState<number>(0)
  const [ques, setQues] = useState<IQGroup>(quesData)
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [access, setSchAccess] = useState<boolean>(false)
  const [colorList, setColors] = useState<{
    background: string
    foreground: string
    textOne: string
    textTwo: string
    colorParagraph: string
  }>({
    background: '#102a73',
    foreground: '#ffffff',
    textOne: '#ffffff',
    textTwo: '#102a73',
    colorParagraph: '#000000',
  })

  useEffect(() => {
    const idx = localStorage.getItem('schoolIdx')
    if(!idx) return;
    setDefaultSchool(+JSON.parse(idx))
  }, [])

  useEffect(() => {
    // queryClient.refetchQueries
    localStorage.setItem('schoolIdx', JSON.stringify(defaultSchool))
  }, [defaultSchool])

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        message,
        setMessage,
        setUI,
        ui,
        img,
        setImg,
        createSch,
        setCreateSch,
        count,
        setCount,
        ques,
        setQues,
        name,
        setName,
        email,
        setEmail,
        colorList,
        setColors,
        defaultSchool,
        setDefaultSchool,
        access,
        setSchAccess
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
