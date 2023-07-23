import React, { useState } from 'react'
import pic from '../media/guitar.jpg';
import ReactDOM from 'react-dom';

const Member_item_edit = props => {
     const [buying, set_buying] = useState(true);

     const change_buying = x => {

          set_buying(x)

     }
     const [shippment_HH_select, set_shippment_HH_select] = useState(true);

     const change_shippment_HH_select = () => {

          set_shippment_HH_select(x => !x)

     }

     const render_address = () => {

          if (!shippment_HH_select) {
               return (
                    <><label className='p-2 text-xl font-bold'>地址</label>
                         <input id='p_price' type='input' className='border-2 w-[40.9%] border-red-300 inline-block rounded focus:bg-gray-100' /></>
               )
          } else { return }

     }

     const [auction_value, set_auction_value] = useState(0);


     const change_acution_value = event => {

          set_auction_value(event.target.value)

     }
     const render_buying = () => {
          if (buying) {
               return (
                    <>
                         <label className='p-2 text-xl font-bold'>價格</label>
                         <input id='p_price' type='input' className='border-2 w-[58.5%] border-red-300 inline-block rounded focus:bg-gray-100' />
                    </>
               )

          }
          else {
               return (
                    <>
                         <label className='p-2 text-xl font-bold'>起標價</label>
                         <input id='p_price' type='input' className='border-2 w-[21.7%] border-red-300 inline-block rounded focus:bg-gray-100' />
                         <label className='p-2 text-xl font-bold'>直購價</label>
                         <input id='p_price' type='input' className='border-2 w-[21.7%] border-red-300 inline-block rounded focus:bg-gray-100' />
                         <br />
                         <div className='mt-3'>
                              <label className='text-xl font-bold'>單次最低出價</label>
                              <input id='p_price' type='range' className='' min={5} max={1000} step={5} onChange={change_acution_value} /><span className='p-1 border bg-gray-200 rounded ml-2 '>{auction_value}</span></div>

                    </>
               )
          }

     }

     const [textarea_value, set_textarea_value] = useState(0);

     const change_textarea = event => {

          if (event.target.value.length <= 1000) {
               set_textarea_value(event.target.value.length)
          } else {
               alert('已達字數限制');
               return
          }


     }

     const Backdrop = props => {
          return (<div className=' w-screen h-[100vh] fixed left-0 top-0 z-20 bg-black bg-opacity-75' onClick={props.cancel}>
          </div>)
     }

     const Edit_box = props => {
          return (

               <form className='flex flex-row w-[75vw] z-30 h-[75vh] fixed left-[12.5vw] top-[15vh] bg-white rounded'>
                    <div className='w-1/2 border h-full p-8'>
                         <h1 className='w-full text-3xl font-bold bg-red-300 p-1 text-gray-900 mb-2'>上傳產品圖片</h1>
                         <img src={pic} alt='商品圖片1 ' className='rounded box-border object-cover w-full h-3/5' />
                         <img src={pic} alt='商品圖片2 ' className='rounded box-border object-cover w-[32%] inline-block mt-4 mr-[2%]' />
                         <img src={pic} alt='商品圖片3 ' className='rounded box-border object-cover w-[32%] inline-block mt-4 ' />
                         <img src={pic} alt='商品圖片4 ' className='rounded box-border object-cover w-[32%] inline-block mt-4 ml-[2%]' />
                         <input type='file' className='w-full border mt-2 bg-red-300' />
                    </div>
                    <div className='w-1/2 border h-full p-8  '>
                         <h1 className='w-full text-3xl font-bold bg-red-300 p-1 text-gray-900 mb-5'>產品資訊</h1>

                         <div className=' w-full border'>
                              <label htmlFor='p_name' className='font-semibold text-xl inline-block p-2 ' >商品名稱  </label>
                              <input id='p_name' type='input' className='border-2 border-red-300 w-[80%] inline-block rounded focus:bg-gray-100' />
                         </div>
                         {/* <div>
                         <label htmlFor='p_name' className='font-semibold text-xl inline-block p-2' >商品規格  </label>
                         <select name='spec_type' className=''>
                              <option value={1}>顏色</option>
                              <option value={2}>大小</option>
                              <option value={3}>其他</option>
                         </select>
                    </div> */}

                         <div className='w-full border'>
                              <label htmlFor='p_status' className='font-semibold text-xl inline-block p-2' >商品狀況  </label>
                              <select id='p_status' name='spec_type' className='w-4/5 border-2 border-red-300 rounded'>
                                   <option value={1}>全新</option>
                                   <option value={2}>九成新</option>
                                   <option value={3}>正常使用痕跡</option>
                                   <option value={4}>功能正常</option>
                                   <option value={3}>需維修</option>
                              </select>
                         </div>
                         <div className='p-2 w-full border'>
                              <label className='font-semibold text-xl inline-block ' >購買方式</label>
                              <input type='button' className='ml-2' name='P_buying' id='direct' onClick={() => { change_buying(true) }} />
                              <label className={` p-1 my-2 mr-2 rounded  ${buying ? 'border-2 shadow border-red-300 bg-red-100' : ' bg-red-100'}`} htmlFor='direct'>直購</label>
                              <input type='button' name='P_buying' id='auction' onClick={() => { change_buying(false) }} />
                              <label className={` p-1 my-2 rounded  ${buying ? ' bg-red-100' : 'border-2 shadow border-red-300 bg-red-100'}`} htmlFor='auction'>競標</label>
                              {render_buying()}
                         </div>

                         <div className='p-2 w-full border'>
                              <label htmlFor='p_shippment' className='font-semibold text-xl inline-block mr-2' >運送方式</label>
                              <input type='checkbox' id='shippment_CV' /> <label htmlFor='shippment_CV' className='p-1'>超商取貨</label>
                              <input type='checkbox' id='shippment_DE' /> <label htmlFor='shippment_DE' className='p-1'>宅配</label>
                              <input type='checkbox' id='shippment_HH' onClick={change_shippment_HH_select} /> <label htmlFor='shippment_HH' className='p-1' onChange={change_shippment_HH_select}>面交</label>
                              {render_address()}
                         </div>
                         <div className='p-2 w-full border'>
                              <label htmlFor='p_shippment' className='font-semibold text-xl inline-block ' >商品介紹/狀況描述<span className='text-sm mx-2 text-gray-500'>字數上限 : ({textarea_value}/1000)</span> </label>
                              <textarea onChange={change_textarea} className='border-2 border-red-300 rounded w-[95%] block mt-2' maxLength={1000} rows={buying ? 9 : 7}></textarea>
                         </div>
                         <div className='p-2 w-full border'>
                              <input type='checkbox' id='user_term' /><label htmlFor='user_term' className=' text-base font-bold ml-2'>我同意<a href='https://www.google.com' className=' underline text-blue-800'>使用條款</a></label>
                         </div>

                         <div className='w-full flex justify-between pt-2'>
                              <button onClick={props.cancel} type='button' className='w-[48.779146%] text-xl hover:shadow hover:border-3 border p-1  rounded shadow-sm bg-gray-100 hover:bg-gray-200  font-bold '>取消</button>
                              <button className='w-[48.779146%] text-xl hover:shadow hover:border-3 border p-1 rounded shadow-sm bg-red-700  hover:bg-red-800 text-white font-bold '>儲存</button>
                         </div>
                    </div>
               </form >

          )
     };
     const rootElement = document.getElementById('overlay-root');



     return (
          <>
               {ReactDOM.createPortal(<Backdrop cancel={props.cancel} />, rootElement)}
               {ReactDOM.createPortal(<Edit_box values={props.values} cancel={props.cancel} />, rootElement)}
          </>
     )
}

export default Member_item_edit