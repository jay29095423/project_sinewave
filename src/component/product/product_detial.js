import React, { useContext, useEffect, useMemo } from 'react'

import Product_card_small from './Product_card_small';
import { useState } from 'react';
import axios from 'axios';
import cart_context from '../store/cart_context';
const Product_detial = props => {

     const cart_data = useContext(cart_context);

     const [selected_amount, set_select_amount] = useState(0);
     const selected_amount_handler = event => {
          set_select_amount(event.target.value)
     }
     const [color_selected, set_color_selected] = useState(false)
     const color_selected_handler = event => {

          let color;
          switch (event.target.value) {
               case 'red':
                    color = '紅';
                    break;
               case 'blue':
                    color = '藍';
                    break;
               case 'black':
                    color = '黑';
                    break;
               case 'white':
                    color = '白';
                    break;
               case 'green':
                    color = '綠';
                    break;
               case 'orange':
                    color = '橘';
                    break;
               case 'wood':
                    color = '原木色';
                    break;

               default:
                    color = ''
                    break;
          }

          set_color_selected(color)
     }

     const [product_data, set_product_data] = useState({
          id: 0,
          name: '',
          price: 0,
          description: '',
          status: '',
          quantity: '',
          category: '',
          images: ['', '', '', ''],
          shipping: ['', '', ''],
          options: ['', '', '', '', ''],
          seller_id: 0,


     })
     const [user_id, set_user_id] = useState(0);  //賣家的資訊

     useMemo(() => {
          (async () => {
               let id = localStorage.getItem('id')
               let results = await axios.post('http://localhost:5500/product_detail', { id: id })
               // console.log(results.data);
               if (results.data === null) {
                    alert('商品不存在')
               } else {
                    set_user_id(results.data.seller_id)
                    set_product_data(results.data)
               }
          })();


     }, []);

     const [seller_data, set_seller_data] = useState({ name: '', intro: '' });
     const [other_products, set_other_products] = useState([])

     useEffect(() => {

          (async () => {

               let results = await axios.post('http://localhost:5500/product_detail_user', { user_id: user_id });

               set_seller_data(x => { return { ...x, ...results.data.member_data } })

               set_other_products(results.data.products_data);

          })();
          // console.log(seller_data)
          // console.log(other_products)

     }, [user_id])

     const add_to_cart = event => {
          event.preventDefault();

          if (!color_selected || color_selected === 'false') { alert('請選擇一項規格') }
          else {

               cart_data.addItem({
                    id: product_data.id,
                    price: product_data.price,
                    name: product_data.name,
                    pic: product_data.images[0],
                    option: color_selected,
                    amount: selected_amount || 1,
                    status: product_data.status || false
               })
          }

          // cart_data.addItem({

          //      // id: props.product.id,
          //      // price: props.product.price,
          //      // pic: props.product.pic,
          //      // name: props.product.name,
          //      // option: !props.product.status ? color_selected : false,
          //      // amount: !props.product.status ? select_amount : 1,
          //      // status: props.product.status ? props.product.status : false,
          // });

     }




     return (

          <div className='w-3/4 border mt-28 ml-[12.5%]'>
               <div className='w-full border flex'>
                    <div className='w-1/2 border bg-gray-300 flex flex-row'>
                         <div className='w-1/4  flex flex-col items-center justify-between'>
                              <img src={product_data.images[1]} className='w-[90%] m-1 aspect-square object-cover' />
                              <img src={product_data.images[2]} className='w-[90%] m-1 aspect-square object-cover' />
                              <img src={product_data.images[3]} className='w-[90%] m-1 aspect-square object-cover' />
                         </div>
                         <div className='w-3/4  p-1'>
                              <img src={product_data.images[0]} className='h-[100%] aspect-square object-cover hover:object-bottom duration-500' />
                         </div>
                    </div>
                    <form className='w-1/2 relative' onSubmit={add_to_cart}>
                         <h1 className='p-3 bg-black text-white font-bold text-2xl '>{product_data.name}</h1>
                         <h1 className='text-xl my-2 font-bold p-2 inline-block'>NT {product_data.price.toLocaleString()}</h1>
                         <span className='text-lg font-bold bg-red-300 m-2 p-1 rounded'>{product_data.status || '全新商品'}</span>
                         <br />

                         {product_data.status ? '' :
                              <>
                                   <label htmlFor='color_options' className='font-bold  p-2'>顏色</label>
                                   <select id='color_options' required className=' border ' value={color_selected} onChange={color_selected_handler}>
                                        <option selected value={false}>未選擇</option>
                                        {product_data.options.map((val, ind) => {
                                             if (val) {
                                                  let color;
                                                  switch (val) {
                                                       case 'black':
                                                            color = '黑'
                                                            break;
                                                       case 'white':
                                                            color = '白'
                                                            break;
                                                       case 'blue':
                                                            color = '藍'
                                                            break;
                                                       case 'green':
                                                            color = '綠'
                                                            break;
                                                       case 'red':
                                                            color = '紅'
                                                            break;

                                                       default:
                                                            color = '黑'
                                                            break;
                                                  }
                                                  return <option key={ind} value={val}>{color}</option>
                                             }
                                        })
                                        }
                                   </select>
                                   <label htmlFor='amount' className='font-bold  p-2'>數量</label>
                                   <input className='border pl-2' id='amount' required value={selected_amount} onChange={selected_amount_handler} type='number' max={20} min={1} />
                              </>}
                         <div className=' font-semibold  p-2 h-full mt-2 '>
                              <hr />
                              <h1 className='font-bold text-lg text-red-800 mt-2'>商品簡介</h1>

                              <p className='mt-2'>{product_data.description}</p>

                              {
                                   product_data.status ?
                                        <>
                                             <h1 className='font-bold text-lg mt-2 text-red-800'>商品狀況</h1>

                                             <p className='mt-2'>{product_data.status_description}</p>
                                        </> : ''
                              }
                              <h1 className='font-bold text-lg mt-2 mb-2 text-red-800'>交易方式</h1>
                              {product_data.shipping.map((val, ind) => {
                                   return (<span className='m-2 p-2' key={ind}>{val}</span>)
                              })}

                         </div>
                         <button className='border bg-red-600 text-white p-2 absolute bottom-4 right-4'>加入購物車</button>
                    </form>

               </div>
               <h2 className='w-full text-2xl text-red-800 font-bold p-2'>賣家資訊</h2>
               <div className='border '>
                    <h2 className=' text-2xl bg-gray-200 text-red-900 font-bold p-2 flex items-center '>{seller_data.nick_name || seller_data.name}<span className='rounded text-sm border bg-red-300 p-1 ml-2'>優良</span> </h2>
                    <p className=' text-base p-2 w-full break-words'>
                         {seller_data.intro}
                    </p>
                    <hr />
                    <h2 className='text-lg font-bold p-2'>看看其他商品...</h2>
                    <div className='flex felx-col w-full items-center justify-center'>
                         {other_products.map(val => {

                              return (<Product_card_small key={val.id} product_data={val} />)
                         })}


                    </div>
               </div>
          </div>
     )
}

export default Product_detial


