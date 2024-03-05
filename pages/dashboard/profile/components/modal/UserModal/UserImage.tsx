import { message, Upload } from 'antd'
import type { UploadFile } from 'antd/es/upload/interface'
import { LoadingOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { useGlobalContext } from '@/Context/store'
import Cloudinary from '@/request/cloudinary'
import { Icons } from '@/assets'

export interface IUpload {
  public_id: string
  asset_id: string
  existing?: boolean
}

export interface Iimg extends IUpload {
  image: string
}

const UserImage: React.FC<{ picture: string | null }> = ({ picture }) => {
  const [loading, setLoading] = useState(false)
  const [, setImage] = useState<Iimg[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { setMessage, setImg } = useGlobalContext()
  const [imageUrl, setImageUrl] = useState<string>(picture ?? '')

  const beforeUpload = async (file: any, x: any) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      setMessage(() => 'You can only upload JPG/PNG file!')
      return
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      setMessage(() => 'Image must smaller than 2MB!')
      return
    }
    setFileList([...x])
    setLoading((prev) => !prev)
    for (let i = 0; i < x.length; i++) {
      const formData = new FormData()
      formData.append(
        'upload_preset',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`,
      )
      const newFileName = `prefix_${uuid()}_${file.name}`
      formData.append('file', x[i], newFileName)

      try {
        const res = await Cloudinary.post('/image/upload', formData)
        const { secure_url, public_id, asset_id, existing } = res.data
        console.log(public_id)

        // Modify the secure_url to include Cloudinary transformations
        const cloudinaryTransformations = 'c_thumb,g_faces,w_200,h_200,z_0.7' // Add your desired transformations here
        const imageUrlWithTransformations = `${secure_url.replace(
          '/upload/',
          `/upload/${cloudinaryTransformations}/`,
        )}`

        setImage((prev) => [
          ...prev,
          {
            image: imageUrlWithTransformations,
            public_id,
            asset_id,
            existing,
          },
        ])
        setImageUrl(imageUrlWithTransformations)
        setImg(() => imageUrlWithTransformations)
        console.log(imageUrlWithTransformations)
      } catch (err: any) {
        message.error(err)
      }
      setLoading((prev) => !prev)
    }
    return false
  }

  const remove = (file: any) => {
    const index = fileList.indexOf(file)
    const newFileList = fileList.slice()
    newFileList.splice(index, 1)
    setFileList(newFileList)
  }

  const uploadButton = (
    <div className=" absolute w-full -left-[50px] -bottom-[50px]">
      <button className="px-[12px] py-[8px] bg-black_400 text-white rounded-[15px]">
        Change photo
      </button>
    </div>
  )

  return (
    <div className=" flex justify-center items-center flex-col relative">
      <Upload
        name="avatar"
        onRemove={remove}
        className="avatar-uploader"
        showUploadList={false}
        fileList={fileList}
        beforeUpload={beforeUpload}
      >
        {imageUrl.length > 1 ? (
          <div className="overflow-hidden w-[150px] h-[150px]">
            <img
              src={imageUrl}
              alt=""
              className="w-full rounded-full h-full object-cover"
            />
          </div>
        ) : !loading ? (
          <Icons.ImageIcon />
        ) : (
          ''
        )}
        <div className="">{uploadButton}</div>
        <div className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[100%]">
          {loading && <LoadingOutlined />}
        </div>
      </Upload>
      <button
        onClick={() => setImageUrl('')}
        className="px-[24px] absolute border border-black py-[8px] bg-transparent text-black rounded-[15px] -right-[60px] -bottom-[50px]"
      >
        Remove
      </button>
    </div>
  )
}

export default UserImage
