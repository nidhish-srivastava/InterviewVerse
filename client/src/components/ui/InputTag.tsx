import React from 'react'

type InputTagProp = {
    label : string
    placeholder : string
    type : string
    value : string
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void
    id : string
    name : string
    className : string
    onKeyDown?:(e : React.KeyboardEvent<HTMLInputElement>) => void
}


const InputTag = ({id,placeholder,name,type,onChange,label,value,className,onKeyDown} : Partial<InputTagProp>) => {
  const inputClasses = `w-full px-4 py-2 border border-gray-300 rounded-md mb-4 text-base placeholder-gray-500 focus:outline-none focus:border-blue-500 md:w-[300px] md:p-[12px] lg:w-[350px] lg:p-[14px] ${className || ''}`;
  return (
    <div>
        <label htmlFor={id} className='block font-bold mb-1 text-lg text-gray-700'>{label}</label>
        <input
        className={inputClasses}
        value={value}
        name={name}
        required = {true}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        onKeyDown={onKeyDown}
        />
    </div>
  )
}

export default InputTag