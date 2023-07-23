import React from 'react'

const Member_section_button = props => {

  const isSelected = props.selected === +props.id;

  return (

    <button onClick={props.onClick} className={`${props.className} ${isSelected ? 'border-2 border-red-700' : 'border text-gray-700'} hover:bg-slate-100 hover:shadow p-1 border mx-1  font-semibold  bg-white shadow-sm`}>{props.children}</button>
  )
}

export default Member_section_button