import React, { useMemo, useState } from 'react'
import Member_section_button from './member_section_button'

import Member_history from './member_history'
import Member_seller from './member_seller'
import Member_data from './member_data'
import headphone7 from '../media/headphone7.jpg';
import axios from 'axios'
import { useCookies } from 'react-cookie'
const Member = () => {
     const [cookie, setCookie] = useCookies(['user_data']);

     const [item_data, set_item_data] = useState([{
          id: 1,
          images: [headphone7],
          name: '預設名稱',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ullamcorper, quam pharetra convallis varius, turpis ligula condimentum felis, et vulputate augue sapien quis erat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut ut fringilla ante. Nulla quis magna quam. Quisque sodales lacinia accumsan. Sed ultricies sapien eu convallis luctus. Etiam pellentesque ornare metus a ullamcorper. Cras a sem sollicitudin, tempus lorem non, laoreet tortor. Praesent egestas orci non venenatis vestibulum. Donec eros nulla, vestibulum ut facilisis nec, vehicula a leo. Nullam rutrum nec neque ac posuere. Ut a finibus risus. Curabitur vel augue tortor. Suspendisse molestie convallis dolor, eget euismod lectus bibendum ut. Nam ut orci vel ligula aliquam efficitur.',
          price: 0,
          status: '預設內容',
          online: 1
     }])

     const [user_data, set_user_data] = useState({})
     const [order_data, set_order_data] = useState({})
     const get_user_data = async () => { 
          let results = await axios.post('http://localhost:5500/seller_products', { seller_id: cookie.user_data.id })
         
          set_item_data(results.data.item_data);
          set_user_data(results.data.user_data[0]);
          set_order_data(results.data.order_data);

          setCookie('user_data', results.data.user_data[0], { path: '/' })
          
     }
     useMemo(() => {
          get_user_data()
     }, []);

     //使用者更新賣場資訊
     const user_intro_update = async value => {
          // console.log(value)
          let results = await axios.post('http://localhost:5500/user_intro_update', { seller_id: cookie.user_data.id, value: value })
          if (results.data.affectedRows === 1) {
               alert('更新完成')
          }

     }

     //選擇要渲染的區域
     const [section, set_section] = useState(1)

     const section_selected = x => {
          set_section(x);
     };

     const render_section = () => {

          if (section === 1) {

               return (<Member_history />)

          } else if (section === 2) {
               return (<Member_seller order_data={order_data} item_data={item_data} user_data={user_data} user_intro_update={user_intro_update} />)
          } else {
               return (<Member_data user_data={user_data} set_user_data={set_user_data} get_user_data={get_user_data}/>)
          }

     }


     return (
          <div className='w-full h-screen flex items-center justify-center mt-32'>
               <div className='w-3/4 h-full '>
                    <div className='h-[60px] relative font-semibold p-2 text-red-900 border shadow-sm'>
                         <span className=' text-3xl'>{user_data.nick_name || ''}</span>
                         <span className=' text-sm m-2 text-gray-500'>
                              ({user_data.email || ''})
                         </span>
                         <span className=' text-base absolute right-0 h-full mt-1 mr-2'>
                              <Member_section_button selected={section} onClick={() => { section_selected(1) }} id='1'>購買清單</Member_section_button>
                              <Member_section_button selected={section} onClick={() => { section_selected(2) }} id='2'>我的賣場</Member_section_button>
                              <Member_section_button selected={section} onClick={() => { section_selected(3) }} id='3'>基本資料</Member_section_button>

                         </span>

                    </div>
                    <div className='w-full'>

                         {render_section()}

                    </div>

               </div>
          </div>
     )
}

export default Member