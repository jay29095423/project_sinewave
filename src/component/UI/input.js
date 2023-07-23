import React, { useState, forwardRef, useImperativeHandle } from 'react'

const Input = forwardRef((props, ref) => {
     const [value, set_value] = useState(props.value);

     // 提供方法供父元件存取子元件的狀態
     useImperativeHandle(ref, () => ({

          getState: () => value

     }));
// console.log(props)
     const value_change = event => {
          set_value(event.target.value)
     }
     return (
          <div className='w-full p-2 hover:shadow-xl'>
               <label className=' text-2xl text-red-900 font-normal' htmlFor={props.input.id}>{props.label}</label>
               <br />
               <input
                    className={`mt-2 w-full ${props.enable ? 'border-2 rounded' : ''}`}
                    {...props.input}
                    disabled={props.enable ? false : true}
                    value={value||''}
                    onChange={value_change}
               />
          </div>

     )
}
)
export default Input