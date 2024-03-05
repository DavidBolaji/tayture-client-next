import { useGlobalContext } from '@/Context/store'
import { ColorPicker } from 'antd'
import React, { useEffect, useState } from 'react'

const colorData = [
  {
    id: '#000000',
  },
  {
    id: '#ffffff',
  },
  {
    id: '#102a73',
  },
  {
    id: '#2b98de',
  },
  {
    id: '#075700',
  },
  {
    id: '#facd05',
  },
  {
    id: '#9b3016',
  },
]

const ColorPalete: React.FC<{ background: string }> = ({ background }) => {
  const [color, setColor] = useState('#102a73')
  const { setColors } = useGlobalContext()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) {
      setColors((prev) => {
        return {
          ...prev,
          [background]: color,
        }
      })
    }
    setLoaded(true)
  }, [color])

  return (
    <div className="grid grid-cols-9 gap-1 max-w-[600px]">
      {colorData.map((color) => (
        <div key={color.id} id={color.id} className="col-span-1">
          <ColorPicker
            className="outline-none"
            onOpenChange={() => setColor(color.id)}
            onChange={(e) => console.log(e)}
            defaultValue={color.id}
            value={color.id}
          />
        </div>
      ))}
    </div>
  )
}

export default ColorPalete
