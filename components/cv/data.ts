export interface IcvValuesOne  {
  name: string;
  email: string;
  phone: string;
  summary: string;
  country: string;
  state: string;
  city: string;
  lga: string;
  linkedIn: string;
}

export const cvValuesOne = {
  name: '',
  email: '',
  phone: '',
  summary: '',
  country: '',
  state: '',
  city: '',
  lga: '',
  linkedIn: '',
}

export const cvValuesTwo = {
  skills: [],
}

export const cvValuesThree = {
  education: [],
}

export const cvValuesFour = {
  employment: [],
}

export const cvValuesfive = {
  languages: [],
}

export const cvValuesSeven = {
  hobbies: [],
}

export const cvValuesSix = {
  certificates: [],
}

export const initialSteps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'skills', title: 'Skills' },
  { id: 'education', title: 'Education' },
  { id: 'employment', title: 'Work History' },
  { id: 'languages', title: 'Languages' },
  { id: 'hobbies', title: 'Hobbies' },
  { id: 'certificates', title: 'Certificates' },
]

export const selecttheme = {
  token: {
    controlOutline: '#FFA466',
    colorLinkHover: 'none',
    colorPrimaryHover: 'none',
    colorBorder: 'transparent',
    colorPrimary: '#FF7517',
  },
}
