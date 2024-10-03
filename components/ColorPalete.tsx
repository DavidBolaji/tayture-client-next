import { useGlobalContext } from '@/Context/store'
import { ColorPicker } from 'antd'
import React, { useEffect, useState } from 'react'

const ColorPalete: React.FC<{ background: string; template: string }> = ({
  background,
  template,
}) => {
  const { setColors, colorList } = useGlobalContext()
  const [color, setColor] = useState(
    colorList[template as 'one'][background as 'background'],
  )
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) {
      setColors((prev) => {
        return {
          ...prev,
          [template]: {
            ...prev[template],
            [background]: color
          },
        }
      })
    }
    setLoaded(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, loaded, background, template])

  return (
    <div className="col-span-1">
      <ColorPicker
        className="outline-none"
        onChange={(e) => setColor(e.toHexString())}
        defaultValue={color}
        value={color}
      />
    </div>
  )
}

export default ColorPalete
