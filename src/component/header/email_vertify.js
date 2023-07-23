import axios from 'axios';
import React, { useEffect, useState } from 'react'
// const nodemailer = require('nodemailer');
import { BsExclamationCircle } from 'react-icons/bs';
import classes from './email_vertify.module.css'


const Email_vertify = (props) => {
     const [send_verfity_code, set_send_verfity_code] = useState(false);
     const [vertify_timer, set_vertify_timer] = useState(0);
     const [count_down, set_count_down] = useState({ min: 10, sec: 0 });

     const send_verfity_code_handler = async () => {

          let data = { email: props.email }

          const results = await axios.post('http://localhost:5500/email_vertify', data);

          // console.log(results)

          set_vertify_timer(0);
          set_send_verfity_code(true);
     };

     useEffect(() => {
          let timer;

          if (send_verfity_code && vertify_timer < 600) {
               timer = setInterval(() => {
                    set_vertify_timer((prev_timer) => prev_timer + 1);

                    set_count_down((prev_time) => {
                         let updated_min = prev_time.min;
                         let updated_sec = prev_time.sec - 1;

                         if (updated_sec < 0) {
                              updated_min--;
                              updated_sec = 59;
                         }

                         return { min: updated_min, sec: updated_sec };
                    });
               }, 1000);
          } else {
               clearInterval(timer);
               set_send_verfity_code(false);
               set_count_down({ min: 10, sec: 0 })
               // console.log('時間到');
          }

          return () => {
               clearInterval(timer);
          };
     }, [send_verfity_code, vertify_timer]);

     const [vertify_complete_style, set_vertify_complete_style] = useState('')
     const [vertify_code, set_vertify_code] = useState('');
     const code_change_handler = async event => {
          let data = event.target.value
          set_vertify_code(data);
          if (data.trim().length === 6) {

               let results = await axios.post('http://localhost:5500/email_vertify_entered_code', { vertify_code: data })
               console.log(results);
               if (results.data === '驗證成功') {
                    //驗證成功後續動作
                    set_vertify_complete_style(`border-green-700 bg-green-200 border-2`);
               } else {
                    set_vertify_complete_style(`${classes.custom_style} border-2 border-red-500 bg-red-100`);
                    setTimeout(() => {
                         set_vertify_complete_style(`border-2 border-red-500 bg-red-100`);
                    },300)
               }

          }



     };


     const submit_handler = event => {
          event.preventDefault();
     }
     return (
          <form className='p-2' onSubmit={submit_handler}>
               <h3 className='font-bold text-xl'>信箱驗證</h3>
               <input disabled={!send_verfity_code} maxLength={6} minLength={6} title="請輸入 6 位數字的驗證碼" pattern='^\d{6}$' value={vertify_code} onChange={code_change_handler} className={`${vertify_complete_style} border rounded p-2 m-2 w-[50%]`} placeholder='請輸入驗證碼' />
               <button disabled={send_verfity_code} type='button' className='m-2 border p-2 hover:bg-gray-100' onClick={send_verfity_code_handler}>
                    {send_verfity_code ? '已發送' : '發送驗證碼'}
               </button>
               <p className='p-2 font-bold overflow-hidden'>
                    <BsExclamationCircle className='inline-block m-2' />
                    點選發送驗證碼後會將驗證碼發送至您的電子郵件，請在 {count_down.min} 分 {count_down.sec} 秒內完成驗證:
                    <br />
                    <span className='font-bold text-lg p-8 text-red-800'>{props.email}</span>
               </p>
          </form>
     );
};

export default Email_vertify;