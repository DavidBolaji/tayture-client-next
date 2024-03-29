import Button from '../Button/Button'
import { Images } from '@/assets'
import Image from 'next/image'
import { regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'
import HandlePayment from '../Modal/HandlePayment'
import { InputNumber, Radio } from 'antd'
import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import StyledInput from '../Form/NomalInput/StyledInput'
import { ISchDb } from '@/pages/api/school/types'
import { incWallet } from '@/lib/api/wallet'
import { getUserSchool } from '@/lib/api/school'

function WalletCard() {
  const { setUI, setMessage } = useGlobalContext()
  const queryClient = useQueryClient()
  const { data: school, isLoading } = useQuery({
    queryKey: ['school'],
    queryFn: async () => {
      const req = await getUserSchool()
      return req.data.school
    },
  })
  const [amt, setAmt] = useState<string | number>('')
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const req = await getUser()
      return req.data.user
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: async (amount: string) =>
      await incWallet({
        wallet_balance: +amount,
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ['school'],
      })
      handlePayment()
      setMessage(() => 'Wallet successfully funded')
    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
      handlePayment()
    },
  })

  const pathExist = user?.path ? true : false

  let isSchAdmin =
    pathExist &&
    (JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]).includes(
      'school admin',
    )

  const handleShow = () => {
    setUI((prev) => {
      return {
        ...prev,
        attentionModal: {
          ...prev.attentionModal,
          visibility: !prev.attentionModal?.visibility,
        },
      }
    })
  }

  const handlePayment = () => {
    setUI((prev) => {
      return {
        ...prev,
        paymentModal: {
          ...prev.paymentModal,
          visibility: !prev.paymentModal?.visibility,
        },
      }
    })
  }
  const onSuccess = () => {
    mutate(amt as string)
  }

  const onFailure = () => {
    setMessage(() => 'Network Error!!!, please try again after a while')
  }
  return (
    <div className="bg-[#FFC299;] h-[202px] overflow-hidden grid-cols-7 rounded-[18px] py-[28px] md:px-[40px] px-5 flex items-center justify-between mb-[32px] relative">
      <div
        className={`font-[600] text-[24px] col-span-5 max-w-[425px] ${regularFont.className}`}
      >
        <span className="inline-block text-[#666666] text-[12px] md:text-[16px]">
          Wallet balance
        </span>
        <p className="md:text-[40px] mb-[16px] text-[18px] whitespace-nowrap font-bolder text-black">
          ₦{' '}
          {!isLoading && school?.wallet?.wallet_balance
            ? school?.wallet?.wallet_balance
            : 0}
        </p>
        <div className="scale-[0.65] -translate-x-8 -translate-y-3">
          <Button
            text="Topup"
            render="dark"
            hover={false}
            bold={false}
            onClick={() => (isSchAdmin ? handlePayment() : handleShow())}
          />
        </div>
      </div>
      <div className="absolute dsm:bottom-0 md:right-10 -right-10">
        <Image
          src={Images.Wallet}
          className="md:scale-100 scale-75"
          alt="wallet"
        />
      </div>
      <HandlePayment
        onSuccess={onSuccess}
        onFailure={onFailure}
        amount={+amt}
        valid={String(amt).trim().length > 0}
      >
        <div className={`my-5  ${regularFont.className}`}>
          <div>
            <span className="text-2xl">Wallet</span>
          </div>
          <div className={`mb-2 text-[12px]`}>
            <div className="flex justify-end bg-slate-200 w-48 ml-auto py-1 pr-2 rounded-l-md">
              <div className="flex items-center justify-between w-full pl-3">
                <p>Available Balance:</p>
                <p>₦ {!isLoading && school?.wallet?.wallet_balance}</p>
              </div>
            </div>
            <hr className="mt-1 mb-8" />
          </div>
          <label className={`inline-block ml-1 mb-2 ${regularFont.className}`}>
            Fund Wallet Amount
          </label>

          <Formik
            onSubmit={(data: any) => {
              setAmt(data.amount)
            }}
            initialValues={{
              amount: '',
            }}
          >
            {({ handleSubmit }) => (
              <Form onChange={handleSubmit}>
                <Field name="amount" as={StyledInput} type="num" />
              </Form>
            )}
          </Formik>
        </div>
      </HandlePayment>
    </div>
  )
}

export default WalletCard
