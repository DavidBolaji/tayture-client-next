import React, { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { Space } from 'antd';
import { CiPaperplane } from 'react-icons/ci';
import Button from '@/components/Button/Button';
import InputComponent from '@/components/Form/NomalInput/InputComponent';

const TagComponent: React.FC<{
  setSkill: (data: string[]) => void;
  reset: string[];
  title?: string;
  placeholder?: string;
}> = ({ setSkill, reset, title, placeholder }) => {
  const [show, setShow] = useState<boolean>(false);
  const [value, setValue] = useState('');
  const [holder, setHolder] = useState<string[]>([]);

  const handleClick = () => {
    setShow((prev) => !prev);
  };

  const trigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (value.trim() === '') {
        return;
      }
      setHolder([...reset, value]);
      setValue('');
      setShow((prev) => !prev);
    }
  };

  const trigger2 = (event: any) => {
    event.preventDefault();
    if (value.trim() === '') {
      return;
    }
    setHolder([...reset, value]);
    setValue('');
    setShow((prev) => !prev);
  };

  useEffect(() => {
    setSkill([...holder]);
  }, [holder]);

  return (
    <div>
      {!show ? (
        <Button
          render="light"
          transparent
          onClick={handleClick}
          bold={false}
          rounded
          text={
            <Space>
              <FaPlus color="#FF7517" />
              <span className="text-[16px] text-orange">{title || 'Add skill'}</span>
            </Space>
          }
        />
      ) : (
        <div className="relative">
          <InputComponent
            name='skills'
            type="text"
            placeholder={placeholder || 'Enter skill name and press Enter'}
            value={value}
            border={false}
            focus={false}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={trigger}
          />
          <div
            onClick={trigger2}
            className="absolute z-[1000] cursor-pointer right-2 top-1/2 rounded-full -translate-y-1/2 bg-slate-200 p-3"
          >
            <CiPaperplane />
          </div>
        </div>
      )}
    </div>
  );
};

export default TagComponent;
