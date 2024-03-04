import { Images } from '@/assets'
import { regularFont } from '@/assets/fonts/fonts'
import Image from 'next/image'

const PricingCard = () => {
  return (
    <div
      className={`bg-white rounded-xl py-10 w-full flex items-center gap-[24px] px-[40px] mb-[40px] ${regularFont.className}`}
    >
      <div>
        <Image src={Images.Xclaim} alt="exclamation" width={56} height={56} />
      </div>
      <div className="flex flex-col">
        <p className="text-black text-[18px] mb-1">Pricing</p>
        <p className="text-ash_400 text-[14px]">
          NGN10,000 per candidate. Deducted only when you have successfully
          completed hiring.
        </p>
      </div>
    </div>
  )
}

export default PricingCard
