import { MessageState, MessageType } from '@/Context/store'

/**
 * Helper functions to create message objects with appropriate types
 */

export const createSuccessMessage = (text: string): MessageState => ({
  text,
  type: 'success'
})

export const createErrorMessage = (text: string): MessageState => ({
  text,
  type: 'error'
})

export const createInfoMessage = (text: string): MessageState => ({
  text,
  type: 'info'
})

export const clearMessage = (): MessageState => ({
  text: '',
  type: 'info'
})