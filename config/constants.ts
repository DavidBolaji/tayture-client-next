const ENVIRONMENT = {
  development: process.env.NEXT_PUBLIC_ENVIRONMENT === 'development',
  production: process.env.NEXT_PUBLIC_ENVIRONMENT === 'production',
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL
const PAYSTACK_KEY = process.env.NEXT_PUBLIC_PAYSTACK_KEY

const APP_CONSTANTS = {
  ENVIRONMENT,
  API_BASE_URL,
  PAYSTACK_KEY,
}

export const DEFAULT_APP_ROLES = {
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER ADMIN',
  USER: 'USER',
}

export const DEFAULT_PERMISSIONS = {
  ADD_MEMBER: {
    key: 'addMember',
    label: 'Add Member',
    description: '',
  },

  REMOVE_MEMBER: {
    key: 'removeMember',
    label: 'Remove Member',
    description: '',
  },

  FUND_WALLET: {
    key: 'fundWallet',
    label: 'Fund Wallet',
    description: '',
  },
  USE_WALLET: {
    key: 'useWallet',
    label: 'Use Wallet',
    description: '',
  },
  TRANSFER_TO_GROUP_WALLET: {
    key: 'transferToGroupWallet',
    label: 'View Group Account Details',
    description: '',
  },
  SELECT_FABRIC: {
    key: 'fabricSelection',
    label: 'Select Fabric',
    description: '',
  },
  ASSIGN_TAILOR: {
    key: 'assignTailor',
    label: 'Assign  Tailor',
    description: '',
  },
  CREATE_ORDERS: {
    key: 'createOrders',
    label: 'Create Orders',
    description: '',
  },
  SET_REMINDERS: {
    key: 'setReminders',
    label: 'Set Reminders',
    description: '',
  },
  SELECT_STYLE: {
    key: 'selectStyle',
    label: 'Select Style',
    description: '',
  },
  CREATE_GROUP: {
    key: 'createGroup',
    label: 'Create Group',
    description: '',
  },
  EDIT_EVENT: {
    key: 'editEvent',
    label: 'Edit Event Info',
    description: '',
  },
}

export default APP_CONSTANTS
