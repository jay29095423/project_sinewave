import React from 'react';


const Color_option = props => {


     return (<div className={` ${props.selected ? 'bg-orange-800 ' : ''} p-[2px] w-full flex items-center justify-center`}>
          <span className={`w-3 h-3 inline-block relative ${props.color} `}  >

               <label htmlFor={`${props.product.id}-${props.color}`} className={`w-full h-full absolute `}>

                    <input id={`${props.product.id}-${props.color}`} type='radio' className='hidden absolute top-6 ' name={`${props.product.id}-color`} onChange={props.onChange} checked={props.selected} />

               </label>


          </span>
     </div>

     )
}

export default Color_option