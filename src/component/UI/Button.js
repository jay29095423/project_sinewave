import React from 'react'

const Button = props => {
     return (
          <button className={
               ` inline-block w-16 text-center
           text-white cursor-pointer
           bg-red-600 hover:bg-red-700 active:bg-red-800 ${props.className}`}

               onClick={props.onClick}
               type={props.type ? props.type : 'submit'}
          >
               {props.children}
          </button>
     )
}

export default Button