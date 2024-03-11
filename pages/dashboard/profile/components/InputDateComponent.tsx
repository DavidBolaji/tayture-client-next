import { regularFont } from '@/assets/fonts/fonts'
import { DatePicker } from 'antd'

export interface IInput {
  showIcon?: boolean
  valid?: boolean
  text?: string
  border: boolean
  focus: boolean
  picker?: any
  value?: any
  format?: any
  readonly?: boolean
}
// h-[2.9375rem] w-full border border-[rgba(35,35,35, 0.2)] outline-none focus:ring-0
function InputDateComponent({
  showIcon,
  valid,
  text,
  border,
  focus,
  picker,
  value,
  format,
  readonly,
  // million-ignore
  ...rest
}: IInput) {
  return (
    <div className="mb-[16px] flex flex-col w-full">
      <div
        className={`relative flex rounded-[0.625rem] text-black_200 h-[2.79rem] border-2 w-full focus-within:border-orange ${
          border && 'border-[#B3261E]'
        }`}
      >
        <DatePicker
          {...rest}
          picker={picker}
          format={format}
          disabled={readonly}
          className={`w-full border border-[rgba(35,35,35, 0.2)] outline-none focus:ring-0 rounded-[0.625rem] text-black_200 pl-[10px] ${regularFont.className}`}
        />
      </div>
    </div>
  )
}

export default InputDateComponent
