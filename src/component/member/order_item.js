import React, { useState } from 'react'

import Button from '../UI/Button';



const Order_item = props => {

     // console.log(props.itemData)

     const [order_status, set_order_status] = useState(props.itemData.status)

     const render_status = () => {
          // console.log(order_status)
          if (order_status === 1) {

               return (
                    <span className=' absolute right-3 text-sm mt-1 p-1 bg-gray-600 text-gray-100 '>
                         已完成
                    </span>
               )

          } else {


               return (
                    <span className=' absolute right-3 text-sm mt-1 p-1 bg-red-600 text-gray-100 '>
                         未完成
                    </span>
               )

          }

     }

     return (
          <div className='my-2 hover:shadow-2xl hover:border w-full flex flex-col h-[150px] overflow-hidden hover:h-[300px] ease-out-in duration-300 group relative'>
               <h2 className='h-2/5 max-h-[60px] bg-gray-200 text-black text-3xl p-3'>{props.itemData.seller_name}
                    {render_status()}
               </h2>
               <div className='h-full w-full flex flex-row'>
                    <img src={props.itemData.pic} className='h-full object-cover w-[20%] ' />

                    <div className='w-3/5 h-full p-3'>

                         <span className='text-2xl font-semibold'>
                              {props.itemData.name}
                         </span>
                         <br />
                         {props.itemData.items.length - 1 ? <span className='text-base text-gray-500'>及其他
                              <span className=' text-red-500'> {props.itemData.items.length - 1} </span>
                              件商品
                         </span> : <span className='text-base bg-transparent text-transparent'>及其他
                              <span className=' '> {props.itemData.items.length - 1} </span>
                              件商品
                         </span>}
                         <div className='p-2 group-hover:bg-slate-300 bg-transparent m-5 duration-300'>
                              <h1 className='text-xl font-semibold'>訂單編號 :<span> {props.itemData.id}</span></h1>
                              <h1 className='text-xl font-semibold'>付款方式 :<span> 超商取貨付款</span></h1>
                              <h1 className='text-xl font-semibold'>訂單狀態 :<span> 買家取件成功</span></h1>
                              <h1 className='text-xl font-semibold'>完成日期 :<span> {props.itemData.complete_date}</span></h1>
                         </div>



                    </div>

                    <div className=' relative h-full p-1'>
                         <div className='p-1 text-2xl font-semibold text-red-700'>訂單日期:<span> {props.itemData.order_date}</span> </div>
                         <div className='p-1 text-2xl font-semibold text-red-700'>訂單金額: NT<span> {props.itemData.total_price.toLocaleString()}</span> </div>
                         <Button className='h-[15%] w-32 absolute top-[47.5%] right-2 bg-transparent group-hover:bg-red-600 duration-300 '>查看詳細訂單</Button>
                    </div>
               </div>


          </div>
     )
}

export default Order_item