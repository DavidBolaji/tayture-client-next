import axios from 'axios'

const link = process.env.NEXT_PUBLIC_CLOUDINARY_URL

const Cloudinary = axios.create({
  baseURL: link,
})

export default Cloudinary
