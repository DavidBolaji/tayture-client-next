import { regularFont } from '@/assets/fonts/fonts'
import FormError from '@/components/Form/FormError/FormError'
import styled from '@emotion/styled'
import { Select, SelectProps } from 'antd'
import { DefaultOptionType } from 'antd/es/cascader'
import { BaseOptionType } from 'antd/es/select'
import { ErrorMessage, useFormikContext } from 'formik'

const { Option } = Select

export type ISelect = Omit<
  SelectProps<unknown, BaseOptionType | DefaultOptionType>,
  'mode' | 'getInputElement' | 'getRawInputElement' | 'backfill' | 'placement'
> & {
  name: string
  option: { key: string; value: string }[]
  placeholder?: string
  overide?: boolean
}

const StyledSelect = styled(Select)`
  && {
    .ant-select-selector {
      border: none !important;
    }
  }
`

export const SelectInput: React.FC<ISelect> = ({
  name,
  option,
  placeholder,
  overide,
  ...rest
}) => {
  const {
    getFieldProps,
    handleBlur,
    getFieldMeta,
    isValidating,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext()

  const fieldProps = getFieldProps(name!)
  const { error, touched } = getFieldMeta(name!)

  if (!fieldProps) {
    return null
  }

  return (
    <div className="mb-12">
      <div
        className={`focus-within:border-orange border-2 rounded-[0.625rem] ${
          error && touched && 'border-[#b3261e] border-2'
        }`}
      >
        <StyledSelect
          {...rest}
          loading={isValidating}
          onChange={
            !overide
              ? (e) => {
                  setFieldValue(name!, e)
                }
              : (e) => (rest as { onChange: (e: any) => void }).onChange(e)
          }
          size="large"
          onBlur={
            !overide
              ? (e) => {
                  handleBlur(e)
                  setFieldTouched(name!)
                }
              : (e) => (rest as { onBlur: (e: any) => void }).onBlur(e)!
          }
          className={`w-full h-full ring-transparent -font-br ${regularFont.className}`}
          optionFilterProp="children"
        >
          <Option value="" className={`text-ash_400 ${regularFont.className}`}>
            {placeholder}
          </Option>
          {option?.map((st) => (
            <Option
              key={st.key}
              value={st.key}
              className={`${regularFont.className}`}
            >
              {st.value}
            </Option>
          ))}
        </StyledSelect>
      </div>
      <ErrorMessage name={name!}>
        {(msg) => <FormError msg={msg} />}
      </ErrorMessage>
    </div>
  )
}
