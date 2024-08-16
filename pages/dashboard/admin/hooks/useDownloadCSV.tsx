import React from 'react';
import { useMutation } from '@tanstack/react-query'
import { Axios } from '@/request/request'
import { saveAs } from 'file-saver'
import { FormikHelpers } from 'formik';

interface ICSV {
    start: string;
    end: string;
    school: string
}

const useDownloadCSV = () => {
  const { isPending, mutate } = useMutation({
    mutationKey: ['applied csv'],
    mutationFn: async (arg:ICSV ) => {
      const response = await Axios.post(
        '/apply/csv',
        { ...arg },
        { responseType: 'blob' },
      )
      return response.data
    },
    onSuccess: (data) => {
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
      saveAs(blob, 'applied.csv')
    },
  })

  const handleSubmit = (values:ICSV, { resetForm }: FormikHelpers<ICSV>) => {
    mutate(values)
  }

  return { isPending, handleSubmit }
}

export default useDownloadCSV
