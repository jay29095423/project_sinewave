import React, { useState } from 'react'
import Item_card from '../UI/item_card';

import headphone7 from '../media/headphone7.jpg';
import headphone8 from '../media/headphone8.jpg';
import Member_item_edit from './member_item_edit';
import Member_outcome from './member_outcome';
import Button from '../UI/Button';
import { useCookies } from 'react-cookie';

const Member_seller = props => {

     const [config, set_config] = useState(false)

     const config_item = id => {

          set_config(id)

     };

     const cancel_edit = () => {

          set_config(false)

     }
     const selected = 'bg-gray-200 shadow-inner p-2 text-xl border-t border-r';
     const unselected = 'p-2 text-xl border-t border-r';
     const [section, set_section] = useState(1);
     const [btn_1, set_btn_1] = useState(selected)
     const [btn_2, set_btn_2] = useState(unselected)
     const [btn_3, set_btn_3] = useState(unselected)
     const [btn_4, set_btn_4] = useState(unselected)

     const select_section = section_id => {

          set_section(section_id);

          switch (section_id) {
               case 1:
                    set_btn_1(selected);
                    set_btn_2(unselected);
                    set_btn_3(unselected);
                    set_btn_4(unselected);
                    break;
               case 2:
                    set_btn_1(unselected);
                    set_btn_2(selected);
                    set_btn_3(unselected);
                    set_btn_4(unselected);
                    break;
               case 3:
                    set_btn_1(unselected);
                    set_btn_2(unselected);
                    set_btn_3(selected);
                    set_btn_4(unselected);
                    break;
               case 4:
                    set_btn_1(unselected);
                    set_btn_2(unselected);
                    set_btn_3(unselected);
                    set_btn_4(selected);
                    break;

               default:
                    set_btn_1(selected);
                    set_btn_2(unselected);
                    set_btn_3(unselected);
                    set_btn_4(unselected);
                    break;
          }


     }



     const render_item = () => {

          switch (section) {
               case 1:

                    var filteredArrary = props?.item_data.filter(item => item.online === 1);

                    return (
                         filteredArrary?.map(val => {
                              return (
                                   <Item_card config_item={config_item} className='w-[24%] h-96 m-[.5%]' product={val} key={val.id} config={true} />
                              )
                         }))
               case 2:

                    var filteredArrary = props?.item_data.filter(item => item.online === 2);

                    return (
                         filteredArrary?.map(val => {
                              return (
                                   <Item_card config_item={config_item} className='w-[24%] h-96 m-[.5%]' product={val} key={val.id} config={true} />
                              )
                         }))
               case 3:

                    var filteredArrary = props?.item_data.filter(item => item.online === 3);

                    return (
                         filteredArrary?.map(val => {
                              return (
                                   <Item_card config_item={config_item} className='w-[24%] h-96 m-[.5%]' product={val} key={val.id} config={true} />
                              )
                         }))

               case 4:

                    return (
                         <Member_outcome item_data={props.item_data} order_data={props.order_data}/>
                    )

               default:
                    return
          }

     }


     const [show_intro_edit, set_show_intro_edit] = useState(false)
     const [seller_intro, set_seller_intro] = useState(props.user_data.intro);

     const toggle_intro = () => {
          set_show_intro_edit(x => !x)
     }
     const seller_intro_edit = event => {

          set_seller_intro(event.target.value);

     };

     const intro_change_handler = event => {
          event.preventDefault();
          if (show_intro_edit === false) {
               props.user_intro_update(seller_intro)
          }

     }

     return (
          <>
               {config ? <Member_item_edit cancel={cancel_edit} /> : ''}
               <form onSubmit={intro_change_handler} className='p-2 border'>
                    <h1 className='font-bold text-2xl relative'>賣場介紹 {show_intro_edit ? <span className={`text-gray-500 font-normal text-sm`}>
                         字數上限 : {seller_intro.length}/1000</span> : ""}
                         <Button onClick={toggle_intro} className='absolute right-2 text-base'>
                              {show_intro_edit ? '儲存' : '編輯'}
                         </Button>
                    </h1>
                    <hr />
                    <textarea onChange={seller_intro_edit} value={seller_intro} className={` overflow-hidden w-full p-2 ${show_intro_edit ? "bg-gray-200" : 'bg-white'}`} disabled={show_intro_edit ? false : true} maxLength={1000} rows={5}></textarea>
               </form>
               <div className='mt-5 relative'>

                    <button onClick={() => { select_section(1) }} className={`${btn_1}  border-l `}>已上架</button>
                    <button onClick={() => { select_section(2) }} className={`${btn_2} `}>未上架</button>
                    <button onClick={() => { select_section(3) }} className={`${btn_3} `}>已完成</button>
                    <button onClick={() => { select_section(4) }} className={`${btn_4} `}>統計資料</button>

                    <button className='bg-red-200 hover:shadow-inner hover:bg-red-300 duration-50 absolute right-2 p-2 text-xl border-t border-r'>新增商品</button>
               </div>
               <div className='border flex flex-wrap'>
                    {render_item()}
               </div>

          </>
     )
}

export default Member_seller