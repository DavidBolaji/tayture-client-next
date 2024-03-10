'use client'
import { Iques, useGlobalContext } from '@/Context/store'
import { createAssesement } from '@/lib/api/assesement'
import { isValidEmail } from '@/utils/helpers'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const useAssesement = () => {
  const router = useRouter()
  const [path, setPath] = useState<string[]>([])
  const { ques, setQues, name, email, setEmail, setName } = useGlobalContext()
  const [SW, setSW] = useState<any>(null)
  const [start, setStart] = useState<boolean>(true)
  const [num, setNum] = useState<number>(1)
  const [cur, setCur] = useState<number>(0)
  const [end, setEnd] = useState<boolean>(false)
  const [error, setError] = useState<string>('')
  const [visible, setVisible] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [animating, setAnimating] = useState(false)

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const submitAns = path.map((p) => ({
        [p]: ques[p].map((e: any) => ({
          ...e,
        })),
        total: Math.round(
          (ques[p]
            .filter((i: any) => i.required)
            .reduce((acc: any, cur: any) => (acc += cur.score), 0) /
            (ques[p].filter((i: any) => i.required).length * 10)) *
            100,
        ),
      }))
      return await createAssesement(submitAns)
    },
    onSuccess: () => {
      router.push('/success')
    },
  })

  const setScore = (holder: any) => {
    let p = 'teacher'
    if (holder.path === 'parent') {
      p = 'parent'
    } else if (holder.path === 'school admin') {
      p = 'school admin'
    }
    const newQues = ques[holder.path].map((res: any) => {
      if (res.id === holder.id && res.required) {
        return { ...res, score: holder.score }
      }
      if (res.id === holder.id && !res.required) {
        return { ...res, answer: holder.score }
      }
      return { ...res }
    })
    setQues(() => ({
      ...ques,
      [p]: newQues,
    }))
  }

  const handleSlideChange = (que: any, score: number | string) => {
    setScore({ ...que, score })
  }

  const handleInputChange = (que: any, score: number | string) => {
    setScore({ ...que, score })
  }

  const handleChange = (direction: string) => {
    setAnimating(true)
    if (direction === 'next') {
      setNum((prev) => prev + 1)
      if (start && num + 1 > 1) {
        setStart((prev) => !prev)
      }
      SW.next()

      if (ques[path[cur]]?.length === num + 1) {
        setEnd((prev) => !prev)
      }
    } else {
      if (!start && num - 1 === 1) {
        setStart((prev) => !prev)
      }
      SW.prev()
      setNum((prev) => prev - 1)
    }
    const t = setTimeout(() => {
      setAnimating(false)
      clearTimeout(t)
    }, 3000)
  }

  const handleSubmit = () => {
    console.log('clicked')
    if (path.length > cur + 1) {
      setVisible((prev) => !prev)
    } else {
      mutate()
    }
  }

  const handleInput = (value: string) => {
    if (start) {
      setName(() => value)
    }
    if (end) {
      setEmail(() => value)
    }
  }
  const inputBlur = (placeholder: string) => {
    if (placeholder === 'Email address') {
      if ((end && !email) || !isValidEmail(email)) {
        setError(
          !email
            ? 'Email is required'
            : 'Email is not valid, ensure there are no space characters at the end of email',
        )
      }
    }
    if (placeholder === 'First name') {
      if (start && !name) {
        setError(!name ? 'First name is required' : 'Email is not valid')
      }
    }
  }

  const handleTransition = () => {
    setLoading((prev) => !prev)
    SW.next()
    setCur((prev) => prev + 1)
    setEnd((prev) => !prev)
    setStart((prev) => !prev)
    setNum(1)
    setTimeout(() => {
      setLoading((prev) => !prev)
      setVisible((prev) => !prev)
    }, 1000)
  }

  const handlePath = (data: string[]) => {
    setPath(data)
  }

  return {
    start,
    end,
    cur,
    num,
    error,
    visible,
    loading,
    SW,
    setSW,
    path,
    name,
    email,
    animating,
    isPending,
    fn: {
      handleInput,
      handleSubmit,
      handleSlideChange,
      handleInputChange,
      handleChange,
      handlePath,
      inputBlur,
      handleTransition,
      setError,
    },
  }
}

export default useAssesement
