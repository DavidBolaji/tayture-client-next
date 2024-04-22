import Button from '../Button/Button'
import { Images } from '@/assets'
import Image from 'next/image'
import { boldFont, regularFont } from '@/assets/fonts/fonts'
import { useGlobalContext } from '@/Context/store'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getUser } from '@/lib/api/user'
import HandlePayment from '../Modal/HandlePayment'
import { useState } from 'react'
import { Field, Form, Formik } from 'formik'
import StyledInput from '../Form/NomalInput/StyledInput'
import { incWallet } from '@/lib/api/wallet'
import { getUserSchool } from '@/lib/api/school'
import HandleCreateSchool from '../Modal/HandleCreateSchool'
import { FaCaretRight, FaLock } from 'react-icons/fa'
import Link from 'next/link'
import { formatNumber } from '@/utils/helpers'
import { Axios } from '@/request/request'

const WalletCard2 = () => {
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
    mutationFn: async ({amount, schoolId}: {amount: string, schoolId: string}) =>
      {
        await Axios.put('/wallet/update/me', {wallet_balance: +amount, schoolId})
      },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['school', 'allTransactions'],
      })
      
      setMessage(() => 'Wallet successfully funded')

    },
    onError: (err) => {
      setMessage(() => (err as Error).message)
    },
  })

  const pathExist = user?.path ? true : false


  let isSchAdmin =
    pathExist &&
    (JSON.parse(user!.path?.replace("'", '')!) as unknown as string[]).includes(
      'school admin',
    )
  let isHasSch = school?.sch_id.trim().length > 0 ? true : false
   
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

  const handleCreateSchool = () => {
    setUI((prev) => {
      return {
        ...prev,
        createSchoolModal: {
          ...prev.createSchoolModal,
          visibility: true,
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
    mutate({amount: amt as string, schoolId: school.sch_id})
  }

  const onFailure = () => {
    setMessage(() => 'User aborted task')
  }
  return (
    <div className={`bg-[#ffc299] h-[242px]  p-6 rounded-2xl relative overflow-hidden mb-5 ${regularFont.className}`}>
      <div className="border-b relative pb-1 border-[#666666] flex justify-between">
        <div>
          <div className={`inline-block text-[#666666] text-[12px] md:text-[16px] ${boldFont.className}`}>Wallet Balance</div>
          <div className={`md:text-[30px] text-[18px] whitespace-nowrap font-bolder text-black ${boldFont.className}`}> ₦{' '}
          {!isLoading && school?.wallet?.wallet_balance
            ? formatNumber(school?.wallet?.wallet_balance, 'NGN', {})
            : 0}</div>
        </div>
        {/* <div>
          <FaEye />
        </div> */}
      </div>
      <div className='flex flex-col gap-3 mt-3'>
        <div>
          <div className={`inline-block text-[#666666] text-[10px] md:text-[14px] ${boldFont.className}`}>Locked Balance</div>
          <div className="flex gap-2 items-center">
            <FaLock />
            <div className={boldFont.className}>
            ₦{' '}
            {!isLoading && school?.wallet?.wallet_locked_balance
            ? formatNumber(school?.wallet?.wallet_locked_balance, 'NGN', {})
            : 0}
            </div>
          </div>
        </div>
        <div className="absolute bottom-7  md:-right-6 -right-10">
        <Image
          src={Images.Wallet}
          className="md:scale-100 scale-75"
          alt="wallet"
        />
      </div>
        <div className='flex justify-end flex-col-reverse w-[120px] relative z-10'>
          <Button
            text="Topup"
            render="dark"
            hover={false}
            bold={false}
            onClick={() => (isSchAdmin ? isHasSch ? handlePayment(): handleCreateSchool() : handleShow())}
          />
        </div>
      </div>
      <Link href={'/dashboard/school/transaction'} className="absolute left-0 bottom-0 h-8 px-5 bg-[#eed2bf] text-black flex items-center w-full justify-between">
        <div>View Transactiions</div>
        <div>
          <FaCaretRight />
        </div>
      </Link>
      <HandlePayment
        onSuccess={onSuccess}
        onFailure={onFailure}
        amount={+amt}
        valid={String(amt).trim().length > 0}
      >
        <div className={`w-full ${regularFont.className}`}>
          <div className='w-full'>
            <span className="text-2xl block text-center mb-2">Wallet</span>
          </div>
          <div className={`mb-2 text-[12px]`}>
            <div className="flex bg-slate-200 w-48 mx-auto py-1 pr-2 rounded-l-md">
              <div className="flex items-center justify-between w-full pl-3">
                <p>Available Balance:</p>
                <p>₦ {!isLoading && school?.wallet?.wallet_balance}</p>
              </div>
            </div>
            <hr className="mt-1 mb-2" />
          </div>
          <label className={`inline-block ml-1 mb-2 ${regularFont.className}`}>
            Amount
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
      <HandleCreateSchool />
    </div>
  )
}

export default WalletCard2
