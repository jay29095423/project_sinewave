import React from 'react'
import Cart_item from '../UI/cart_item'
import Button from '../UI/Button';
import { HiOutlineXCircle } from "react-icons/hi2";
import { useContext } from 'react';
import cart_context from '../store/cart_context';

const Cart = props => {

     const cart_data = useContext(cart_context)
     const total = cart_data.totalAmount

     const cart_item_add = item => {
          cart_data.addItem({ ...item, amount: 1 })
     }
     const cart_item_reduce = item => {

          cart_data.reduceItem(item)
     }
     const cart_item_delete = item => {
          cart_data.deleteItem(item)
     }

     const render_cart_item = () => {

          if (cart_data.items.length === 0) {

               return <div className='bg-gray-200 h-28 flex items-center justify-center text-red-800 font-semibold text-3xl'><p>您還沒有加入商品喔~</p></div>

          } else {
               return (
                    cart_data.items.map(
                         val => <Cart_item
                              key={`${val.id}-${val.option}`}
                              cart_data={val}
                              onAdd={cart_item_add.bind(null, val)}
                              onReduce={cart_item_reduce.bind(null, val)}
                              onDelete={cart_item_delete.bind(null, val)}
                         />)
               )

          }

     }



     return (

          <div className='fixed right-20 z-50 top-[64px] w-[440px]'>

               <div className='h-auto max-h-[50vh] shadow-2xl overflow-auto items-start justify-center  bg-gray-200 '>
                    <button onClick={props.showCart} className=' rounded-full bg-white text-2xl text-red-900 right-6 top-2 absolute'>
                         <HiOutlineXCircle />
                    </button>

                    {render_cart_item()}


               </div>

               <div className='w-full h-16 bg-black flex flex-row items-center relative'>

                    <span className='text-white font-bold text-xl ml-4'>NT {total.toLocaleString()}</span>
                    <Button className='right-4 absolute bg-red-300 font-semibold rounded' >去結帳</Button>
               </div>

          </div>
     )
}

export default Cart