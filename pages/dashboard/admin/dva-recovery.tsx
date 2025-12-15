import React, { useState } from 'react'
import { Input, Button, Card, message, Typography } from 'antd'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { regularFont } from '@/assets/fonts/fonts'

const { Title, Text } = Typography

interface RecoveryResponse {
  message: string
  reference?: string
}

const DVARecoveryPage = () => {
  const [reference, setReference] = useState('')

  const { mutate: recoverPayment, isPending } = useMutation({
    mutationFn: async (ref: string) => {
      const response = await axios.post('/api/dva/admin/recover', {
        reference: ref,
      })
      return response.data as RecoveryResponse
    },
    onSuccess: (data) => {
      message.success(data.message)
      setReference('')
    },
    onError: (error: any) => {
      const errorMessage = error.response?.data?.message || 'Failed to recover transaction'
      message.error(errorMessage)
    },
  })

  const handleSubmit = () => {
    if (!reference.trim()) {
      message.warning('Please enter a transaction reference')
      return
    }
    recoverPayment(reference.trim())
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  return (
    <div className={`min-h-screen bg-gray-50 p-6 ${regularFont.className}`}>
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-sm">
          <div className="text-center mb-8">
            <Title level={2} className="text-gray-800 mb-2">
              DVA Payment Recovery
            </Title>
            <Text type="secondary" className="text-base">
              Re-trigger failed payment processing for DVA transactions
            </Text>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Reference
              </label>
              <Input
                size="large"
                placeholder="Enter transaction reference (e.g., T123456789)"
                value={reference}
                onChange={(e) => setReference(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isPending}
                className="w-full"
              />
              <Text type="secondary" className="text-xs mt-1 block">
                Enter the Paystack transaction reference to recover
              </Text>
            </div>

            <Button
              type="primary"
              size="large"
              loading={isPending}
              onClick={handleSubmit}
              disabled={!reference.trim()}
              className="w-full bg-orange hover:bg-orange-600 border-orange"
            >
              {isPending ? 'Processing...' : 'Recover Payment'}
            </Button>
          </div>

          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <Text type="warning" className="text-sm">
              <strong>Warning:</strong> This action will re-process the payment if it was successful on Paystack but failed to update the wallet. 
              Only use this for legitimate failed transactions.
            </Text>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default DVARecoveryPage