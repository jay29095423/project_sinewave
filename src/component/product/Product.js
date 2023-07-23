import React, { useEffect, useMemo, useState } from 'react'
import Item_card from '../UI/item_card';
import { BsSearch, BsX } from 'react-icons/bs';
import { BsArrowLeft } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import headphone from '../media/headphone.jpg';
import headphone2 from '../media/headphone2.jpg';
import headphone3 from '../media/headphone3.jpg';
import headphone4 from '../media/headphone4.jpg';
import headphone5 from '../media/headphone5.jpg';
import headphone6 from '../media/headphone6.jpg';
import headphone7 from '../media/headphone7.jpg';
import headphone8 from '../media/headphone8.jpg';
import GS_mini from '../media/GS_mini.jpg';
import speaker from '../media/speaker.jpg';
import padel from '../media/padels.jpg';
import cake from '../media/cake.jpg';
import Button from '../UI/Button';
import Product_filter from './Product_filter';
import MessageBox from '../UI/MessageBox';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './Product.module.css';
const Product = props => {
     const [section, set_section] = useState(false);
     // section true = 二手賣場 false = 品牌賣場
     //要顯示的商品清單

     const [products_data, set_product_data] = useState([
          {
               id: 158,
               pic: headphone2,
               name: 'Sine HR5-4 監聽耳機',
               intro: 'Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺',
               price: 3999,
               status: false,
               options: ['black', 'white', 'red'],
               type: '耳機'
               , images: ['']
          },

     ]);


     const [scd_products_data, set_scd_products_data] = useState([
          {
               id: 21,
               pic: headphone,
               name: 'Sine HR-4 監聽耳機',
               intro: 'Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺',
               price: 3999,
               status: '九成新',
               type: '耳機'
               , images: ['']
          },

     ]);

     const [displayed_merch_data_sec, set_displayed_merch_data_sec] = useState([
          {
               id: 231,
               pic: headphone,
               name: 'Sine HR-4 監聽耳機',
               intro: 'Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺',
               price: 3999,
               status: '九成新',
               type: '耳機'
               , images: ['']
          },

     ]);
     const [displayed_merch_data_new, set_displayed_merch_data_new] = useState([
          {
               id: 14,
               pic: headphone2,
               name: 'Sine HR5-4 監聽耳機',
               intro: 'Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Vasgerd Teenager系列藍芽耳機 端午特別版是獨特的限量版耳機。它結合了年輕時尚的風格和卓越的音質，讓您在端午節期間盡情享受音樂。輕巧舒適的設計，讓您隨時隨地感受音樂的魅力。Sine HR-4 監聽耳機為您帶來非凡的聽覺體驗。這款耳機結合了卓越的音頻技術和舒適的設計，讓您沉浸在音樂的世界中。無論是細節還是豐富的音效，Sine HR-4都能完美呈現。這款耳機將為您提供與眾不同的聽覺',
               price: 3999,
               status: false,
               options: ['black', 'white', 'red'],
               type: '耳機'
               , images: ['']
          },

     ]);





     const [new_price_range, set_new_price_range] = useState({ min: 0, max: 0 })  //待更新
     const [sec_price_range, set_sec_price_range] = useState({ min: 0, max: 0 })  //待更新

     const new_price_handler = (min, max) => {
          set_new_price_range({ min: min, max: max })
     }
     const sec_price_handler = (min, max) => {
          set_sec_price_range({ min: min, max: max })
     }


     let get_product_data = async () => {
          let results = await axios.get('http://localhost:5500/products');
          // console.log(results.data.sec_product)
          let new_max_price = results.data.brand_new[0].price;
          let new_min_price = results.data.brand_new[0].price;
          let sec_max_price = results.data.sec_product[0].price;
          let sec_min_price = results.data.sec_product[0].price;
          for (let i = 1; i < results.data.brand_new.length; i++) {  //用<而不是<=是因為i從0開始，在等於陣列長度時會多一個
               let current_value = results.data.brand_new[i].price
               if (current_value < new_min_price) {
                    new_min_price = current_value;
               };
               if (current_value > new_max_price) {
                    new_max_price = current_value;
               };
          };

          for (let i = 1; i < results.data.sec_product.length; i++) {
               let current_value = results.data.sec_product[i].price;
               if (current_value < sec_min_price) {
                    sec_min_price = current_value
               }
               if (current_value > sec_max_price) {
                    sec_max_price = current_value
               }

          }

          // console.log(sec_max_price);
          // console.log(sec_min_price)

          new_price_handler(new_min_price, new_max_price)
          sec_price_handler(sec_min_price, sec_max_price)
          set_scd_products_data(results.data.sec_product);
          set_product_data(results.data.brand_new);

          set_displayed_merch_data_sec(results.data.sec_product);
          set_displayed_merch_data_new(results.data.brand_new);


     }

     useMemo(() => {

          get_product_data();

     }, [])


     //分類功能------------------------------------

     //分類依據列表---根據陣列內提供的內容進行分類
     const [filter_base, set_filter_base] = useState({
          type: [],
          status: [],
     })

     //執行分類的實際函數

     const price_filter = (min_price, max_price) => {

          if (section === true) { //二手

               let filteredProducts = scd_products_data.filter((item) => {

                    return (
                         item.price <= max_price &&
                         item.price >= min_price &&
                         filter_base.status.some(status => item.status === status) &&
                         filter_base.type.some(type => item.type === type)

                    )
               });

               set_displayed_merch_data_sec(x => filteredProducts)


          } else {                //品牌

               let filteredProducts = products_data.filter((item) => {
                    // console.log(item)
                    // console.log(filter_base.type.some(x=>item.type===x))
                    return (
                         item.price <= max_price &&
                         item.price >= min_price &&

                         filter_base.type.some(type => item.type === type)

                    )
               });
               // console.log(filteredProducts)
               // console.log('---------')
               set_displayed_merch_data_new(x => filteredProducts)
          }

     }

     //在每次分類依據內陣列有變動時執行分類的函數
     useEffect(() => {
          // console.log(section)
          if (section === false) {
               price_filter(new_price_range.min, new_price_range.max)
          } else if (section === true) {
               price_filter(sec_price_range.min, sec_price_range.max)
          }
          // price_filter(min_price, max_price)
     }, [filter_base])

     //商品種類的分類---將分類依據列表的type陣列新增傳入的參數
     const type_update = (type) => {
          set_filter_base(pre_data => {

               let updated_array;
               const is_type_exist = pre_data.type.includes(type);
               // console.log('is_type_exist:')
               // console.log(is_type_exist)

               if (is_type_exist) {
                    updated_array = pre_data.type;
               } else {
                    updated_array = [...pre_data.type, type]
               }

               return ({ ...pre_data, type: updated_array })

          });

     };
     //商品種類的分類---將分類依據列表的type陣列刪除傳入的參數
     const type_delete = type => {
          set_filter_base(pre_data => {

               let updated_type = pre_data.type.filter(item => item !== type)
               // console.log('/////////type_delete////////////////////')
               // console.log(updated_type)
               // console.log('/////////type_delete////////////////////')

               return { ...pre_data, type: updated_type }
          })
     }

     //商品狀態的分類---將分類依據列表的status陣列新增傳入的參數
     const status_update = (status) => {
          set_filter_base(pre_data => {

               let updated_array;
               const is_status_exist = pre_data.status.includes(status);
               // console.log('is_status_exist:')
               // console.log(is_status_exist)

               if (is_status_exist) {
                    updated_array = pre_data.status;
               } else {
                    updated_array = [...pre_data.status, status]
               }

               return ({ ...pre_data, status: updated_array })

          });
          // console.log(status)

     };
     //商品狀態的分類---將分類依據列表的status陣列刪除傳入的參數
     const status_delete = status => {
          set_filter_base(pre_data => {
               let updated_status = pre_data.status.filter(item => item !== status);
               return ({ ...pre_data, status: updated_status })
          })

     };

     const [show_filter, set_show_filter] = useState(false);
     const [filter_animation, set_filter_animation] = useState(false);
     const show_filter_handler = () => {
          set_filter_animation(x => !x)
          setTimeout(() => {
               set_show_filter(x => !x)
          }, 100);

     }


     //分類功能------------------------------------


     //搜尋功能---------------------------------------



     //搜尋的內容狀態

     const [show_serach_tag, set_show_search_tag] = useState(false)
     const [search_content, set_search_content] = useState(false);

     const search_input = event => {
          set_search_content(event.target.value.trim())
     }

     const search_submit = async event => {
          event.preventDefault();
          let results = await axios.post('http://localhost:5500/search', { search_content: search_content });

          // console.log(results.data)
          set_displayed_merch_data_new(results.data.brand_new);
          set_displayed_merch_data_sec(results.data.sec_product);
          set_product_data(results.data.brand_new)
          set_scd_products_data(results.data.sec_product)
          set_show_search_tag(true)
     }
     // 搜尋的標籤

     const cancel_search_handler = () => {
          set_search_content(false);
          set_show_search_tag(false)
          get_product_data();
     }

     //搜尋功能---------------------------------------

     //購物車相關-----------------------------------------
     //判斷選擇的商品是否有效，並顯示錯誤訊息
     const [isValid, setIsValid] = useState(true)
     const [invalidMessage, setInvalidMessage] = useState('')
     const valid_select = message => {

          setIsValid(x => !x);

          setInvalidMessage(message ? message : '');

     };



     //購物車相關-----------------------------------------



     //商品詳細資訊---------------------------

     const navigate = useNavigate();

     //設定localStorage
     const choose_item = id => {

          localStorage.setItem('id', id);
          navigate('/product_detail')
     }


     //商品詳細資訊---------------------------

     //渲染商品卡片---------------------------
     const section_switch_handler = () => {

          set_section(x => !x);

     }

     const render_section = () => {
          if (section === false) {
               // set_displayed_merch_data_new(x=>products_data)
               return (displayed_merch_data_new.map(val => <Item_card invalid={valid_select} className='h-96 w-[24%] m-[.25%]' product={val} key={val.id} onClick={() => { choose_item(val.id) }} />))
          } else if (section === true) {

               return (displayed_merch_data_sec.map(val => <Item_card invalid={valid_select} className='h-96 w-[24%] m-[.25%]' product={val} key={val.id} onClick={() => { choose_item(val.id) }} />))
          }
     }


     //渲染商品卡片---------------------------

     return (
          <>

               {isValid ? '' : <MessageBox comfirm={valid_select} className=' bg-white'>

                    {invalidMessage}

               </MessageBox>}


               <div className='flex flex-col mt-16 items-center relative '>
                    <button onClick={show_filter_handler} type='button' className='text-white top-3 bg-red-500 p-2 absolute left-3 shadow-lg rounded-full overflow-hidden inline-block cursor-pointer' >
                         {show_filter ?
                              <BsArrowLeft className='  text-3xl' /> :
                              <BiFilterAlt className=' text-3xl  ' />
                         }
                    </button>
                    {show_filter ?
                         <Product_filter
                              className={`${filter_animation ? `` : `${classes.filter_backward}`} ${show_filter ? `${classes.filter}` : ''}`}
                              max_price={section ? sec_price_range.max : new_price_range.max}
                              min_price={section ? sec_price_range.min : sec_price_range.min}
                              section={section}
                              price_filter={price_filter}
                              type_update={type_update}
                              type_delete={type_delete}
                              status_update={status_update}
                              status_delete={status_delete}
                              filter_base={filter_base}
                         /> : ''
                    }

                    <div className='w-3/4 border  mt-16'>
                         <h1 className={`${!section ? 'text-red-600' : 'bg-red-300 text-black'} p-2 relative text-lg  font-semibold`}>
                              {section ? '二手賣場' : '品牌商品'}
                              <form className='inline-block' onSubmit={search_submit}>
                                   <input onChange={search_input} value={search_content || ''} placeholder='請輸入搜尋內容' className='text-black px-2 border rounded text-sm ml-5' />
                                   <button className={`${section ? 'text-black' : "text-gray-600 hover:text-gray-900"} text-sm ml-2 `}>
                                        <BsSearch />
                                   </button>
                                   {show_serach_tag ? <button onClick={cancel_search_handler} className='bg-red-200 hover:bg-red-400 rounded-xl text-base ml-3 px-2'>
                                        {search_content}
                                        <span className='align-middle h-full inline-flex items-center justify-center mb-1'>
                                             <BsX className='align-middle h-full inline-block text-base text-black '></BsX>
                                        </span>
                                   </button> : ''}

                              </form>


                              <Button className=' absolute right-8 w-auto p-[3px] text-base' onClick={section_switch_handler}>
                                   {!section ? '二手賣場' : '品牌商品'}
                              </Button>
                         </h1>
                         {/* <div className={`${section?'hidden':''} w-full p-2 bg-gray-50 flex flex-wrap items-center justify-start`}>
                              {displayed_merch_data_new.map(val => <Item_card invalid={valid_select} className='h-96 w-[24%] m-[.25%]' product={val} key={val.id} onClick={() => { choose_item(val.id) }} />)}
                         </div>
                         <div className={`${section?'':' opacity-0'} w-full p-2 bg-gray-50 flex flex-wrap items-center justify-start`}>
                              {displayed_merch_data_sec.map(val => <Item_card invalid={valid_select} className='h-96 w-[24%] m-[.25%]' product={val} key={val.id} onClick={() => { choose_item(val.id) }} />)}
                         </div> */}
                         <div className={` w-full p-2 bg-gray-50 flex flex-wrap items-center justify-start`}>
                              {render_section()}
                         </div>

                    </div>
               </div>
          </>
     )
}

export default Product