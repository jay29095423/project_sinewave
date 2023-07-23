import React from 'react'
import RangeSlider from './RangeSlider';
import { BsArrowLeft } from 'react-icons/bs';
import { BiFilterAlt } from 'react-icons/bi';
import Product_checkbox from './Product_checkbox';
import Product_rating from './product_rating';
import { useState } from 'react';

// section true = 二手賣場 false = 品牌賣場
const Product_filter = props => {


   
     return (
          <div className={`${props.className} left-2 duration-200 fixed top-[20vh] w-[28vw] z-10 flex justify-center items-center`}>

               <form className={` absolute top-0 duration-150 ease-in-out w-full inline-block p-4 bg-white shadow-2xl`}>
                    {/* <h5 className=' bg-red-700  text-white mb-5'>分類</h5> */}
                    <h5 className='w-full bg-red-100 px-1'>商品分類</h5>
                    <div className='pl-1'>

                         <Product_checkbox
                              type_update={props.type_update}
                              type_delete={props.type_delete}
                              max={props.max_price} min={props.min_price}
                              price_filter={props.price_filter}
                              input={{
                                   type: 'checkbox',
                                   label: '耳機',
                                   id: 'headphone',

                              }}
                         />
                         <Product_checkbox
                              type_update={props.type_update}
                              type_delete={props.type_delete}
                              max={props.max_price} min={props.min_price}
                              price_filter={props.price_filter}
                              input={{
                                   type: 'checkbox',
                                   label: '音箱',
                                   id: 'speaker'
                              }}
                         />
                         <Product_checkbox
                              type_update={props.type_update}
                              type_delete={props.type_delete}
                              max={props.max_price} min={props.min_price}
                              price_filter={props.price_filter}
                              input={{
                                   type: 'checkbox',
                                   label: '效果器',
                                   id: 'padel'
                              }}
                         />
                         <Product_checkbox
                              type_update={props.type_update}
                              type_delete={props.type_delete}
                              max={props.max_price} min={props.min_price}
                              price_filter={props.price_filter}
                              input={{
                                   type: 'checkbox',
                                   label: '樂器',
                                   id: 'instructment'
                              }}
                         />
                         <Product_checkbox
                              type_update={props.type_update}
                              type_delete={props.type_delete}
                              max={props.max_price} min={props.min_price}
                              price_filter={props.price_filter}
                              input={{
                                   type: 'checkbox',
                                   label: '其他',
                                   id: 'others'
                              }}
                         />
                    </div>
                    {props.section ?
                         <>
                              <h5 className='w-full bg-red-100 px-1'>商品狀態</h5>
                              <div className='pl-1'>
                                   <Product_checkbox
                                        status_update={props.status_update}
                                        status_delete={props.status_delete}
                                        max={props.max_price} min={props.min_price}
                                        price_filter={props.price_filter}
                                        input={{
                                             type: 'checkbox',
                                             label: '全新',
                                             id: 'new'
                                        }}
                                   />
                                   <Product_checkbox
                                        status_update={props.status_update}
                                        status_delete={props.status_delete}
                                        max={props.max_price} min={props.min_price}
                                        price_filter={props.price_filter}
                                        input={{
                                             type: 'checkbox',
                                             label: '九成新',
                                             id: 'mint'
                                        }}
                                   /><Product_checkbox
                                        status_update={props.status_update}
                                        status_delete={props.status_delete}
                                        max={props.max_price} min={props.min_price}
                                        price_filter={props.price_filter}
                                        input={{
                                             type: 'checkbox',
                                             label: '正常使用痕跡',
                                             id: 'used'
                                        }}
                                   />
                                   <Product_checkbox
                                        status_update={props.status_update}
                                        status_delete={props.status_delete}
                                        max={props.max_price} min={props.min_price}
                                        price_filter={props.price_filter}
                                        input={{
                                             type: 'checkbox',
                                             label: '功能正常',
                                             id: 'functional'
                                        }}
                                   />
                                   <Product_checkbox
                                        status_update={props.status_update}
                                        status_delete={props.status_delete}
                                        max={props.max_price} min={props.min_price}
                                        price_filter={props.price_filter}
                                        input={{
                                             type: 'checkbox',
                                             label: '需維修',
                                             id: 'broken'
                                        }}
                                   />


                              </div>
                         </> : ''}
                    <h5 className='w-full bg-red-100 px-1'>價格</h5>
                    <RangeSlider max={props.max_price} min={props.min_price} price_filter={props.price_filter} section={props.section} />

                    {props.section ?
                         <>
                              <h5 className='w-full bg-red-100 px-1 mt-5'>賣場評價</h5>
                              <Product_rating />
                         </>
                         : ''}
               </form>
             

          </div>
     )
}

export default Product_filter