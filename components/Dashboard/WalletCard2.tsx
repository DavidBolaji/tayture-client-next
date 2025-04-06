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
import { getUserSchool, getUserSchoolAdmin } from '@/lib/api/school'
import HandleCreateSchool from '../Modal/HandleCreateSchool'
import { FaCaretRight, FaLock } from 'react-icons/fa'
import Link from 'next/link'
import { formatNumber, sleep } from '@/utils/helpers'
import { Axios } from '@/request/request'
import { useRouter } from 'next/router'
import { CopyFilled, CopyOutlined } from '@ant-design/icons'
import { GiBanknote } from 'react-icons/gi'

const WalletCard2 = () => {
  const { setUI, setMessage, defaultSchool, access } = useGlobalContext()
  const queryClient = useQueryClient()
  const { data: permission } = useQuery({
    queryKey: ['permission'],
    queryFn: async () => {
      return queryClient.getQueryData(['permission'])
    },
  })
  const permissionGranted = permission !== 'limited'
  const router = useRouter()

  const { data: school, isLoading } = useQuery({
    queryKey: ['school'],
    queryFn: async () => {
      if (permissionGranted) {
        const req = await getUserSchool()
        return req.data.school[defaultSchool]
      } else {
        const req = await getUserSchoolAdmin()
        return req.data.school[defaultSchool]
      }
    },
    // enabled: !!permission
  })
  const [amt, setAmt] = useState<string | number>('')
  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (permissionGranted) {
        const req = await getUser()
        return req.data.user
      }
      return queryClient.getQueryData(['user'])
    },
    enabled: !!permission,
  })

  const { mutate } = useMutation({
    mutationFn: async ({
      amount,
      schoolId,
    }: {
      amount: string
      schoolId: string
    }) => {
      if (permissionGranted) {
        return await Axios.put(
          `/wallet/update/me?defaultSchool=${defaultSchool}`,
          { wallet_balance: +amount, schoolId },
        )
      }
      return await Axios.put(
        `/wallet/update/me/limit?defaultSchool=${defaultSchool}`,
        { wallet_balance: +amount, schoolId },
      )
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: ['school', 'allTransactions'],
      })

      setMessage(() => 'Wallet successfully funded')
      console.log('got here')
      await sleep(2000)
      router.replace(router.asPath)
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
      console.log(prev)
      return {
        ...prev,
        createSchoolModal: {
          ...prev?.createSchoolModal,
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
    mutate({ amount: amt as string, schoolId: school.sch_id })
  }

  const onFailure = () => {
    setMessage(() => 'User aborted task')
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText('')
    alert('Account number copied!')
  }

  return (
    <div
      className={`bg-[#ffc299] 
         
         p-6 rounded-2xl relative overflow-hidden mb-5 ${regularFont.className}`}
    >
      <div className="border-b relative pb-1 border-[#666666] flex justify-between">
        <div>
          <div
            className={`inline-block text-[#666666] text-[12px] md:text-[16px] ${boldFont.className}`}
          >
            Wallet Balance
          </div>
          <div
            className={`md:text-[30px] text-[18px] whitespace-nowrap font-bolder text-black ${boldFont.className}`}
          >
            {' '}
            ₦{' '}
            {!isLoading && school?.wallet?.wallet_balance
              ? formatNumber(school?.wallet?.wallet_balance, 'NGN', {})
              : 0}
          </div>
        </div>
        <div className="flex justify-end flex-col-reverse w-[120px] relative z-10">
          <Button
            disabled={!access}
            text="Topup"
            render="dark"
            hover={false}
            bold={false}
            onClick={() =>
              isSchAdmin
                ? isHasSch
                  ? handlePayment()
                  : handleCreateSchool()
                : handleShow()
            }
          />
        </div>
      </div>
      <div className="flex flex-col gap-3 mt-3 ">
        <div className="border-b relative pb-3 border-[#666666]">
          <div
            className={`inline-block text-[#666666] text-[10px] md:text-[14px] ${boldFont.className}`}
          >
            Locked Balance
          </div>
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
        <div className="flex flex-col space-y-2 pb-4  rounded-lg">
          <p className="text-gray-700 text-sm">Fund via Transfer</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900 font-semibold">
                {school?.account[0]?.bankName}
              </p>
              <p className="text-lg font-bold tracking-wide">
                {school?.account[0]?.accountNumber}
              </p>
            </div>
            <button onClick={copyToClipboard}>
              <CopyFilled className="w-4 bg-white h-4 mr-1" /> Copy
            </button>
          </div>
        </div>

        <div className="absolute bottom-7  md:-right-6 -right-10">
          <Image
            src={Images.Wallet}
            className="md:scale-100 scale-75"
            alt="wallet"
          />
        </div>
      </div>
      <Link
        href={'/dashboard/school/transaction'}
        className="absolute left-0 bottom-0 h-8 px-5 bg-[#eed2bf] text-black flex items-center w-full justify-between"
      >
        <div>View Transactions</div>
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
          <div className="w-full">
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
    // <div className="bg-orange-100 p-5 rounded-2xl shadow-md">
    //   <div className="flex flex-col space-y-4">
    //     <div className="flex justify-between items-center">
    //       <div>
    //         <h3 className="text-lg font-semibold text-gray-800">
    //           Wallet Balance
    //         </h3>
    //         <p className="text-2xl font-bold text-gray-900">₦ {2323232}</p>
    //       </div>
    //       <img src="/wallet.png" alt="Wallet" className="w-20 h-20" />
    //     </div>

    //     <div className="flex justify-between text-sm text-gray-600">
    //       <p>Locked Balance</p>
    //       <p>🔒 ₦ 50,000</p>
    //     </div>

    //     <hr className="border-gray-300" />

    //     <div className="flex flex-col space-y-2 bg-white p-3 rounded-lg shadow-sm">
    //       <p className="text-gray-700 text-sm">Fund via Transfer</p>
    //       <div className="flex items-center justify-between">
    //         <div>
    //           <p className="text-gray-900 font-semibold">{'Test bank'}</p>
    //           <p className="text-lg font-bold tracking-wide">
    //             {'006574534343'}
    //           </p>
    //         </div>
    //         <button onClick={copyToClipboard}>
    //           <CopyOutlined className="w-4 h-4 mr-1" /> Copy
    //         </button>
    //       </div>
    //     </div>

    //     <button className="w-full bg-black text-white">Top Up</button>

    //     <div className="text-center text-sm text-gray-600 mt-2">
    //       <a
    //         href="#"
    //         className="text-black font-semibold flex items-center justify-center"
    //       >
    //         <GiBanknote className="w-4 h-4 mr-1" /> View Transactions
    //       </a>
    //     </div>
    //   </div>
    // </div>
  )
}

export default WalletCard2
