import React from 'react'

const Member_data_input = props => {
     return (
          <div className='w-full p-2 hover:shadow-xl'>
               <label className=' text-2xl text-red-900 font-normal' htmlFor={props.input?.id}>{props.label}</label>
               <br />
               <input
                    className={`mt-2 w-full ${props.enable ? 'border-2 rounded' : ''}`}
                    {...props.input}
                    disabled={props.enable ? false : true}
                    value={props.value}
                    onChange={props.onChange}
               />
          </div>
     )
}

export default Member_data_input