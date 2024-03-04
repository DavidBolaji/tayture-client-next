import { Field, FieldArray, Form, Formik } from 'formik'
import StyledInput from '@/components/Form/NomalInput/StyledInput'
import CustomPhoneInput from '@/components/Form/CustomPhoneInput/CustomPhoneInput'
import { MinusCircleOutlined } from '@ant-design/icons'
import Button from '@/components/Button/Button'
import { Space } from 'antd'
import { FaPlus } from 'react-icons/fa'
import Spinner from '@/components/Spinner/Spinner'
import { regularFont } from '@/assets/fonts/fonts'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useGlobalContext } from '@/Context/store'
import { createSchool } from '@/lib/api/school'
import { validationSchema } from '../pagez/AddSchool/AddSchoolFormAdmin/Schema/AddSchoolAdminSchema'
type ISchAdmin = {
  [key: string]: {
    sch_admin_name: string
    sch_admin_phone: string
    sch_admin_email: string
  }[]
}
const initialValues: ISchAdmin = {
  participants: [
    {
      sch_admin_name: '',
      sch_admin_email: '',
      sch_admin_phone: '',
    },
  ],
}

const PostSchoolAdminForm: React.FC<{ SW: any }> = ({ SW }) => {
  const { img, createSch, setMessage } = useGlobalContext()
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await createSchool(data)
    },
    onSuccess: async (res) => {
      queryClient.setQueryData(['schId'], res.data.school.sch_id)
      SW.next()
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })
  const handleClick: any = async (values: ISchAdmin) => {
    mutate({
      sch_logo: img,
      ...createSch,
      sch_admin: JSON.stringify(values.participants),
    })
  }

  return (
    <div className="mt-[25px]">
      <div className={`${regularFont.className} mb-[32px]`}>
        <h2 className="w-full font-br md:text-2xl mb-2">Admin information</h2>
        <p className="text-ash_400 mb-12">
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
          <Form className="w-full " onSubmit={handleSubmit}>
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
                text={isSubmitting || isPending ? <Spinner /> : 'create'}
                render="light"
                full={false}
                type="submit"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default PostSchoolAdminForm
