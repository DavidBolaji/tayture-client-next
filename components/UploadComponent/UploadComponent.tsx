import { Images } from '@/assets'
import React, { ChangeEvent, FC, useRef, useState } from 'react'
import Spinner from '../Spinner/Spinner'
import { useGlobalContext } from '@/Context/store'
import axios from 'axios'

const UploadComponent: FC<{ image?: string }> = ({ image }) => {
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
              typeof image === 'undefined'
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
      <div className="flex justify-between -ml-16 max-w-[200px]">
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
    </div>
  )
}

export default UploadComponent
