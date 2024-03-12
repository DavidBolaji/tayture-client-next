import { useGlobalContext } from '@/Context/store';
import Button from '@/components/Button/Button';
import Spinner from '@/components/Spinner/Spinner';
import { Axios } from '@/request/request';

import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import TagComponent from '../../TagComponent';
import { AxiosError } from 'axios';
import { IoIosCloseCircle } from 'react-icons/io';
import { Tag } from 'antd';


const SkillForm: React.FC = () => {
  const { ui, setUI, setMessage } = useGlobalContext()

   const {mutate, isPending} = useMutation({
    mutationFn: async (data:any) => {
        return await Axios.post('/users/skills/me', data)
    },
    onSuccess: (res) => {
      setUI((prev) => {
        return {
          ...prev,
          skillModal: {
            ...prev.skillModal,
            visibility: false,
          },
        }
      })
      setMessage(() => res.data.message)
      const t = setTimeout(() => {
        window.location.reload()
        clearTimeout(t)
      }, 4000)
    },
    onError: (error) => {
      setMessage(() => (error as AxiosError<{error: string}>).response?.data?.error ||(error as Error).message)
    }
   })
  const [skills, setSkill] = useState<string[]>([]);
  const handleSkill = (val: string[]) => {
    setSkill([...val]);
  };

  useEffect(() => {
    setSkill([...ui.skillModal?.data]);
  }, []);

  return (
    <div className="w-full px-10">
      <h3 className="-mt-[12px] mb-[12px] ml-1 text-[16px] font-[600]">Skills</h3>

      {skills.map((sk) => (
        <span
          onClick={() => {
            setSkill([...skills.filter((s) => s !== sk)]);
          }}
          className=" inline-block cursor-pointer w-auto group rounded-full text-center ml-2 mb-4"
          key={sk}
        >
          <div className='flex items-center justify-between'>
            <Tag color='orange'>
              {sk}
            </Tag>
            <div className=' items-center justify-end flex-end'>
              <IoIosCloseCircle size={16} color="black" />
            </div>
          </div>
        </span>
      ))}

      <div className="mt-3">
        <TagComponent setSkill={handleSkill} reset={[...skills]} />
        <div className="mt-2 text-center grid">
          <Button
            render="light"
            text={isPending ? <Spinner /> : 'Save'}
            hover
            bold={false}
            onClick={() => mutate({skill: skills})}
          />
        </div>
      </div>
    </div>
  );
};

export default SkillForm;
