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
}


const InputTag = ({id,placeholder,name,type,onChange,label,value,className} : Partial<InputTagProp>) => {
  const inputClasses = `input ${className || ''}`;
  return (
    <div className='input-container'>
        <label htmlFor={id}>{label}</label>
        <input
        className={inputClasses}
        value={value}
        name={name}
        required = {true}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        id={id}
        />
    </div>
  )
}

export default InputTag