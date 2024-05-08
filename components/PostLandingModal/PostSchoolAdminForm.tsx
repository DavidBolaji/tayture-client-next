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
import { User } from '@prisma/client'
type ISchAdmin = {
  [key: string]: {
    sch_admin_name: string
    sch_admin_phone: string
    sch_admin_email: string
  }[]
}


const PostSchoolAdminForm: React.FC<{ SW: any; move?: boolean }> = ({
  SW,
  move = true,
}) => {
  const { img, createSch, setMessage, setUI, defaultSchool } = useGlobalContext()
  const queryClient = useQueryClient();
  const user = queryClient.getQueryData(['user']) as User

  const initialValues: ISchAdmin = {
    participants: [
      {
        sch_admin_name: typeof user !== "undefined" ? `${user?.fname} ${user?.lname}`: "",
        sch_admin_email: typeof user !== "undefined" ? user?.email : "",
        sch_admin_phone: typeof user !== "undefined" ? user?.phone : "",
      },
    ],
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      return await createSchool(data)
    },
    onSuccess: async (res) => {
      queryClient.setQueryData(['schId'], res.data.school.sch_id)
      if (move) {
        SW.next()
      } else {
        setUI((prev) => {
          return {
            ...prev,
            createSchoolModal: {
              ...prev.createSchoolModal,
              visibility: false,
            },
          }
        })
        queryClient.setQueryData(['school'], res.data.school[defaultSchool])
        queryClient.invalidateQueries({
          queryKey: ['school'],
        })

        setMessage(
          () =>
            'Hurray!!!, school created succesfully, you can now fund wallet',
        )
        const t = setTimeout(() => {
          setMessage(() => '')
          setUI((prev) => {
            return {
              ...prev,
              paymentModal: {
                ...prev.paymentModal,
                visibility: !prev.paymentModal?.visibility,
              },
            }
          })
        }, 3000)
      }
    },
    onError: (err) => {
      setUI((prev) => {
        return {
          ...prev,
          createSchoolModal: {
            ...prev.createSchoolModal,
            visibility: false,
          },
        }
      })
      setMessage(() => (err as Error).message)
      const t = setTimeout(() => {
        setMessage(() => '')
      }, 2000)
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
    <div id="create" className="mt-[25px] w-full text-center">
      <div className={`${regularFont.className} mb-[32px]`}>
      <h3 className="md:text-[24px] text-[20px] text-center font-[600] text-black_400">
          Add Account Admin
        </h3>
        <p className="text-ash_400 mb-12 text-center">
          Administrators help manage your school&apos;s account on Tayture. Add now.
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

                 <div className='text-left'>
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
                 </div>
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
    </div>
  )
}

export default PostSchoolAdminForm
