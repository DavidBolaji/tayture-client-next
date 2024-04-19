import { useGlobalContext } from '@/Context/store';
import { Images } from '@/assets';
import Spinner from '@/components/Spinner/Spinner'
import Cloudinary from '@/request/cloudinary';
import Image from 'next/image';
import React, { ChangeEvent, useRef, useState } from 'react'

const BlogBanner = () => {
    const blogBannerRef = useRef<HTMLImageElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null); // State to hold the image source

    const { setMessage, setImg } = useGlobalContext();
    
    const handleBannerUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        const inputElement = event.target;
        const files = inputElement.files;
    
        if (files && files.length > 0) {
            const selectedFile = files[0];
    
            const formData = new FormData();
            formData.append('file', selectedFile);
            formData.append('upload_preset', `${process.env.NEXT_PUBLIC_CLOUDINARY_PRESET}`);
    
            try {
                const response = await Cloudinary.post('/auto/upload', formData);
                const { secure_url } = response.data;
                setImg(secure_url)
                setImageSrc(secure_url); // Set the image source
            } catch (error: any) {
                setMessage(`Error uploading banner: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
    };
  
    return (
        <div className="relative aspect-video bg-white border-2 border-orange hover:opacity-80">
            <label htmlFor="uploadBanner" className="h-full w-full">
                <Image
                    src={imageSrc || Images.BlogBanner} // Use uploaded image source if available, else use default
                    ref={blogBannerRef}
                    alt='banner'
                    width={400}
                    height={400}
                    className="z-20 w-full h-full object-cover"
                />
                <input
                    id="uploadBanner"
                    type="file"
                    accept=".png, .jpg, .jpeg"
                    hidden
                    onChange={handleBannerUpload}
                />
            </label>
            {loading && (
                <div className="absolute top-[50%] left-[50%] scale-[2]">
                    <Spinner color="#FF7517" />{' '}
                </div>
            )}
        </div>
    );
}

export default BlogBanner;
