import React from 'react'
import { IMatchedCardAppliedItem } from './MatchedCardAppliedItem'
import { Field, Formik } from 'formik'
import { SelectInput } from '@/components/Form/SelectInput/SelectInput'
import { ratings } from '@/utils/data'
import { Axios } from '@/request/request'
import { getAppliedJobUsers } from '@/lib/api/matched'
import { useMatchedContet } from '@/Context/matchedCard/matched-card-context'
import { useQueryClient } from '@tanstack/react-query'

const MatchedCardAppliedItemRating: React.FC<IMatchedCardAppliedItem> = ({
  match,
}) => {
  const { cur } = useMatchedContet()
  const queryClient = useQueryClient()

  const onSubmit = async (rating: number) => {
    try {
      await Axios.put(`/apply/update/${match.id}`, { rating })
      const req = await getAppliedJobUsers(cur.job.job_id as string)

      queryClient.setQueryData(
        [`job/${cur.job.job_id}`],
        () => req.data.applied,
      )
    } catch (err) {
      console.log((err as Error).message)
    }
  }

  const valid = (values: any) => {
    const errors: { rating?: number } = {}
    const { rating } = values
    if (match.rating !== rating) {
      onSubmit(rating)
    }
    return errors
  }

  return (
    <Formik
      initialValues={{
        rating: match.rating ?? 0,
      }}
      enableReinitialize
      onSubmit={() => {}}
      validate={valid}
    >
      {({}) => <Field as={SelectInput} options={ratings} name={'rating'} />}
    </Formik>
  )
}

export default MatchedCardAppliedItemRating
