import React from 'react';

interface InputProps {
  type: string;
  value: string;
  id: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void | any;
}

const Input: React.FC<InputProps> = ({ type, value, id, placeholder, onChange }) => {
  return (
    <div className='w-full text-center mt-4'>
      <input className="text-black mx-auto bg-[#ECECEC] w-[406px] h-[58px] text-base font-normal px-4 outline-none tracking-tight rounded-sm placeholder:text-black" type={type} value={value} id={id} placeholder={placeholder} onChange={onChange} />
    </div>
  );
}

export default Input;
