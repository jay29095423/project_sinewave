import React from 'react';
import { HiTrash } from "react-icons/hi2";
import { FaTag } from "react-icons/fa";

const Cart_item = props => {

  const amount = +props.cart_data.amount;

  const price = +props.cart_data.price;

  const total_price = amount * price

  const color = props.cart_data.option;

  const product_amount_input = () => {

    if (props.cart_data.status) {

      return (
        <div className='flex justify-evenly items-center font-semibold text-red-700 ml-2 w-[25%] '>
          <FaTag />
          二手商品
        </div>
      )

    } else {
      return (
        <div className='ml-2 w-[25%] '>
          <button className='bg-red-500 text-white w-1/3 hover:bg-red-700' onClick={props.onReduce}>-</button>
          <span className=' shadow-inner inline-block w-1/3 text-center'>{amount}</span>
          <button className='bg-red-500 text-white w-1/3 hover:bg-red-700' onClick={props.onAdd} >+</button>

        </div>
      )

    }

  }

  return (

    <div className='m-5 flex flex-col'>
      <div className={`${!props.cart_data.status ? 'bg-black' : 'bg-orange-900'}  w-[400px] overflow-hidden text-white px-2`}>{props.cart_data.name} <span >{color ? color : props.cart_data.status}</span> </div>
      <div className='w-[400px] h-[100px] bg-white flex items-center shadow-sm '>
        <img src={props.cart_data.pic} alt='商品圖片' className='h-full w-[40%] object-cover' />

        {product_amount_input()}

        <span className=' w-[25%] pl-3'> NT {total_price.toLocaleString()}</span>

        <button onClick={props.onDelete} className='flex justify-center items-center w-[15%] bg-red-400 text-white h-full border-2 hover:bg-red-500'>
          <HiTrash />
        </button>


      </div>
    </div>
  )
}

export default Cart_item