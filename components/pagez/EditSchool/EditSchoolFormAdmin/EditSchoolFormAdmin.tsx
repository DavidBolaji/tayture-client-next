import { Field, FieldArray, Form, Formik, FormikHelpers } from 'formik'

import StyledInput from '@/components/Form/NomalInput/StyledInput'
import CustomPhoneInput from '@/components/Form/CustomPhoneInput/CustomPhoneInput'
import { MinusCircleOutlined } from '@ant-design/icons'
import Button from '@/components/Button/Button'
import { Space } from 'antd'
import { FaPlus } from 'react-icons/fa'
import Spinner from '@/components/Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ISchData, useGlobalContext } from '@/Context/store'
import { createSchool, updateSchool } from '@/lib/api/school'
import { useRouter } from 'next/router'
import { validationSchema } from './Schema/EditSchoolAdminSchema'
type ISchaAdminData = {
  sch_admin_name: string
  sch_admin_phone: string
  sch_admin_email: string
}[]
type ISchAdmin = {
  [key: string]: ISchaAdminData
}

const formatVal2 = (data: ISchData) => {
  const participants = data.sch_admin as unknown as ISchaAdminData
  return {
    participants,
  }
}

const EditSchoolFormAdmin: React.FC = () => {
  const { img, createSch, setMessage, setImg, setCreateSch } =
    useGlobalContext()
  const router = useRouter()
  const queryClient = useQueryClient()
  const sch = queryClient.getQueryData(['school']) as ISchData
  const initialValues = formatVal2(sch)
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await updateSchool(data)
    },
    onSuccess: async (res) => {
      const school = res.data.school
      setMessage(() => res.data.message)
      router.push('/dashboard/school')
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })

      setImg(() => '')
      setCreateSch(() => null)
      return school
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })
  const handleClick: any = async (
    values: ISchAdmin,
    { resetForm }: FormikHelpers<ISchAdmin>,
  ) => {
    mutate({
      sch_logo: img.trim().length > 3 ? img : sch.sch_logo,
      ...createSch,
      sch_admin: JSON.stringify(values.participants),
    })
    resetForm()
  }

  return (
    <>
      <div className={`${regularFont.className} mb-[32px]`}>
        <h2 className="w-full font-br">Admin information</h2>
        <p className="text-ash_400">
          We recommend you add at least 2 admin details
        </p>
      </div>
      <Formik
        validateOnMount={true}
        initialValues={initialValues}
        onSubmit={handleClick}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, isSubmitting, isValid }) => (
          <Form className="w-full" onSubmit={handleSubmit}>
            <FieldArray name="participants">
              {({ push, remove }) => (
                <>
                  {values.participants.map((_, ind) => (
                    <div key={ind} className="relative">
                      <Field
                        name={`participants[${ind}].sch_admin_name`}
                        as={StyledInput}
                        placeholder="Admin Name"
                        type="text"
                        text="Admin Name"
                      />
                      <div className="relative">
                        <Field
                          name={`participants[${ind}].sch_admin_phone`}
                          as={CustomPhoneInput}
                          placeholder="Admin Phone"
                          type="text"
                          text="Admin phone"
                        />
                      </div>
                      <Field
                        name={`participants[${ind}].sch_admin_email`}
                        as={StyledInput}
                        placeholder="Admin Email"
                        type="email"
                        text="Admin Email"
                      />

                      {ind === 0 ? null : (
                        <div className="flex items-center justify-end absolute -top-6 right-1">
                          <MinusCircleOutlined onClick={() => remove(ind)} />
                        </div>
                      )}
                    </div>
                  ))}

                  <Button
                    render="light"
                    transparent
                    onClick={() =>
                      push({
                        sch_admin_name: '',
                        sch_admin_email: '',
                        sch_admin_phone: '',
                      })
                    }
                    bold={false}
                    rounded
                    text={
                      <Space>
                        <FaPlus color="#FF7517" />
                        <span className="text-[16px] text-orange">
                          Another Admin
                        </span>
                      </Space>
                    }
                  />
                </>
              )}
            </FieldArray>
            <div className="justify-center flex mt-10">
              <Button
                disabled={isSubmitting || !isValid || isPending}
                bold={false}
                hover={!(isSubmitting || !isValid)}
                text={isSubmitting || isPending ? <Spinner /> : 'Create'}
                render="light"
                full={false}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default EditSchoolFormAdmin
