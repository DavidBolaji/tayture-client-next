import { Images } from '@/assets'
import React, { ChangeEvent, FC, useEffect, useRef, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { useGlobalContext } from '@/Context/store'
import axios from 'axios'
import { FaAsterisk } from 'react-icons/fa'

const UploadComponent: FC<{ image?: string, blog?:boolean }> = ({ image, blog = false }) => {
  const uploadRef = useRef<HTMLImageElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const { setMessage, setImg, img } = useGlobalContext()
  
  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    setLoading((prev) => !prev)
    const inputElement = event.target
    const files = inputElement.files

    if (files && files.length > 0) {
      const selectedFile = files[0]

      const formData = new FormData()
      formData.append('file', selectedFile)
      formData.append(
        'upload_preset',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`,
      )

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dhwlkhbet/auto/upload',
          formData,
        )
        const { secure_url } = response.data
        if (uploadRef.current?.src) {
          uploadRef.current.src = secure_url
          setImg(() => secure_url)
        }
      } catch (error: any) {
        setMessage(() => `Error uploading banner: ${error.message}`)
      } finally {
        setLoading((prev) => !prev)
      }
    }
  }

  useEffect(() => {
    if (uploadRef.current) {
      if (typeof image === 'undefined' || image.trim().length < 1) {
        uploadRef.current.src = "http://res.cloudinary.com/dhwlkhbet/image/upload/c_crop,g_north_east,h_250,w_200/v1696257245/tayture/tabler_photo.png"
      } else {
        uploadRef.current.src = image
        setImg(() => image)
      }
    }
  }, [image, setImg])
  return (
    <div>
      <div className="relative bg-[#D9D9D9] cursor-pointer mb-[24px] text-center w-[120px]  overflow-hidden h-[120px] rounded-full">
        <label
          htmlFor="upload"
          className="w-[120px] h-[120px] rounded-full inline-block"
        >
          <img
            ref={uploadRef}
            /**@ts-ignore */
            src={
              typeof image === 'undefined' || image.trim().length < 1
                ? 'http://res.cloudinary.com/dhwlkhbet/image/upload/c_crop,g_north_east,h_250,w_200/v1696257245/tayture/tabler_photo.png'
                : image
            }
            alt=""
            className="object-cover w-full h-full"
          />
               
          <input
            ref={inputRef}
            id="upload"
            type="file"
            accept=".png, .jpg, .jpeg"
            hidden
            onChange={handleUpload}
          />
          {loading && (
            <div className="absolute top-[40%] left-[40%]">
              <Spinner color="#FF7517" />{' '}
            </div>
          )}
           
        </label>
      </div>
      <p className='-mt-5 mb-5 whitespace-nowrap w-full -ml-2 flex items-center justify-center gap-1'>
        <FaAsterisk color="red" size={12} />
        <span className='text-xs italic'>{blog ? 'Blog banner' : 'Logo'} is required</span>
      </p>
      <div className="sm:flex relative justify-between -ml-16 max-w-[200px] hidden">

        <button
          onClick={() => inputRef.current?.click()}
          className="mr-3 px-[20px] text-[12px] py-[8px] bg-black text-white rounded-full whitespace-nowrap"
        >
          Change photo
        </button>
        <button
          onClick={() => (uploadRef.current!.src = ' ')}
          className="ml-3 px-[20px] text-[12px] py-[8px] border border-black rounded-full whitespace-nowrap"
        >
          Remove photo
        </button>
      </div>
      <div className="sm:hidden flex flex-col space-y-2">

        <button
          onClick={() => inputRef.current?.click()}
          className="px-[20px] text-[12px] py-[8px] bg-black text-white rounded-full whitespace-nowrap"
        >
          Change photo
        </button>
        <button
          onClick={() => (uploadRef.current!.src = ' ')}
          className="px-[20px] text-[12px] py-[8px] border border-black rounded-full whitespace-nowrap"
        >
          Remove photo
        </button>
      </div>
    </div>
  )
}

export default UploadComponent
