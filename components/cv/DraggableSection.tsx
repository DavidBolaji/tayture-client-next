import { useCallback, useState } from 'react'
import { FormikProps, FieldArray, Field } from 'formik'
import { useDrag, useDrop } from 'react-dnd'
import Button from '../Button/Button'
import { FaAngleDown, FaAngleUp, FaPlus } from 'react-icons/fa'
import StyledInput from '../Form/NomalInput/StyledInput'

import SkillCvForm from './forms/SkillCvForm'
import EducationCVForm from './forms/EducationCVForm'
import EmployementCVForm from './forms/EmployementCVForm'
import CertificateCVForm from './forms/CertificateCVForm'

interface DraggableSectionProps {
  name: string
  formik: FormikProps<any>
}

export interface ICVForm {
  name: string
  index: number
}

const DraggableSection: React.FC<DraggableSectionProps> = ({
  name,
  formik,
}) => {
  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const newItems = [...formik.values[name]]
      const [reorderedItem] = newItems.splice(dragIndex, 1)
      newItems.splice(hoverIndex, 0, reorderedItem)
      formik.setFieldValue(name, newItems)
    },
    [formik, name],
  )

  const renderItem = useCallback(
    (item: any, index: number) => {
      return (
        <DraggableItem
          key={index}
          index={index}
          id={item.id}
          name={name}
          moveItem={moveItem}
          formik={formik}
        />
      )
    },
    [moveItem, name, formik],
  )

  const addItem = () => {
    const newItem = getInitialItem(name)
    formik.setFieldValue(name, [...formik.values[name], newItem])
  }

  return (
    <div>
      <FieldArray
        name={name}
        render={(arrayHelpers) => (
          <div>
            {formik?.values[name]?.map((item: any, index: number) =>
              renderItem(item, index),
            )}
            <Button
              render="dark"
              bold={false}
              type="button"
              onClick={addItem}
              text={<FaPlus />}
            />
          </div>
        )}
      />
    </div>
  )
}

interface DraggableItemProps {
  id: number
  index: number
  name: string
  moveItem: (dragIndex: number, hoverIndex: number) => void
  formik: FormikProps<any>
}

const DraggableItem: React.FC<DraggableItemProps> = ({
  id,
  index,
  name,
  moveItem,
  formik,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const [, drag] = useDrag({
    type: 'ITEM',
    item: { id, index },
  })

  const [, drop] = useDrop({
    accept: 'ITEM',
    hover: (draggedItem: { index: number }) => {
      if (draggedItem.index !== index) {
        moveItem(draggedItem.index, index)
        draggedItem.index = index
      }
    },
  })

  const removeItem = () => {
    const newItems = [...formik.values[name]]
    newItems.splice(index, 1)
    formik.setFieldValue(name, newItems)
  }

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed)
  }

  const renderFields = () => {
    switch (name) {
      case 'skills':
        return <SkillCvForm name={name} index={index} />
      case 'education':
        return <EducationCVForm name={name} index={index} />
      case 'employment':
        return <EmployementCVForm name={name} index={index} formik={formik} />
      case 'certificates':
        return <CertificateCVForm name={name} index={index} />
      case 'languages':
        return (
          <Field
            as={StyledInput}
            name={`${name}[${index}].name`}
            placeholder="Language Name"
          />
        )
      case 'hobbies':
        return (
          <Field
            as={StyledInput}
            name={`${name}[${index}].name`}
            placeholder={`Hobby ${index + 1}`}
          />
        )
      default:
        return null
    }
  }

  return (
    <div
      ref={(node) => {
        drag(drop(node))
      }}
      className="border p-4 mb-4 bg-white rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{`${
          name.charAt(0).toUpperCase() + name.slice(1)
        } ${index + 1}`}</h3>
        <Button
          render="dark"
          bold={false}
          text={
            isCollapsed ? <FaAngleDown size={20} /> : <FaAngleUp size={20} />
          }
          type="button"
          onClick={toggleCollapse}
          className="md:hidden"
        />
      </div>
      <div className={`md:block ${isCollapsed ? 'hidden' : 'block'}`}>
        {renderFields()}
        <Button
          render="dark"
          bold={false}
          text={'Remove'}
          type="button"
          onClick={removeItem}
          className="mt-2"
        />
      </div>
    </div>
  )
}

const getInitialItem = (name: string) => {
  switch (name) {
    case 'skills':
      return { name: '', scale: '' }
    case 'education':
      return { degree: '', year: '', school: '', more: '' }
    case 'employment':
      return {
        title: '',
        dateRange: { startDate: '', endDate: '' },
        location: '',
        roles: [''],
      }
    case 'certificates':
      return { name: '', date: '', issuer: '', link: '' }
    default:
      return {}
  }
}

export default DraggableSection
