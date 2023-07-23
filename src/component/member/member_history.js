import React, { useState } from 'react'
import Item_card from '../UI/item_card'

import headphone from '../media/headphone.jpg';
import headphone2 from '../media/headphone2.jpg';
import headphone3 from '../media/headphone3.jpg';
import headphone4 from '../media/headphone4.jpg';
import headphone5 from '../media/headphone5.jpg';
import headphone6 from '../media/headphone6.jpg';
import Order_item from './order_item';


const history_data = [
     {
          id: '225-099',
          pic: headphone2,
          name: 'Sine HR-4 監聽耳機',
          status: 1,
          seller_name: 'Sine Wave -全台最大的音樂設備平台',
          order_date: '2023/05/19',
          complete_date: '2023/05/30',
          payment: 3,
          items: [2, 5, 44, 8, 33, 16],
          total_price: 5820

     },
     {
          id: '225-234',
          pic: headphone,
          name: 'Sine HR-4 監聽耳機',
          status: 2,
          seller_name: 'Sine Wave -全台最大的音樂設備平台',
          order_date: '2023/05/19',
          complete_date: '2023/05/30',
          payment: 3,
          items: [2],
          total_price: 3999

     },
     {
          id: '225-009',
          pic: headphone3,
          name: 'sigma 52 磷青銅 吉他弦',
          status: 2,
          seller_name: 'Sine Wave -全台最大的音樂設備平台',
          order_date: '2023/05/19',
          complete_date: '2023/05/30',
          payment: 1,
          items: [2, 8, 33],
          total_price: 1999

     },
     {
          id: '225-749',
          pic: headphone6,
          name: 'Sine HR-4 監聽耳機',
          status: 1,
          seller_name: 'Sine Wave -全台最大的音樂設備平台',
          order_date: '2023/05/19',
          complete_date: '2023/05/30',
          payment: 2,
          items: [2, 5, 8, 33],
          total_price: 1999

     },
     {
          id: '225-708',
          pic: headphone5,
          name: 'Sine HR-4 監聽耳機',
          status: 1,
          seller_name: '樂響樂器',
          order_date: '2023/05/19',
          complete_date: '2023/05/30',
          payment: 3,
          items: [2, 5, 44, 8, 33],
          total_price: 1999

     },
     {
          id: '225-719',
          pic: headphone4,
          name: 'Sine HR-4 監聽耳機',
          status: 1,
          seller_name: '蛋歌音樂',
          order_date: '2023/05/19',
          complete_date: '2023/05/30',
          payment: 3,
          items: [2, 5, 44, 8,],
          total_price: 1999

     },

]



const Member_history = () => {

     const [complete_select, set_complete_select] = useState(true)

     const select = x => {
          set_complete_select(x)
     }


     const render_order_item = () => {

          if (complete_select) {

               const filteredArrary = history_data.filter(item => item.status === 1)

               return (filteredArrary.map(val => {
                    return <Order_item itemData={val} key={val.id}/>

               }))

          } else {

               const filteredArrary = history_data.filter(item => item.status === 2)

               return (filteredArrary.map(val => {
                    return <Order_item itemData={val} key={val.id}/>

               }))
          }


     }

     return (
          <div>
               <div className='mt-5'>

                    <button onClick={() => { select(true) }} className={`${complete_select ? 'bg-gray-200' : "bg-white"} p-2 text-xl border-r-2 border-t-2 border-l-2`}>已完成</button>
                    <button onClick={() => { select(false) }} className={`${complete_select ? 'bg-white' : "bg-gray-200"} p-2 text-xl border-r-2 border-t-2 border-l-2`}>未完成</button>


               </div>
               <div className='flex w-full border flex-wrap'>
                    {render_order_item()}




               </div>
          </div>

     )
}

export default Member_history