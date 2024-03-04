import { useOrder } from '@/hooks/useOrder'
import { cn } from '@/utils/helpers'
import { MenuOutlined } from '@ant-design/icons'
import { DndContext } from '@dnd-kit/core'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React, { useState } from 'react'
import { RxDragHandleDots1 } from 'react-icons/rx'

interface DataType {
  key: string
  name: React.ReactNode
  section: React.ReactNode
}

interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  'data-row-key': string
  hidden?: boolean
}

export const Row: React.FC<RowProps> = ({
  children,
  'data-row-key': dataRowKey,
  hidden,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dataRowKey })

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleY: 1 }),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  }

  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={style}
      className={cn('relative', props.className)}
    >
      <div
        style={{
          touchAction: 'none',
          cursor: 'move',
          position: 'absolute',
          left: -20,
          top: 5,
        }}
        {...listeners}
      >
        {!hidden && <RxDragHandleDots1 size={20} />}
      </div>
      {children}
    </div>
  )
}

const DragableSection = () => {
  const { dataSource, onDragEnd } = useOrder()

  return (
    <div>
      {dataSource.map((item) => (
        <Row key={item.key} data-row-key={item.key}>
          {item.name}
        </Row>
      ))}
    </div>
  )
}

export default DragableSection
